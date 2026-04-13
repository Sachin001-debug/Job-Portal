import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';

import path from 'path'
import userRouter from './routes/userRoute.js';
import jobPostRouter from './routes/jobPostRoute.js';
import applyJobRouter from './routes/applyJobRoute.js';
import employerRouter from './routes/employerRoute.js';

dotenv.config(); 

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

// connect DB
connectDb();

app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// routes here!!
app.use('/api/user', userRouter);

// Job seeker routes
app.use('/api/jobseeker/jobs', jobPostRouter);      // list all jobs, get single job
app.use('/api/jobseeker/job', applyJobRouter);   // apply for job

// Employer routes
app.use('/api/employer/jobs', jobPostRouter);      // create job, view own jobs
app.use('/api/employer', employerRouter); // manage applications


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});