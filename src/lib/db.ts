import { sql } from '@vercel/postgres';

export async function createTable() {
    await sql`
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
