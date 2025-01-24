const express = require("express");
const router = express.Router();

const {loginUser, createUser } = require("../controllers/userController");



router.post("/", createUser);
router.post("/login", loginUser);


module.exports = router;
