import express from 'express'
import { uploadResume } from "../middleware/uploadResume.js";
import {applyJob, getMyapplication} from '../controller/applyJobController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const applyJobRouter = express.Router();

applyJobRouter.post('/apply', authMiddleware, uploadResume.single("resume"), applyJob); //aply job from jobseeker 
applyJobRouter.get('/get-application', authMiddleware, getMyapplication); //get application applied to the job

export default applyJobRouter;