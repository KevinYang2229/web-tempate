import express from 'express'

import authenticateToken from '../../middlewares/auth.js'
import authRouter from './auth-router.js'
import fileRouter from './file-router.js'
import noteRouter from './note-router.js'

const router = express.Router()

// Auth routes (公開)
router.use('/auth', authRouter)

// Notes routes (需要驗證)
router.use('/notes', authenticateToken, noteRouter)

// Files routes (需要驗證)
router.use('/files', authenticateToken, fileRouter)

export default router
