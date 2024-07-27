const express = require("express");
const router = express.Router();
const controller = require("../controllers/MenuController");
const {permit, USER_TYPES} = require("../helpers");

router.get("/:id", permit(USER_TYPES.PUBLIC), controller.finalMenu);

module.exports = router;
