import checkDiskSpace from 'check-disk-space'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

import {
  API_VERSION,
  CORS_METHODS,
  CORS_ORIGINS,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
  SERVER_PORT,
} from '../configs/constants.js'
import swaggerV1 from '../configs/swagger-v1.js'
import swaggerV2 from '../configs/swagger-v2.js'
import { requestInfo } from '../middlewares/debug.js'
import errorHandler from '../middlewares/error.js'
// import v2Router from "../routes/v2/index.js";
import fileRouter from '../routes/v1/file-router.js'
import v1Router from '../routes/v1/index.js'

const app = express()

// 中間件設定
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(cookieParser())
app.use(helmet())
app.use(
  cors({
    origin: CORS_ORIGINS,
    methods: CORS_METHODS,
    credentials: true, // 允許傳送 cookies
  }),
)
app.use(
  rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX_REQUESTS,
  }),
)
app.use(morgan('dev'))

app.get('/api-docs/v1/swagger.json', (req, res) => res.json(swaggerV1))
app.get('/api-docs/v2/swagger.json', (req, res) => res.json(swaggerV2))

const swaggerUiOptions = {
  swaggerOptions: {
    urls: [
      { url: '/api-docs/v1/swagger.json', name: 'API v1' },
      { url: '/api-docs/v2/swagger.json', name: 'API v2' },
    ],
    explorer: true,
  },
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerUiOptions))

// 除錯中間件
app.use(requestInfo)

// API v1 路由
app.use(API_VERSION, v1Router)

// API v2 路由
// app.use("/api/v2", v2Router);

// 公開的文件上傳路由 (向下相容)
app.use('/public-files', fileRouter)

app.get('/disk', async (req, res) => {
  try {
    const path = process.cwd() // 目前專案路徑
    const diskSpace = await checkDiskSpace(path)

    res.json({
      path,
      free: Math.round(diskSpace.free / 1024 / 1024 / 1024), // 剩餘空間 (GB)
      size: Math.round(diskSpace.size / 1024 / 1024 / 1024), // 總空間 (GB)
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/', (req, res) => {
  res.cookie('testCookie', 'testValue', { httpOnly: true })
  res.send('Hello World!')
})

app.get('/setCookie', (req, res) => {
  res.cookie('testCookie', 'testValue', { httpOnly: true })
  res.send('Cookie has been set!')
})

app.get('/seeCookie', (req, res) => {
  console.log('123cookies:', req.cookies.testCookie)
  res.send('Check server console for cookies' + req.cookies.testCookie)
})

app.get('/path', (req, res) => {
  // #swagger.tags = ['Test']
  // #swagger.description = 'Endpoint to test request path.'
  res.send(`Requested path: ${req.path}`)
})

app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`)
})

export default app
