import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../models/notes.js";

/**
 * 獲取所有筆記
 * @returns {Array} 筆記列表
 */
const getAllNotes = async () => {
  return await getNotes();
};

/**
 * 根據 ID 獲取單一筆記
 * @param {number} noteId - 筆記 ID
 * @returns {Object} 筆記物件
 * @throws {Error} 當筆記不存在時拋出錯誤
 */
const getNoteById = async (noteId) => {
  const note = await getNote(noteId);
  if (!note) {
    const error = new Error("Note not found");
    error.status = 404;
    throw error;
  }
  return note;
};

/**
 * 創建新筆記
 * @param {string} title - 筆記標題
 * @param {string} content - 筆記內容
 * @returns {Object} 新創建的筆記
 * @throws {Error} 當標題或內容為空時拋出錯誤
 */
const createNewNote = async (title, content) => {
  if (!title && !content) {
    const error = new Error("Title or content is required");
    error.status = 400;
    throw error;
  }
  return await createNote(title, content);
};

/**
 * 更新筆記
 * @param {number} noteId - 筆記 ID
 * @param {string} title - 筆記標題
 * @param {string} content - 筆記內容
 * @returns {Object} 更新後的筆記
 * @throws {Error} 當筆記不存在或參數無效時拋出錯誤
 */
const updateNoteById = async (noteId, title, content) => {
  if (!title && !content) {
    const error = new Error("Title or content is required");
    error.status = 400;
    throw error;
  }

  // 先確認筆記是否存在
  await getNoteById(noteId);

  return await updateNote(noteId, title, content);
};

/**
 * 刪除筆記
 * @param {number} noteId - 筆記 ID
 * @returns {Object} 刪除結果
 * @throws {Error} 當筆記不存在時拋出錯誤
 */
const deleteNoteById = async (noteId) => {
  // 先確認筆記是否存在
  await getNoteById(noteId);

  return await deleteNote(noteId);
};

export {
  getAllNotes,
  getNoteById,
  createNewNote,
  updateNoteById,
  deleteNoteById,
};
