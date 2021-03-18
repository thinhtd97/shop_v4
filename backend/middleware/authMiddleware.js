import User from '../models/user.js'
import asyncHandler from 'express-async-handler'

export const admin = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.user.id);
   if(user.role === "admin") {
       next()
    } else {
        res.status(400)
        throw new Error('Access denied')
    }
})