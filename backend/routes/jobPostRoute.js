import express from 'express';
import { 
  getJobs, 
  getMyJobs, 
  getSingleJob, 
  jobPostHandler 
} from '../controller/jobPostContreoller.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const jobPostRouter = express.Router();

// ====================== ROUTES IN CORRECT ORDER ======================

// 1. Create a new job (protected)
jobPostRouter.post('/createjob', authMiddleware, jobPostHandler);

// 2. Get all jobs (public - for job seekers)
jobPostRouter.get('/', getJobs);

// 3. Get my posted jobs (for employers) - specific route
jobPostRouter.get('/myjobs', authMiddleware, getMyJobs);

// 4. Get single job by ID (for job seekers to view + apply) - dynamic route LAST
jobPostRouter.get('/:id', getSingleJob);

// ====================================================================

export default jobPostRouter;