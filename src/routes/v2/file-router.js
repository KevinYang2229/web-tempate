import express from 'express'

import { uploadFile } from '../../controllers/file-controller.js'
import fileMiddleware from '../../middlewares/file.js'

const router = express.Router()

/**
 * @swagger
 * /api/v2/files/upload:
 *   post:
 *     summary: Upload a file with enhanced metadata (v2)
 *     tags: [Files V2]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *                 example: "My uploaded file"
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *                 fileUrl:
 *                   type: string
 *                   example: /uploads/yourfile.txt
 *                 fileId:
 *                   type: string
 *                   example: "abc123"
 *                 fileSize:
 *                   type: integer
 *                   example: 1024
 *                 mimeType:
 *                   type: string
 *                   example: "text/plain"
 */
router.post('/upload', fileMiddleware, uploadFile)

export default router
