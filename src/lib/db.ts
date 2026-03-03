import { Pool } from 'pg';

/**
 * 標準の PostgreSQL 接続プール (pg) を使用します。
 * これにより、Neon, AWS, Prisma Accelerate 等、
 * どのような場所にある PostgreSQL にも接続可能になります。
 */
let pool: Pool | null = null;

function getPool() {
  if (!pool) {
    const connectionString =
      process.env.POSTGRES_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_CONNECTION_ERROR: 接続文字列が見つかりません。Vercelの設定で POSTGRES_URL を確認してください。');
    }

    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false // 多くのクラウドサービスで SSL 必須なため有効化
      }
    });
  }
  return pool;
}

export const db = {
  async sql(strings: TemplateStringsArray, ...values: any[]) {
    const pool = getPool();
    const client = await pool.connect();
    try {
      // strings をクエリ文字列に変換 (sqlテンプレートリテラル形式を再現)
      let query = '';
      for (let i = 0; i < strings.length; i++) {
        query += strings[i] + (i < values.length ? `$${i + 1}` : '');
      }

      const result = await client.query(query, values);
      return {
        rows: result.rows,
        rowCount: result.rowCount
      };
    } finally {
      client.release();
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
