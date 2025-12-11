import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { TOKEN_SECRET } from '../configs/constants.js'
import { getUserByUsername } from '../models/users.js'
import logger from '../utils/logger.js'

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    const error = new Error('No authorization header provided')
    res.status(401)
    return next(error)
  }

  // 檢查是否為 Bearer token
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, TOKEN_SECRET)
      console.log('Decoded token:', decoded)
      req.user = decoded
      return next()
    } catch (error) {
      logger.error(error, 'Invalid token')
      const err = new Error('Invalid token')
      res.status(403)
      return next(err)
    }
  }

  // 檢查是否為 Basic auth
  else if (authHeader.startsWith('Basic ')) {
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')

    try {
      const user = await getUserByUsername(username)
      if (!user) {
        const error = new Error('Invalid username or password')
        res.status(401)
        return next(error)
      }

      const passwordMatch = await bcrypt.compare(password, user.password_hash)
      if (!passwordMatch) {
        const error = new Error('Invalid username or password')
        res.status(401)
        return next(error)
      }

      // 設置 user 資訊供後續使用
      req.user = { id: user.id, username: user.username }
      return next()
    } catch (error) {
      logger.error('Basic auth error:', error)
      const err = new Error('Authentication failed')
      err.status = 401
      return next(err)
    }
  } else {
    const error = new Error('Invalid authorization format')
    res.status(401)
    return next(error)
  }
}

export default authenticateToken
