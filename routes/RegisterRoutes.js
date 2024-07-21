const express = require("express");
const router = express.Router();
const controller = require("../controllers/RegisterController");

router.post("/", controller.register);

module.exports = router;
