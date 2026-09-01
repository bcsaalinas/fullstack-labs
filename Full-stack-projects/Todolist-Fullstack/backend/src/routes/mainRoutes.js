import express from "express";
import {
  createTask,
  getDashboard,
  deleteTask,
} from "../controllers/tasksController.js";

const mainRouter = express.Router();

mainRouter.get("/", getDashboard);

mainRouter.post("/create", createTask);

mainRouter.delete("/delete/:id", deleteTask);

export default mainRouter;
