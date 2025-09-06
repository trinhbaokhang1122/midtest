import postModel from "../models/post.model.js";

const postController = {
    createPost: async (req, res) => {
        const { userId, content } = req.body
        if(!userId || !content) return res.status(400).json({ mesage: 'Missing information (userId, content)' })

        try {
            const createPost = new postModel({ userId, content })
            const newPost = await createPost.save()
            res.status(201).json({ mesage: 'Post created successfully', post: newPost })
        } catch (err) {
            return res.status(500).json({ mesage: err.message })
        }
    },
    updatePost: async (req, res) => {
        const { id: postId } = req.params
        const { content } = req.body

        try {
            const existPost = await postModel.findById(postId)
            if (!existPost) return res.status(404).json({ mesage: 'Post not found' })

            if (existPost.userId.toString() !== req.user._id.toString()) return res.status(403).json({ mesage: 'You are not authorzied to update this post' })

            existPost.content = content || existPost.content
            existPost.updatedAt = new Date()

            const updatePost = await existPost.save()
            res.status(200).json({ mesage: 'Post updated successfully', updatePost: updatePost })
        } catch (err) {
            return res.status(500).json({ mesage: err.message })
        }
    }
}

export default postController