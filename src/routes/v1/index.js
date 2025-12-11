import express from 'express'

import authenticateToken from '../../middlewares/auth.js'
import authRouter from './auth-router.js'
import errorRouter from './error-router.js'
import fileRouter from './file-router.js'
import noteRouter from './note-router.js'
import validateRouter from './validate-router.js'

const router = express.Router()

// Auth routes (公開)
router.use('/auth', authRouter)

// Notes routes (需要驗證)
router.use('/notes', authenticateToken, noteRouter)

// Files routes (需要驗證)
router.use('/files', authenticateToken, fileRouter)

// Error routes
router.use('/error', errorRouter)

// Validate routes
router.use('/validate', validateRouter)

export default router
