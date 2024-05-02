const jwt = require("jsonwebtoken");

const createToken = (email) => {
    const secret = process.env.JWT_SECRET || "fallback_secret";
    const token = jwt.sign({ email: email }, secret, { expiresIn: "1h" });
    return token;
}

module.exports = createToken;