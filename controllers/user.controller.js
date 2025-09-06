import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const userController = {
    userRegister: async (req, res) => {
        const { userName, email, password } = req.body
        if (!userName || !email || !password) return res.status(400).json({ message: 'Missing information (userName, email, password)' })
        
        const existEmail = await userModel.findOne({ email })
        if (existEmail) return res.status(400).json({ message: 'Email already registered' })

        const emailRegex = /^\S+@\S+\.\S+$/
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' })   
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters including uppercase, lowercase, number and a special character' })
        }
        
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({ userName, email, password: hashPassword })
        try {
            const createUser = await newUser.save() 
            res.status(201).json({ message: 'User registered successfully', user: createUser })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    userLogin: async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: 'Missing information (email, password)' })
        
        try {
            const existEmail = await userModel.findOne({ email })
            if(!existEmail) return res.status(404).json({ message: 'Email not found' })

            const matchPassword = await bcrypt.compare(password, existEmail.password)
            if (!matchPassword) return res.status(401).json({ message: 'Incorrect password' })

            const randomString = crypto.randomUUID()
            const apiKey = `mern-$${existEmail._id}-$${existEmail.email}-$${randomString}`
            const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

            existEmail.apiKey = apiKey
            existEmail.apiKeyExpiresAt = expiresAt
            const loginUser = await existEmail.save()
            res.status(200).json({ message: 'Login successfully', user: loginUser, apiKey })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

export default userController