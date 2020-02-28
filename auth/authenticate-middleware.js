/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if (error) {
        console.log(error);
        res.status(401).json({
          message: 'Invalid credentials'
        })
      } else {
        req.user = decodedToken.user;
        next();
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};