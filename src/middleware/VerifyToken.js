const jwt = require('jsonwebtoken');

function VerifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: false, message: "Access denied. No authorization header." });
  }

  const token = authHeader.split(" ")[1];
console.log(token,'tok');
  if (!token) {
    return res.status(401).json({ status: false, message: "Access denied. No access token." });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded; // Optionally store decoded token data in req.user
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "Unauthorized! Invalid or expired token.",
    });
  }
}

module.exports = VerifyToken;
