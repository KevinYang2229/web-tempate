import express from 'express'

import { loginUser,registerUser } from '../../controllers/users-controller.js'
import { validateLogin } from '../../middlewares/validate.js'

const router = express.Router()

/**
 * @swagger
 * /api/v2/auth/register:
 *   post:
 *     summary: Register a new user (v2)
 *     tags: [Auth V2]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "testuser"
 *               password:
 *                 type: string
 *                 example: "testpassword"
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 userId:
 *                   type: string
 *                   example: "12345"
 */
router.post('/register', registerUser)

/**
 * @swagger
 * /api/v2/auth/login:
 *   post:
 *     summary: Login a user (v2)
 *     tags: [Auth V2]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "testuser"
 *               password:
 *                 type: string
 *                 example: "testpassword"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
router.post('/login', validateLogin, loginUser)

export default router
