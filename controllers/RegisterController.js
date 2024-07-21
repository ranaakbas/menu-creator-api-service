const User = require("../models/UserModel");

exports.register = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.json(user);
  } catch (error) {
    return res.sendError(error);
  }
};
