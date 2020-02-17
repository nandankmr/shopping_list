const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).json({ msg: "no token, authorisation denied" });
  else
    try {
      const decoded = jwt.verify(token, require("config").get("jwt_secret"));

      req.user = decoded;
      next();
    } catch (e) {
      res.status(400).json({ msg: "Token not verified" });
    }
};

module.exports = auth;
