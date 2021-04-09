import express from 'express'
import {
  create,
  list,
  payments,
  read,
  updateOrderToPaid,
} from '../controllers/OrderController.js'
import { admin } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/middlewares.js'

const router = express.Router()

router.post('/order/payments', protect, payments)
router.route('/order').post(protect, create).get(protect, list)
router.route('/order/:id').get(protect, read)
router.put('/order/paid/paypal/', protect, updateOrderToPaid)

export default router
