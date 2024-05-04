const jwt = require("jsonwebtoken");

module.exports.verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "No Token" });
  } else {
    jwt.verify(token, "secret_key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication Error" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};
