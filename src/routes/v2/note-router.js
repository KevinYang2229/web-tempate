import express from 'express'

import {
  createNewNote,
  deleteExistingNote,
  getAllNotes,
  getSingleNote,
  updateExistingNote,
} from '../../controllers/notes-controller.js'

const router = express.Router()

/**
 * @swagger
 * /api/v2/notes:
 *   get:
 *     summary: Retrieve a list of notes with pagination (v2)
 *     tags: [Notes V2]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A paginated list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       title:
 *                         type: string
 *                         example: "Sample Note"
 *                       content:
 *                         type: string
 *                         example: "This is a sample note."
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 100
 */
router.get('/', getAllNotes)

/**
 * @swagger
 * /api/v2/notes/{id}:
 *   get:
 *     summary: Retrieve a single note by ID (v2)
 *     tags: [Notes V2]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       200:
 *         description: A single note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 title:
 *                   type: string
 *                   example: "Sample Note"
 *                 content:
 *                   type: string
 *                   example: "This is a sample note."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 */
router.get('/:id', getSingleNote)

/**
 * @swagger
 * /api/v2/notes:
 *   post:
 *     summary: Create a new note (v2)
 *     tags: [Notes V2]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Note"
 *               content:
 *                 type: string
 *                 example: "This is the content of the new note."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["work", "important"]
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "2"
 *                 title:
 *                   type: string
 *                   example: "New Note"
 *                 content:
 *                   type: string
 *                   example: "This is the content of the new note."
 */
router.post('/', createNewNote)

/**
 * @swagger
 * /api/v2/notes/{id}:
 *   put:
 *     summary: Update an existing note by ID (v2)
 *     tags: [Notes V2]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Note"
 *               content:
 *                 type: string
 *                 example: "This is the updated content of the note."
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 title:
 *                   type: string
 *                   example: "Updated Note"
 *                 content:
 *                   type: string
 *                   example: "This is the updated content of the note."
 */
router.put('/:id', updateExistingNote)

/**
 * @swagger
 * /api/v2/notes/{id}:
 *   delete:
 *     summary: Delete a note by ID (v2)
 *     tags: [Notes V2]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Note deleted successfully
 */
router.delete('/:id', deleteExistingNote)

export default router
