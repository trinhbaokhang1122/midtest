import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = Router()
userRouter.post('/register', userController.userRegister)
userRouter.post('/login', userController.userLogin)

export default userRouter;
