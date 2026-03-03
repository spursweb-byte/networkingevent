import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { sendPromotionEmail } from '@/lib/mail';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        // 現在のステータスを取得
        const currentEntryResult = await db.sql`SELECT status FROM entries WHERE id = ${id}`;
        const oldStatus = currentEntryResult.rows[0]?.status;

        // ステータス更新
        await db.sql`
      UPDATE entries SET status = ${status} WHERE id = ${id}
    `;

        // もし「参加」から「キャンセル」になった場合、キャンセル待ちの繰り上げを確認
        if ((oldStatus === 'active' || oldStatus === 'checked-in') && status === 'cancelled') {
            const waitlistResult = await db.sql`
        SELECT * FROM entries 
        WHERE status = 'waitlist' 
        ORDER BY created_at ASC 
        LIMIT 1
      `;

            if (waitlistResult.rows.length > 0) {
                const nextUser = waitlistResult.rows[0];

                // 繰り上げ更新
                await db.sql`
          UPDATE entries SET status = 'active' WHERE id = ${nextUser.id}
        `;

                // 繰り上げメール送信
                try {
                    await sendPromotionEmail(nextUser.email, nextUser.name, nextUser.id, nextUser.company);
                } catch (mailError) {
                    console.error('Promotion Mail Error:', mailError);
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
