const express = require("express");
const router = express.Router();
const MenuItemRoutes = require("./MenuItemRoutes");
const CategoryRoutes = require("./CategoryRoutes");

router.use("/menu-items", MenuItemRoutes);
router.use("/categories", CategoryRoutes);

module.exports = router;
