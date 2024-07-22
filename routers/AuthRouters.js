const express = require("express");
const router = express.Router();
const controller = require("../controllers/AuthController");

router.post(
  "/register",
  controller.checkRequiredFields,
  controller.checkFieldsAreValid,
  controller.checkEmailIsUnique,
  controller.register
);

router.post("/login", controller.login);

module.exports = router;
