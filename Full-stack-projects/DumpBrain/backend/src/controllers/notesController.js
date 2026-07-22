import { json } from "express";
import Note from "../models/Note.js";

export async function createNote(req, res) {
  try {
    //build a new note from the model
    const noteInfo = req.body;
    const note = new Note({
      title: noteInfo.title,
      content: noteInfo.content,
    });

    //save that new note to the db
    const newNote = await note.save();
    res.status(201).json({ message: newNote });
  } catch (error) {
    console.error("Internal server error", error);
    res.status(500).json({ message: "Error at createNote controller" });
  }
}

export async function deleteNote(req, res) {
  try {
    const targetNote = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note succesfully deleted" });
    if (!targetNote) return res.status(404).json({ message: "Note not found" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleteNote controller" });
  }
}

export async function updateNote(req, res) {
  try {
    console.log(req.body);
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      //the third parameter in findByIdAndUpdate is an options object, and the new: true option tells mongoose to return the updated document instead of the original document
      {
        new: true,
      },
    );

    //if the note id is not found, throw 404 not found
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export async function getAllNotes(req, res) {
  try {
    //find is a mongoose method that acts like SELECT * in sql
    const notes = await Note.find().sort({ createdAt: -1 }); //sort from newest to latest
    res.json(notes);
  } catch (error) {
    console.error("error in getAllNotes controller", error);
    res.status(500).json({ message: "server error " });
  }
}

//get specific note with id param
export async function getNote(req, res) {
  try {
    const targetNote = await Note.findById(req.params.id);
    if (!targetNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(targetNote);
  } catch (error) {
    console.error("error in getNote controller", error);
    res.status(500).json({ message: "server error " });
  }
}
