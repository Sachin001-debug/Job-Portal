import express from 'express';
import {authMiddleware} from '../middleware/authMiddleware.js'
import { getUserManualResume, saveManualResume } from '../controller/resumeFormController.js';

const resumeFormRouter = express.Router();


resumeFormRouter.post('/save-resume', authMiddleware,  saveManualResume ); //saves user manually fieled data
resumeFormRouter.get('/user-manual-resume', authMiddleware, getUserManualResume); //users resume

export default resumeFormRouter;