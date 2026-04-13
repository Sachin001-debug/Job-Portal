import express from 'express'
import { uploadResume } from "../middleware/uploadResume.js";
import applyJob from '../controller/applyJobController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const applyJobRouter = express.Router();

applyJobRouter.post('/apply', authMiddleware, uploadResume.single("resume"), applyJob);

export default applyJobRouter;