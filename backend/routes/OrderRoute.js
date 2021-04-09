import express from 'express'
import { create, payments, read } from '../controllers/OrderController.js'
import { admin } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/middlewares.js'

const router = express.Router()

router.post('/order/payments', protect, payments)
router.route('/order').post(protect, create)
router.route('/order/:id').get(protect, read)

export default router
