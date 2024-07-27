const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.hashPassword = async password => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

exports.generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

exports.USER_TYPES = {
  PUBLIC: "PUBLIC",
  USER: "USER"
};

exports.permit = type => (req, res, next) => {
  const token = req.cookies.jwt;
  if (type === this.USER_TYPES.USER && !token) return res.sendError("not permitted");
  next();
};
