import express from 'express';
const router = express.Router();

// middleware
import { upload, remove } from '../controllers/cloudinary.js';
import { admin } from '../middleware/authMiddleware.js'
import { protect } from '../middleware/middlewares.js'

router.post('/uploadimages', protect, admin, upload);
router.post('/removeimage', protect, admin, remove);

export default router;