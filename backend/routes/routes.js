const express = require("express");
const router = express.Router();
const action = require("../controller/loginController");
const check = require("../middleware/authentication");

const {
  getDatas,
  getData,
  createData,
  deleteData,
  updateData,
} = require("../controller/sqlController");

router.get("/logout", action.logout);
router.post("/login", action.login_post);

router.get("/", check.verifyUser, getDatas);
router.get("/:id", check.verifyUser, getData);
router.post("/", check.verifyUser, createData);
router.put("/:id", check.verifyUser, updateData);
router.delete("/:id", check.verifyUser, deleteData);

module.exports = router;
