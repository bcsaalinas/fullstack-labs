import express from "express";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();

app.use("/api/notes", notesRoutes);

app.listen(3000, () => {
  console.log("running on port http://localhost:3000");
});
