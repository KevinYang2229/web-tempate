# Web Template 專案說明

本專案為 Node.js + Express 的後端 API 範本，結合 Socket 伺服器、REST API 測試、前端靜態檔案，適合快速原型開發與學習。

## 專案結構

```
development-tools.md         # 開發工具相關說明
jsconfig.json                # JS 設定
package.json                 # 專案依賴與腳本
README.md                    # 專案說明
web-flow.md                  # 流程設計文件
logs/                        # 伺服器紀錄檔
migrations/                  # 資料庫遷移腳本
public/                      # 前端靜態資源
rest/                        # REST API 測試檔
servers/                     # API 與 Socket 伺服器
shared/                      # 共用程式碼（configs, controllers, middlewares, models, routes, services, utils）
socket-public/               # Socket 測試前端
test/                        # 單元測試
uploads/                     # 檔案上傳目錄
```

## 主要功能

- RESTful API（使用 Express）
- 檔案上傳與下載
- 使用者與筆記管理
- JWT 驗證中介層
- Socket 即時通訊伺服器
- Swagger API 文件
- 前端靜態頁面（public/）

## 快速開始

1. 安裝依賴：
   ```bash
   npm install
   ```
2. 啟動 API 伺服器：
   ```bash
   npm start
   ```
3. 測試 REST API：
   可用 rest/ 目錄下 .rest 檔案配合 VSCode REST Client 擴充套件測試。
4. 前端靜態頁面：
   直接開啟 public/index.html 或 socket-public/index.html 測試。

## 目錄簡介

- `public/`：前端靜態資源
- `servers/`：API 與 Socket 伺服器
- `shared/`：共用程式碼（configs, controllers, middlewares, models, routes, services, utils）
- `rest/`：REST API 測試檔
- `test/`：單元測試
- `uploads/`：檔案上傳目錄
- `migrations/`：資料庫遷移腳本
- `logs/`：伺服器紀錄檔

## 貢獻方式

歡迎任何形式的貢獻！如有建議或想新增功能，請提交 Pull Request 或開啟 Issue。

## 授權條款

本專案採用 MIT 授權條款，詳情請參閱 `LICENSE` 檔案。

## 聯絡方式

如有任何問題，請透過電子郵件聯絡：kk2229.yang@gmail.com
感謝您的使用，祝開發順利！
