import express from 'express'
import {
  list,
  create,
  update,
  remove,
  read,
} from '../controllers/Variation.js'
import { admin } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/middlewares.js'

const router = express.Router()

router.delete('/variation/:id', protect, admin, remove)
router.route('/variation').get(list).post(protect, admin, create)

router
  .route('/variation/:variId')
  .put(protect, admin, update)
  .get(protect, admin, read)

export default router
