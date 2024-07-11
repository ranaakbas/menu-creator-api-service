const express = require("express");
const router = express.Router();
const MenuItemRoutes = require("./MenuItemRoutes");

router.use("/menu-items", MenuItemRoutes);

module.exports = router;
