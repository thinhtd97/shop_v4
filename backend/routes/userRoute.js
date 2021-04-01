import express from 'express'
import { protect } from '../middleware/middlewares.js'
import { admin } from '../middleware/authMiddleware.js'
import {
  authAdmin,
  authUser,
  changePassword,
  deleteUserByID,
  getProfile,
  getUserByID,
  NewPassword,
  registerUser,
  resetPassword,
  updateProfileUser,
  updateUserByID,
} from '../controllers/userController.js'
const router = express.Router()

router.post('/user/login', authUser)
router.post('/user/login-admin', authAdmin)
router.post('/user/reset-password', resetPassword)
router.post('/user/new-password', NewPassword)
router.post('/user/register', registerUser)
router.put('/user/change-password', protect, changePassword)
router
  .route('/user/profile')
  .get(protect, getProfile)
  .put(protect, updateProfileUser)
router
  .route('/user/:id')
  .get(protect, admin, getUserByID)
  .delete(protect, admin, deleteUserByID)
  .put(protect, admin, updateUserByID)
export default router
