const localStorage = require('localStorage');
const jwt_decode = require ('jwt-decode')

function is_admin(req, res, next) {
    const token = req.headers.authorization;
    var decoded = jwt_decode(token);
    console.log(decoded.role);
    if (decoded.role !="Admin") {
      return res.status(401).json({ message: 'You are not Admin.' });
    }
    next();
  }
  
  module.exports = is_admin;
  