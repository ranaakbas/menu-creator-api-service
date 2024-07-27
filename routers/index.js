const express = require("express");
const router = express.Router();
const MenuItemRouters = require("./MenuItemRouters");
const CategoryRouters = require("./CategoryRouters");
const AuthRouters = require("./AuthRouters");
const MenuRouters = require("./MenuRouters");

router.use("/menu-items", MenuItemRouters);
router.use("/categories", CategoryRouters);
router.use("/auth", AuthRouters);
router.use("/menu", MenuRouters);

module.exports = router;
