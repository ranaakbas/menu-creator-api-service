const express = require("express");
const router = express.Router();
const controller = require("../controllers/AuthController");

router.post(
  "/register",
  controller.checkRequiredFieldsInRegister,
  controller.checkFieldsAreValidInRegister,
  controller.checkEmailIsUnique,
  controller.register
);

router.post(
  "/login",
  controller.checkRequiredFieldsInLogin,
  controller.checkFieldsAreValidInLogin,
  controller.isEmailExist,
  controller.isPasswordCorrect,
  controller.loginWithToken
);

module.exports = router;
