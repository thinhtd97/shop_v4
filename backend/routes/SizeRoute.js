import express from 'express'
import {
  createSize,
  detailSize,
  removeSize,
  updateSize,
} from '../controllers/SizeController.js'
import { admin } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/middlewares.js'

const router = express.Router()

router.delete('/size/:variationId/:sizeId', protect, admin, removeSize)
router
  .route('/size/:id')
  .get(protect, admin, detailSize)
  .put(protect, admin, updateSize)
router.post('/size/:variationId', protect, admin, createSize)

export default router
