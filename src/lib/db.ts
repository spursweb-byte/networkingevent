import { createPool } from '@vercel/postgres';

// 接続文字列が直接接続用か共有接続用かを問わず、いい感じに処理してくれるPoolを作成します
const pool = createPool();

export async function createTable() {
  await pool.sql`
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
}

export { pool as db };
