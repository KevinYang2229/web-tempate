import { pool } from "../configs/db.js";

async function migrate() {
  try {
    console.log("Starting migration: Adding token_version column...");

    // 檢查欄位是否已存在
    const [columns] = await pool.query(
      "SHOW COLUMNS FROM users LIKE 'token_version'",
    );

    if (columns.length > 0) {
      console.log("Column token_version already exists. Skipping migration.");
      process.exit(0);
    }

    // 新增 token_version 欄位
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN token_version INT DEFAULT 0 NOT NULL
      AFTER email
    `);

    console.log("✓ Added token_version column");

    // 為現有用戶設定預設值
    await pool.query(`
      UPDATE users SET token_version = 0 WHERE token_version IS NULL
    `);

    console.log("✓ Updated existing users with default token_version");
    console.log("Migration completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
