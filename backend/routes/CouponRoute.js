import express from 'express'
import { protect } from '../middleware/middlewares.js'
import { admin } from '../middleware/authMiddleware.js'
import {
  applyCoupon,
  createCoupon,
  listCoupon,
  removeCouponUsed,
} from '../controllers/CouponController.js'
const router = express.Router()

router
  .route('/coupon')
  .post(protect, admin, createCoupon)
  .get(protect, admin, listCoupon)
  .delete(protect, admin, removeCouponUsed)
router.post('/coupon/apply', applyCoupon)

export default router
