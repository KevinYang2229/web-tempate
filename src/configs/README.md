# 配置檔案說明

## constants.js

此檔案集中管理所有專案中的共用變數和配置,包括:

### API 配置

- `API_VERSION`: API 版本路徑 (預設: `/api/v1`)

### 伺服器配置

- `SERVER_PORT`: 伺服器埠號 (預設: 3000)
- `NODE_ENV`: 執行環境 (development/production)
- `IS_PRODUCTION`: 是否為生產環境

### Token 配置

- `TOKEN_SECRET`: Access Token 密鑰
- `REFRESH_TOKEN_SECRET`: Refresh Token 密鑰
- `ACCESS_TOKEN_EXPIRY`: Access Token 過期時間 (預設: 10m)
- `REFRESH_TOKEN_EXPIRY`: Refresh Token 過期時間 (預設: 7d)

### Cookie 配置

- `COOKIE_CONFIG`: Cookie 設定物件
  - `httpOnly`: true
  - `secure`: 生產環境為 true
  - `sameSite`: "strict"
  - `maxAge`: 7 天

### 資料庫配置

- `DB_CONFIG`: 資料庫連線配置物件
  - `host`: 資料庫主機
  - `user`: 資料庫使用者
  - `password`: 資料庫密碼
  - `database`: 資料庫名稱
  - `connectionLimit`: 連線池大小 (預設: 10)

### Log 配置

- `LOG_LEVEL`: Log 層級 (預設: info)
- `LOG_MAX_SIZE`: 單一 log 檔案最大大小 (預設: 10MB)
- `LOG_MAX_FILES`: 保留的 log 檔案數量 (預設: 5)

### Rate Limit 配置

- `RATE_LIMIT_WINDOW_MS`: Rate limit 時間窗口 (預設: 15 分鐘)
- `RATE_LIMIT_MAX_REQUESTS`: 最大請求次數 (預設: 100)

### CORS 配置

- `CORS_ORIGINS`: 允許的來源列表
- `CORS_METHODS`: 允許的 HTTP 方法

## 使用方式

在需要使用配置的檔案中,從 `constants.js` 引入所需的常數:

```javascript
import { TOKEN_SECRET, COOKIE_CONFIG, IS_PRODUCTION } from './configs/constants.js'
```

## 環境變數

以下環境變數需要在 `.env` 檔案中設定:

- `PORT`: 伺服器埠號
- `NODE_ENV`: 執行環境
- `TOKEN_SECRET`: Token 密鑰
- `REFRESH_TOKEN_SECRET`: Refresh Token 密鑰 (可選,預設使用 TOKEN_SECRET)
- `DB_HOST`: 資料庫主機
- `DB_USER`: 資料庫使用者
- `DB_PASS`: 資料庫密碼
- `DB_NAME`: 資料庫名稱
- `LOG_LEVEL`: Log 層級 (可選,預設 info)

## 優點

1. **集中管理**: 所有配置集中在一個地方,易於維護和修改
2. **避免重複**: 減少程式碼中的魔術數字和重複的配置值
3. **類型安全**: 統一的常數命名和導出,減少拼寫錯誤
4. **易於測試**: 可以輕鬆模擬和覆寫配置值進行測試
5. **可讀性**: 提高程式碼的可讀性和可維護性
