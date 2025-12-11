# 🛠️ Web Server 開發工具指南

## 📋 目錄

- [安全性套件](#安全性套件)
- [開發工具](#開發工具)
- [API 開發](#api-開發)
- [資料庫工具](#資料庫工具)
- [測試工具](#測試工具)
- [程式碼品質](#程式碼品質)
- [效能與監控](#效能與監控)
- [部署工具](#部署工具)
- [實用腳本](#實用腳本)
- [安裝指令](#安裝指令)

## 🛡️ 安全性套件

### 已安裝

- **helmet** - 設定安全性 HTTP headers
- **cors** - 跨域資源共享控制
- **joi** - 資料驗證
- **express-rate-limit** - 請求頻率限制

### 建議新增

```bash
npm install express-validator dotenv-safe
```

- `express-validator` - Express 專用驗證中間件
- `dotenv-safe` - 安全的環境變數管理

## 🔧 開發工具

### 日誌系統

```bash
npm install winston morgan
```

- **winston** - 強大的日誌管理系統
- **morgan** - HTTP 請求日誌中間件

### 除錯工具

```bash
npm install debug
```

- **debug** - 靈活的除錯輸出工具

### 環境管理

```bash
npm install cross-env dotenv
```

- **cross-env** - 跨平台環境變數設定
- **dotenv** - 載入 .env 檔案

## 📊 API 開發

### 文檔生成

```bash
npm install swagger-jsdoc swagger-ui-express
```

- **swagger-jsdoc** - 從註解生成 API 文檔
- **swagger-ui-express** - 提供互動式 API 介面

### 工具套件

```bash
npm install http-status-codes uuid compression
```

- **http-status-codes** - 語義化 HTTP 狀態碼
- **uuid** - 生成唯一識別碼
- **compression** - HTTP 回應壓縮

## 🗄️ 資料庫工具

### ORM/查詢建構器

```bash
# Prisma (推薦)
npm install prisma @prisma/client

# 或 Knex + Objection
npm install knex objection
```

### 遷移工具

```bash
npm install db-migrate db-migrate-mysql
```

## 🧪 測試工具

### 測試框架

```bash
npm install --save-dev jest supertest
```

- **jest** - JavaScript 測試框架
- **supertest** - HTTP 測試工具

### 替代選擇

```bash
npm install --save-dev mocha chai
```

- **mocha** - 靈活的測試框架
- **chai** - 斷言庫

## 🎨 程式碼品質

### Linting & Formatting

```bash
npm install --save-dev eslint prettier
```

### Git Hooks

```bash
npm install --save-dev husky lint-staged
```

### TypeScript 支援

```bash
npm install --save-dev typescript @types/node @types/express
```

## 📈 效能與監控

### 快取系統

```bash
npm install redis node-cache
```

- **redis** - 分散式快取
- **node-cache** - 記憶體快取

### 效能工具

```bash
npm install express-slow-down
```

- **express-slow-down** - 請求延遲控制

## 🚀 部署工具

### 進程管理

```bash
npm install pm2 -g
```

- **pm2** - 生產環境進程管理器

### 開發輔助

```bash
npm install --save-dev concurrently
```

- **concurrently** - 同時執行多個命令

## 📧 外部服務整合

### 郵件服務

```bash
npm install nodemailer
```

### 檔案處理

```bash
npm install multer sharp
```

- **multer** - 檔案上傳處理
- **sharp** - 圖片處理

### HTTP 客戶端

```bash
npm install axios
```

## 📱 即時通訊

```bash
npm install socket.io
```

## 📜 實用腳本

### package.json scripts 建議

```json
{
  "scripts": {
    "start": "node --env-file=.env index.js",
    "dev": "nodemon --env-file=.env index.js",
    "dev:verbose": "DEBUG=* nodemon --env-file=.env index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint . --ext .js",
    "lint:fix": "eslint . --ext .js --fix",
    "format": "prettier --write \"**/*.{js,json,md}\"",
    "security:audit": "npm audit",
    "docs:generate": "swagger-jsdoc -d swagger.config.js -o docs/swagger.json",
    "db:setup": "node scripts/db-setup.js",
    "db:seed": "node scripts/db-seed.js",
    "pm2:start": "pm2 start ecosystem.config.js",
    "pm2:stop": "pm2 stop all",
    "clean": "rm -rf node_modules package-lock.json && npm install"
  }
}
```

## 🚀 快速安裝指令

### 基礎開發套件

```bash
npm install winston morgan swagger-jsdoc swagger-ui-express compression http-status-codes uuid express-validator
```

### 開發環境工具

```bash
npm install --save-dev jest supertest eslint prettier concurrently husky lint-staged
```

### 進階功能

```bash
npm install redis axios multer sharp nodemailer socket.io
```

### 全域工具

```bash
npm install -g pm2
```

## 📁 推薦的專案結構

```
web-server/
├── config/           # 設定檔
├── controllers/      # 控制器
├── middlewares/      # 中間件
├── models/          # 資料模型
├── routes/          # 路由定義
├── services/        # 業務邏輯
├── utils/           # 工具函數
├── tests/           # 測試檔案
├── docs/            # API 文檔
├── scripts/         # 腳本檔案
├── logs/            # 日誌檔案
└── public/          # 靜態檔案
```

## 🔧 設定檔範例

### ESLint 設定 (.eslintrc.js)

```javascript
module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
}
```

### Prettier 設定 (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### Jest 設定 (jest.config.js)

```javascript
export default {
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.js', '!node_modules/**', '!coverage/**'],
  testMatch: ['**/tests/**/*.test.js'],
}
```

## 📚 學習資源

### 文檔連結

- [Express.js](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [Swagger](https://swagger.io/)
- [Winston](https://github.com/winstonjs/winston)
- [PM2](https://pm2.keymetrics.io/)

### 最佳實踐

1. **安全性優先** - 使用 helmet、cors、rate limiting
2. **測試驅動** - 編寫全面的測試
3. **代碼品質** - 使用 ESLint 和 Prettier
4. **監控日誌** - 實作完整的日誌系統
5. **API 文檔** - 維護最新的 API 文檔

---

**備註**: 根據專案需求逐步安裝套件，避免一次安裝過多不必要的依賴。
