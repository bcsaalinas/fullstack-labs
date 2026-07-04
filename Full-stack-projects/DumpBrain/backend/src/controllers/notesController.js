export function getAllNotes(req, res) {
  res.status(200).send("You just hit /api/notes");
}

export function createNote(req, res) {
  res.status(201).send("Created note succesfully!");
}

export function updateNote(req, res) {
  res.status(200).send("Updated note succesfully!");
}

export function deleteNote(req, res) {
  res.status(200).send("Deleted note succesfully!");
}

export function putNote(req, res) {
  res.status(200).send("sucessfully aded note");
}
