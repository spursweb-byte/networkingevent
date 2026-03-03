import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { sendEntryEmail } from '@/lib/mail';
import { createTable } from '@/lib/db';

export async function POST(request: Request) {
    try {
        await createTable();
        const body = await request.json();
        const {
            name,
            katakana,
            company,
            email,
            newsletterEmail = '',
            type,
            memo = ''
        } = body;

        // 定員チェック (status = 'active' の人数)
        const activeCountResult = await db.sql`
      SELECT COUNT(*) as count FROM entries WHERE status = 'active' OR status = 'checked-in'
    `;
        const activeCount = parseInt(activeCountResult.rows[0].count || '0');

        let status = 'active';
        if (activeCount >= 90) {
            status = 'waitlist';
        }

        const result = await db.sql`
      INSERT INTO entries (name, katakana, company, email, newsletter_email, status, type, memo)
      VALUES (${name}, ${katakana}, ${company}, ${email}, ${newsletterEmail}, ${status}, ${type}, ${memo})
      RETURNING *
    `;

        const isWaitlist = status === 'waitlist';

        // メール送信 (エラーが起きてもエントリー自体は完了させるため try-catch)
        try {
            await sendEntryEmail(email, name, isWaitlist, company, result.rows[0].id);
        } catch (mailError) {
            console.error('Mail Send Error:', mailError);
        }

        return NextResponse.json({ success: true, entry: result.rows[0] });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Internal Server Error'
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        const result = await db.sql`SELECT * FROM entries ORDER BY created_at DESC`;
        return NextResponse.json(result.rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
