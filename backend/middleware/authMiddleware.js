import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const user = await User.findById(decoded.userId).select('-password')
      req.user = user

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, invalid token')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})
