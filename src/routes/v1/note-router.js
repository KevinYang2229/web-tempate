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
 * /:
 *   get:
 *     summary: Retrieve a list of notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   title:
 *                     type: string
 *                     example: "Sample Note"
 *                   content:
 *                     type: string
 *                     example: "This is a sample note."
 */
router.get('/', getAllNotes)
/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Retrieve a single note by ID
 *     tags: [Notes]
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
 */
router.get('/:id', getSingleNote)
/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
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
 * /notes/{id}:
 *   put:
 *     summary: Update an existing note by ID
 *     tags: [Notes]
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
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
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
