import express from 'express'
import { create, list, update, remove, read } from '../controllers/sub.js'
import { admin } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/middlewares.js'

const router = express.Router()

router.route('/subs').post(protect, admin, create).get(list)
router
  .route('/subs/:slug')
  .put(protect, admin, update)
  .delete(protect, admin, remove)
  .get(protect, admin, read)

export default router
