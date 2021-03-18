import asyncHandler from 'express-async-handler'
import generateToken from '../middleware/generateToken.js'
import User from '../models/user.js'

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body 
    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password)) && user.role === "subscriber") {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }
})
export const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body 
    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password)) && user.role === "admin") {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }
})
export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if(user) {
        res.json({
            _id: user._id,
            fistName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        })
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})

export const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, username, password, address } = req.body
    const user = await User.findOne({ email, username })

    if(user) {
        res.status(400)
        throw new Error("Email already exists")
    } else {
        const userCreated = await User.create({
            firstName,
            lastName, 
            email,
            password,
            address
        })
        if(userCreated) {
            res.json({
                _id: userCreated._id,
                firstName: userCreated.firstName,
                lastName: userCreated.lastName,
                email: userCreated.email,
                address: userCreated.address,
                role: userCreated.role,
                token: generateToken(userCreated._id)
            })
        } else {
            res.status(400)
            throw new Error('Ivalid data')
        }
        
    }
})
export const updateProfileUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if(user) {
        user.name = req.body.name || user.name 
        user.email = req.body.email || user.email 
        if(req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(400)
        throw new Error("Update failed!")
    }
})

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    if(!users) {
        res.status(404)
        throw new Error('User not found')
    } else {
        res.json(users)
    }
})
export const getUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})
export const deleteUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        await user.remove()
        res.json({ message: 'Remove Successfully' })
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})
export const updateUserByID = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        user.name = req.body.name || user.name 
        user.email = req.body.email || user.email
        user.role = req.body.role || user.role
    
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})