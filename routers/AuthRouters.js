const express = require("express");
const router = express.Router();
const controller = require("../controllers/AuthController");

router.post(
  "/register",
  controller.checkRequiredFieldsForRegister,
  controller.checkFieldsAreValidForRegister,
  controller.checkEmailIsUnique,
  controller.register
);

router.post(
  "/login",
  controller.checkRequiredFieldsForLogin,
  controller.checkFieldsAreValidForLogin,
  controller.isEmailExist,
  controller.isPasswordCorrect,
  controller.loginWithToken
);

router.get(
  "/profile",
  controller.getToken,
  controller.decodeToken,
  controller.findUserByToken,
  controller.updateLastSessionDate,
  controller.getProfile
);

module.exports = router;
