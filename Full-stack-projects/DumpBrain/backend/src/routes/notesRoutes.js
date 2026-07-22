import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNote);

router.post("/", createNote);

router.delete("/:id", deleteNote);

router.put("/:id", updateNote);

export default router;
