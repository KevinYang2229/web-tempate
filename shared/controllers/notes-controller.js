import {
  getAllNotes as getAllNotesService,
  getNoteById,
  createNewNote as createNoteService,
  updateNoteById,
  deleteNoteById,
} from "../services/notes-service.js";

const getAllNotes = async (req, res, next) => {
  try {
    const notes = await getAllNotesService();
    res.json(notes);
  } catch (error) {
    console.error("Error getting notes:", error);
    return next(error);
  }
};

const getSingleNote = async (req, res, next) => {
  console.log(req.user);

  try {
    const note = await getNoteById(req.params.id);
    res.send(note);
  } catch (error) {
    console.error("Error getting note:", error);
    return next(error);
  }
};

const createNewNote = async (req, res, next) => {
  console.log("POST /notes - req.body:", req.body);

  try {
    const { title, content } = req.body;
    const newNote = await createNoteService(title, content);
    res.status(201).send(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    return next(error);
  }
};

const updateExistingNote = async (req, res, next) => {
  console.log("PUT /notes/:id - req.body:", req.body);
  console.log("PUT /notes/:id - req.params.id:", req.params.id);

  try {
    const { title, content } = req.body;
    const updatedNote = await updateNoteById(req.params.id, title, content);
    res.send(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    return next(error);
  }
};

const deleteExistingNote = async (req, res, next) => {
  try {
    const result = await deleteNoteById(req.params.id);
    res.send(result);
  } catch (error) {
    console.error("Error deleting note:", error);
    return next(error);
  }
};

export {
  getAllNotes,
  getSingleNote,
  createNewNote,
  updateExistingNote,
  deleteExistingNote,
};
