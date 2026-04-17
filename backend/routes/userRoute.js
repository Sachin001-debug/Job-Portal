import express from 'express';
import {registerUser, loginUser, getMe, uplodImageHandler, changePassword, getRoleBasedProfile} from '../controller/UserController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', authMiddleware, getMe);

userRouter.post('/change-password', authMiddleware, changePassword);
userRouter.post('/upload-image', authMiddleware, uploadMiddleware.single('profileImage'), uplodImageHandler);

userRouter.get('/profiles', authMiddleware, getRoleBasedProfile)   //to display profiles in dashboards
export default userRouter;