import express from 'express'
import {
  list,
  create,
  update,
  remove,
  read,
  getProductCurrent,
} from '../controllers/productController.js'
import { admin } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/middlewares.js'

const router = express.Router()

router.route('/products').get(list).post(protect, admin, create)
router
  .route('/products/:slug')
  .put(protect, admin, update)
  .delete(protect, admin, remove)
  .get(protect, admin, read)
router.get('/products/current/:variId', protect, admin, getProductCurrent)
export default router
