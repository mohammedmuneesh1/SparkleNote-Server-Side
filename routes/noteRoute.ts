import { Router } from "express";
import { tryCatch } from "../middlewares/tryCatch";
import { createCategory, createNote, deleteNote, editNote, getAllCompletedNotes, getCategory, getNotes, getNotesByCategory, markNoteCompleted, markNoteUncompleted } from "../controllers/noteController";
import { joiValidation } from "../middlewares/joiValidation";
import { createCategoryJoi, createNoteJoi, editNoteJoi } from "../configs/validations/joiValidate";
import { checkAuth } from "../middlewares/checkAuth";

export const router = Router();

router.route('/categories').post(checkAuth,joiValidation(createCategoryJoi),tryCatch(createCategory));
router.route('/categories').get(checkAuth,tryCatch(getCategory));
router.route('/notes').post(checkAuth, joiValidation(createNoteJoi),tryCatch(createNote))
router.route('/notes').get(checkAuth,tryCatch(getNotes))
router.route("/notes/:categoryId").get(checkAuth,tryCatch(getNotesByCategory))
router.route("/notes/:noteId").delete(checkAuth,tryCatch(deleteNote))
router.route("/completed/:noteId").put(checkAuth,tryCatch(markNoteCompleted))
router.route("/uncompleted/:noteId").put(checkAuth,tryCatch(markNoteUncompleted))
router.route("/completed").get(checkAuth,tryCatch(getAllCompletedNotes))
router.route("/edit/:noteId").put(checkAuth,joiValidation(editNoteJoi),tryCatch(editNote))
