const jwt = require("jsonwebtoken");

const createToken = (id) => {
    const secret = process.env.JWT_SECRET || "fallback_secret";
    const token = jwt.sign({ userId: id }, secret, { expiresIn: "2h" });
    return token;
}

module.exports = createToken;