import { createClient } from '@vercel/postgres';

/**
 * データベース接続ヘルパー
 * 環境変数の名前が POSTGRES_URL でも POSTGRES_URL_NON_POOLING でも、
 * 見つけた方を優先して使用し、直接接続を確立します。
 */
export const db = {
  async sql(strings: TemplateStringsArray, ...values: any[]) {
    // 優先順位をつけて接続文字列を取得
    const connectionString =
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.POSTGRES_URL ||
      process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_CONNECTION_ERROR: 接続文字列(POSTGRES_URL)が見つかりません。Vercelの設定を確認してください。');
    }

    const client = createClient({
      connectionString: connectionString
    });

    await client.connect();
    try {
      return await client.sql(strings, ...values);
    } finally {
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
