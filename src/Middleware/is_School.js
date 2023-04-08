const localStorage = require('localStorage');
const jwt_decode = require ('jwt-decode')

function is_School(req, res, next) {
    const token = req.headers.authorization;
    var decoded = jwt_decode(token);
    console.log(decoded.role);
    if (decoded.role !="School") {
      return res.status(401).json({ message: 'You are not School.' });
    }
    next();
  }
  
  module.exports = is_School;
  