import express from "express";
import {
    createProject,
    getProject,
    updateProject,
    deleteProject
} from "../controllers/ProjectController.js";

const router = express.Router();

// Create Project
router.post("/", createProject);

// Get Project
router.get("/:id", getProject);

// Update Project
router.put("/:id", updateProject);

// Delete Project
router.delete("/:id", deleteProject);

export default router;
