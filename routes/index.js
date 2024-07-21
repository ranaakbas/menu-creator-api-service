const express = require("express");
const router = express.Router();
const MenuItemRoutes = require("./MenuItemRoutes");
const CategoryRoutes = require("./CategoryRoutes");
const RegisterRoutes = require("./RegisterRoutes");

router.use("/menu-items", MenuItemRoutes);
router.use("/categories", CategoryRoutes);
router.use("/register", RegisterRoutes);

module.exports = router;
