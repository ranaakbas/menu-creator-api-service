const express = require("express");
const router = express.Router();
const MenuItemRoutes = require("./MenuItemRoutes");
const CategoryRoutes = require("./CategoryRoutes");
const AuthRoutes = require("./AuthRoutes");

router.use("/menu-items", MenuItemRoutes);
router.use("/categories", CategoryRoutes);
router.use("/auth", AuthRoutes);

module.exports = router;
