const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.hashPassword = async password => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

exports.generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
