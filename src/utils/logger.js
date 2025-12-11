import path from 'path'
import { createLogger, format, transports } from 'winston'

import { LOG_LEVEL, LOG_MAX_FILES,LOG_MAX_SIZE } from '../configs/constants.js'

// 取得專案路徑
// const projectRoot = path.resolve(new URL(import.meta.url).pathname, "../../");
const projectRoot = path.resolve('./')

// 設定 log 檔案儲存路徑
const logDir = path.join(projectRoot, 'logs')

const logger = createLogger({
  level: LOG_LEVEL,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}] ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ''
      }`
    }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level}] ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta) : ''
          }`
        }),
      ),
    }),
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: LOG_MAX_SIZE,
      maxFiles: LOG_MAX_FILES,
    }),
    new transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: LOG_MAX_SIZE,
      maxFiles: LOG_MAX_FILES,
    }),
  ],
  exitOnError: false,
})

export default logger
