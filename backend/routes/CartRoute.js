import express from 'express'
import { protect } from '../middleware/middlewares.js'
import {
  addToCart,
  removeCartItemFromUser,
} from '../controllers/CartController.js'
const router = express.Router()

router.post('/cart/:slugProduct', protect, addToCart)
router.delete('/cart/delete/:cartId', protect, removeCartItemFromUser)
export default router
