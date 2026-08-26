import express from "express";
import { createTask, getDashboard } from "../controllers/tasksController.js";

const mainRouter = express.Router();

mainRouter.get("/", getDashboard);

mainRouter.post("/create", createTask);

export default mainRouter;
