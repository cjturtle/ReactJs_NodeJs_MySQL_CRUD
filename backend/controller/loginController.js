const jwt = require("jsonwebtoken");
const connect = require("../database/dbConnection");

module.exports.login_post = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql = "SELECT * FROM accounts WHERE `email` = ? AND `password` = ?";
  connect.db.query(sql, [email, password], (err, data) => {
    if (err) return res.json({ message: "SERVER SIDE ERROR" });
    if (data.length > 0) {
      const name = data[0].name;
      const token = jwt.sign({ name }, "secret_key", { expiresIn: "1d" });
      res.cookie("token", token);
      return res.status(200).json({ Status: "Success" });
    } else {
      return res.json({ Message: "NO RECORDS EXISTED" });
    }
  });
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ Status: "Success" });
};
