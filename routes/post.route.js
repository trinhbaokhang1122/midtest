import { Router } from "express";
import postController from "../controllers/post.controller.js";
import { verifyApiKey } from "../middleware/auth.middleware.js";

const postRouter = Router()

postRouter.post('/', verifyApiKey, postController.createPost)
postRouter.put('/:id', verifyApiKey, postController.updatePost)

export default postRouter