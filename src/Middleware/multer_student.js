const multer = require("multer");
const path = require('path')

var storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './file_cv')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only PNG files are allowed'), false);
    }
  };
  const upload = multer({ storage: storageEngine, fileFilter: fileFilter })
module.exports = upload