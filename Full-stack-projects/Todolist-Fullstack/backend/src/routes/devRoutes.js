import express from "express";
import {
  getAllTasks,
  getAllUsers,
} from "../controllers/developerController.js";

const devRouter = express.Router();

devRouter.get("/users", getAllUsers);

devRouter.get("/tasks", getAllTasks);

export default devRouter;
