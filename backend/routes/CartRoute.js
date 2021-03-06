import express from 'express'
import { protect } from '../middleware/middlewares.js'
import {
  addToCart,
  listCart,
  removeAllCartItem,
  removeCartItem,
  updateQuantity,
} from '../controllers/CartController.js'
const router = express.Router()

router
  .route('/cart/:slug')
  .post(protect, addToCart)
  .delete(protect, removeCartItem)
router.route('/cart').get(protect, listCart).delete(protect, removeAllCartItem)
router.put('/cart/:slug/:qty', protect, updateQuantity)

export default router
