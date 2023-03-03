const multer = require("multer");
const path = require('path')

var storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  const upload = multer({ storage: storageEngine })
module.exports = upload