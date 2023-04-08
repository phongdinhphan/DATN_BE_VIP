const localStorage = require('localStorage');
function is_login(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'You are not logged in' });
  }
  next();
}

module.exports = is_login;
