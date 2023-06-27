import asyncHandler from 'express-async-handler'

export const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Auth User' })
})

export const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Register User' })
})

export const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logout user' })
})

export const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get user profile' })
})

export const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Update user Profile' })
})
