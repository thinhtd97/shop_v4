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

router.delete('/size/:slugProduct/:variationId/:sizeId', protect, admin, removeSize)
router.route('/size/:id').get(protect, admin, detailSize)
router.put('/size/:slugProduct/:id', protect, admin, updateSize)
router.post('/size/:slugProduct/:variationId', protect, admin, createSize)

export default router
