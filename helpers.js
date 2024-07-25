const bcrypt = require("bcrypt");

exports.hashPassword = async password => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};
