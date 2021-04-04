import express from 'express'
import {
  createReview,
  reply,
  resetReviews,
} from '../controllers/ReviewController.js'
import { protect } from '../middleware/middlewares.js'

const router = express.Router()

router.route('/reviews/:slugProduct').post(protect, createReview)
router.route('/reviews/reply/:slugProduct/:user').post(protect, reply)
router.route('/reviews/reset/:slugProduct').delete(resetReviews)

export default router
