import { createClient } from '@vercel/postgres';

/**
 * データベースへの接点（db）を定義します。
 * createClient を使用することで、直接接続（Direct Connection）でも
 * エラーにならずに安定して通信ができるようになります。
 */
export const db = {
  async sql(strings: TemplateStringsArray, ...values: any[]) {
    const client = createClient();
    await client.connect();
    try {
      return await client.sql(strings, ...values);
    } finally {
      // 通信が終わったら確実に切断します
      await client.end();
    }
  }
};

export async function createTable() {
  try {
    await db.sql`
            CREATE TABLE IF NOT EXISTS entries (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                katakana TEXT NOT NULL,
                company TEXT NOT NULL,
                email TEXT NOT NULL,
                newsletter_email TEXT,
                status TEXT NOT NULL, -- 'active', 'cancelled', 'waitlist', 'checked-in'
                type TEXT NOT NULL,
                memo TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}
