const express = require("express");
const router = express.Router();
const MenuItemRouters = require("./MenuItemRouters");
const CategoryRouters = require("./CategoryRouters");
const AuthRouters = require("./AuthRouters");

router.use("/menu-items", MenuItemRouters);
router.use("/categories", CategoryRouters);
router.use("/auth", AuthRouters);

module.exports = router;
