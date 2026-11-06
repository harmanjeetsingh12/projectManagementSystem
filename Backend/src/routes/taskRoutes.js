import express from "express";

import {
    createTask,
    getTask,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

// Create Task
router.post("/", createTask);

// Get Task
router.get("/:id", getTask);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

export default router;