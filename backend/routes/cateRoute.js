import express from 'express'
import {
  create,
  getSubs,
  list,
  read,
  remove,
  update,
} from '../controllers/cateController.js'
import { admin } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/middlewares.js'

const router = express.Router()

router.route('/category').get(list).post(protect, admin, create)
router
  .route('/category/:slug')
  .put(protect, admin, update)
  .delete(protect, admin, remove)
  .get(protect, admin, read)
router.get('/category/subs/:id', protect, admin, getSubs)

export default router
