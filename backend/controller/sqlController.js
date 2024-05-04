require("dotenv").config();
const moment = require("moment");
const connect = require("../database/dbConnection");

const getDatas = (req, res) => {
  const sql = "SELECT * FROM employeefile";
  connect.db.query(sql, (err, [...result]) => {
    if (err) return res.json({ Message: "Error" });
    return res.status(200).json({ result, Status: "Success", name: req.name });
  });
};

const getData = async (req, res) => {
  const sql = "SELECT * FROM employeefile WHERE recid = ?";

  const id = req.params.id;
  connect.db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.status(200).json(result);
  });
};

const createData = (req, res) => {
  const sql =
    "INSERT INTO employeefile (`fullname`, `address`, `birthdate`, `age`, `gender`, `civilstat`, `contactnum`, `salary`, `isactive`) VALUES (?)";
  const values = [
    req.body.fullname,
    req.body.address,
    req.body.birthdate,
    req.body.age,
    req.body.gender,
    req.body.civilstat,
    req.body.contactnum,
    req.body.salary,
    req.body.isactive,
  ];
  connect.db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.status(200).json(result);
  });
};

const updateData = (req, res) => {
  const sql =
    "UPDATE employeefile SET `fullname`=?, `address`=?, `birthdate`=?, `age`=?, `gender` =?, `civilstat`=?, `contactnum`=?, `salary`=?, `isactive`=? WHERE `recid`=?";
  const id = req.params.id;
  connect.db.query(
    sql,
    [
      req.body.fullname,
      req.body.address,
      moment(req.body.birthdate).format("YYYY-MM-DD"),
      req.body.age,
      req.body.gender,
      req.body.civilstat,
      req.body.contactnum,
      req.body.salary,
      req.body.isactive,
      id,
    ],
    (err, result) => {
      if (err) return res.json(err);
      return res.status(200).json(result);
    }
  );
};

const deleteData = async (req, res) => {
  const sql = "DELETE FROM employeefile WHERE recid = ?";
  const id = req.params.id;
  connect.db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.status(200).json(result);
  });
};

module.exports = {
  createData,
  getDatas,
  getData,
  updateData,
  deleteData,
};
