const jwt = require("jsonwebtoken");
const config = require("config");

const verifyUserToken = (req, res, next) => {
  // get token from header
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "沒有憑證，拒絕存取" });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json("無效的憑證");
  }
};

module.exports = verifyUserToken;
