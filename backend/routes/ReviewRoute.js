import express from 'express'
import { createReview, reply } from '../controllers/ReviewController.js'
import { protect } from '../middleware/middlewares.js'

const router = express.Router()

router.route('/reviews/:slugProduct').post(protect, createReview)
router.route('/reviews/reply/:id').post(protect, reply)

export default router
