const User = require("../models/UserModel");

exports.checkRequiredFields = (req, res, next) => {
  const {firstName, lastName, email, password} = req.body;

  const errors = [];
  if (!firstName) errors.push("first name is required");
  if (!lastName) errors.push("last name is required");
  if (!email) errors.push("email is required");
  if (!password) errors.push("password is required");
  if (errors.length > 0) {
    return res.sendError(errors);
  }
  next();
};

exports.checkFieldsAreValid = (req, res, next) => {
  const {firstName, lastName, email, password} = req.body;

  const errors = [];
  if (typeof firstName !== "string" || firstName.length < 3 || firstName.length > 50)
    errors.push("First name is invalid");
  if (typeof lastName !== "string" || lastName.length < 3 || lastName.length > 50) errors.push("Last name is invalid");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== "string" || !emailRegex.test(email)) errors.push("Email is invalid");
  if (typeof password !== "string" || password.length < 6 || password.length > 50) errors.push("Password is invalid");

  if (errors.length > 0) {
    return res.sendError(errors);
  }

  res.locals = {firstName, lastName, email, password};
  next();
};

exports.checkEmailIsUnique = async (req, res, next) => {
  const {email} = req.body;
  try {
    const emailExists = await User.exists({email});
    if (emailExists) {
      return res.sendError("Email already exists");
    }
    next();
  } catch (error) {
    return res.sendError(error);
  }
};

exports.register = async (req, res) => {
  try {
    const {firstName, lastName, email, password} = res.locals;
    const newUser = await User.create({firstName, lastName, email, password});
    return res.json(newUser);
  } catch (error) {
    return res.sendError(error);
  }
};
