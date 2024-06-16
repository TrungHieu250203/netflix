const jwt = require("jsonwebtoken");
const Blacklisting = require("../models/blacklist.model");

const authenticateToken = async (req, res, next) => {
  const authHeader = await req.headers["authorization"];
  const token = authHeader ? authHeader.split(" ")[1] : null;
  if (!token) {
    console.error("Token not found in the authorization header");
    return res.sendStatus(401);
  }
  const blacklistedToken = await Blacklisting.findOne({ token: token });
  if (blacklistedToken) {
    return res.status(403).json({ error: "Token is invalid" });
  }
  const secret = process.env.JWT_SECRET || "fallback_secret";
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: err.message });
    }
    console.log("Checked Token");
    req.user = user;
    next();
  });  
};

module.exports = authenticateToken;
