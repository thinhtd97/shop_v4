import express from 'express'
import { protect } from '../middleware/middlewares.js'
import {
  changeActive,
  create,
  list,
  read,
  remove,
  update,
} from '../controllers/AddressController.js'
const router = express.Router()

router.route('/address').post(protect, create).get(protect, list)
router
  .route('/address/:id')
  .put(protect, update)
  .delete(protect, remove)
  .get(protect, read)
router.put('/address/change-active/:id', protect, changeActive)

export default router
