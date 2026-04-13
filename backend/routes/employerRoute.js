import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllEmployerApplications, getJobApplications, updateApplicationStatus } from "../controller/employerController.js";
import { getMyJobs } from "../controller/jobPostContreoller.js";

const employerRouter = express.Router();

// === IMPORTANT ROUTES ===
employerRouter.get("/jobs/myjobs", authMiddleware, getMyJobs);                    // ← This was missing
employerRouter.get("/jobs/:jobId/applications", authMiddleware, getJobApplications);
employerRouter.put("/applications/:appId/status", authMiddleware, updateApplicationStatus);

employerRouter.get("/applications", authMiddleware, getAllEmployerApplications);
export default employerRouter;;
