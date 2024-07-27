const express = require("express");
const router = express.Router();
const controller = require("../controllers/AuthController");
const {permit, USER_TYPES} = require("../helpers");

router.post(
  "/register",
  permit(USER_TYPES.PUBLIC),
  controller.checkRequiredFieldsForRegister,
  controller.checkFieldsAreValidForRegister,
  controller.checkEmailIsUnique,
  controller.register
);

router.post(
  "/login",
  permit(USER_TYPES.PUBLIC),
  controller.checkRequiredFieldsForLogin,
  controller.checkFieldsAreValidForLogin,
  controller.isEmailExist,
  controller.isPasswordCorrect,
  controller.loginWithToken
);

router.get("/profile", permit(USER_TYPES.USER), controller.updateLastSessionDate, controller.getProfile);

router.put("/change-password", permit(USER_TYPES.USER), controller.changePassword);

router.get("/confirm/:token", permit(USER_TYPES.PUBLIC), controller.validateEmailToken);

module.exports = router;
