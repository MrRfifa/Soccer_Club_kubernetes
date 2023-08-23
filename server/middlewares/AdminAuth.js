const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.user;
    req.username = verified.userName;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ errorMessage: "Unauthorized Error" });
  }
}

module.exports = auth;
