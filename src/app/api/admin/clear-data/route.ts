import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE() {
    try {
        await db.sql`DELETE FROM entries`;
        return NextResponse.json({ success: true, message: 'All entries have been deleted.' });
    } catch (error: any) {
        console.error('Delete Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
