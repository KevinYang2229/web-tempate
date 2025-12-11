import { pool } from '../configs/db.js'

const getNotes = async () => {
  const [result] = await pool.query('SELECT * FROM notes')
  console.log(result)
  return result
}

const getNote = async (id) => {
  const [result] = await pool.query('SELECT * FROM notes WHERE id = ?', [id])
  console.log(result[0])
  return result[0]
}

const createNote = async (title, content) => {
  const [result] = await pool.query('INSERT INTO notes (title, content) VALUES (?, ?)', [
    title,
    content,
  ])
  const id = result.insertId
  console.log(getNote(id))
}

const updateNote = async (id, title, content) => {
  const [result] = await pool.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [
    title,
    content,
    id,
  ])
  console.log(result)
}

const deleteNote = async (id) => {
  const [result] = await pool.query('DELETE FROM notes WHERE id = ?', [id])
  console.log(result)
}

export { createNote, deleteNote,getNote, getNotes, updateNote }
