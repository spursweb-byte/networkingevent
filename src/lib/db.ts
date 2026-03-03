import { createClient } from '@vercel/postgres';

/**
 * データベース接続ヘルパー
 * どの環境変数が生きているかを自動判別し、最適な接続を行います。
 */
export const db = {
  async sql(strings: TemplateStringsArray, ...values: any[]) {
    // 利用可能な環境変数をすべてチェック
    const connectionString =
      process.env.POSTGRES_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.DATABASE_URL;

    if (!connectionString) {
      // エラー時に「何の設定が足りないか」を具体的に伝える
      const availableKeys = Object.keys(process.env).filter(k => k.includes('POSTGRES') || k.includes('DATABASE'));
      throw new Error(`DATABASE_CONFIG_MISSING: VercelのEnvironment Variablesに 'POSTGRES_URL' が設定されていません。現在の設定済みキー: ${availableKeys.join(', ') || 'なし'}`);
    }

    const client = createClient({
      connectionString: connectionString
    });

    await client.connect();
    try {
      return await client.sql(strings, ...values);
    } catch (dbError: any) {
      // 404などの特殊なエラーの場合、より分かりやすいメッセージに変換
      if (dbError.message?.includes('404')) {
        throw new Error(`DATABASE_CONNECTION_ERROR: 接続URLは存在しますが、データベースが見つからないかアクセスできません (404)。URLが正しいか確認してください。`);
      }
      throw dbError;
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
