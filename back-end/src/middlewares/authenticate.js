const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (token === null) {
    return res.sendStatus(401);
  }

  const secret = process.env.JWT_SECRET || "fallback_secret";
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403)
    }
    req.user = user;
    next();
  });  
};

module.exports = authenticateToken;
