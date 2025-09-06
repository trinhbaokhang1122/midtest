import { Router } from 'express';
import userRouter from './user.route.js';
import postRouter from './post.route.js';

const rootRouter = Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/posts', postRouter);

export default rootRouter;
