const localStorage = require('localStorage');
const jwt_decode = require ('jwt-decode')

function is_Com(req, res, next) {
    const token = req.headers.authorization;
    var decoded = jwt_decode(token);
    console.log(decoded.role);
    if (decoded.role !="Company") {
      return res.status(401).json({ message: 'You are not Company.' });
    }
    next();
  }
  
  module.exports = is_Com;
  