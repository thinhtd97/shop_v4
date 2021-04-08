import path from 'path'
import multer from 'multer'
import express from 'express'
const router = express.Router()

const DIR = './public/';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, DIR)
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Only Image!!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post(
  '/upload-image-product',
  upload.array('image'),
  (req, res, next) => {
    const reqFiles = []
    const url = `${req.protocol}://${req.get('host')}`
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(`${req.files[i].path}`)
    }
    res.json(reqFiles)
  },
)

router.get("/get-avt", (req, res, next) => {
    User.find().then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            users: data
        });
    });
});

export default router
