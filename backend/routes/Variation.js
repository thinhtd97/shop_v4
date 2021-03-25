import express from 'express'
import {
  list,
  create,
  update,
  remove,
  read,
  createSize,
  removeSize,
  updateSize,
  detailSize,
} from '../controllers/Variation.js'
import { admin } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/middlewares.js'

const router = express.Router()

router.route('/variation').get(list).post(protect, admin, create)
router.delete('/variation/:id', protect, admin, remove)
router.post('/variation/create-size/:id', protect, admin, createSize)
router.get('/variation/detail-size/:sizeId', protect, admin, detailSize)
router.delete('/variation/delete-size/:id/:sizeId', removeSize)
router.put('/variation/update-size/:id/:sizeId',protect, admin, updateSize)
router
  .route('/variation/:variId')
  .put(protect, admin, update)
  .get(protect, admin, read)

export default router
