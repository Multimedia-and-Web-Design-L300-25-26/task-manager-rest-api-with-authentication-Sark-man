import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getTasks } from "../controllers/taskController.js";

const router = express.Router();

// Apply auth middleware
router.use(authMiddleware);

// POST /api/tasks
router.post("/", authMiddleware, createTask);

// GET /api/tasks
router.get("/", authMiddleware, getTasks);

// DELETE /api/tasks/:id
router.delete("/:id", authMiddleware, deleteTask);

export default router;