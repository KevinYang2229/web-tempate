-- 新增 token_version 欄位到 users 表
-- 用於實作 refresh token revocation 功能

ALTER TABLE users 
ADD COLUMN token_version INT DEFAULT 0 NOT NULL
AFTER email;

-- 為現有用戶設定預設值
UPDATE users SET token_version = 0 WHERE token_version IS NULL;
