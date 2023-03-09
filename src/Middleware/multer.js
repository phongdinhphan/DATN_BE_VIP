const multer = require("multer");
const path = require('path')

var storageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'image/png' && file.originalname.endsWith('.png') || file.mimetype === 'image/jpeg' && file.originalname.endsWith('.jpg')) {
    cb(null, true);
  } else {
    cb(new Error('Only PNG or JDG files are allowed'), false);
  }
};
const upload = multer({ storage: storageEngine, fileFilter: fileFilter, limits: { fileSize: 1000000 } })
module.exports = upload