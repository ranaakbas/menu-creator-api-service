const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const MAX_AGE = 60 * 60 * 24 * 1000;

exports.checkRequiredFieldsForRegister = (req, res, next) => {
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

exports.checkFieldsAreValidForRegister = (req, res, next) => {
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

exports.checkRequiredFieldsForLogin = (req, res, next) => {
  const {email, password} = req.body;

  const errors = [];
  if (!email) errors.push("email is required");
  if (!password) errors.push("password is required");
  if (errors.length > 0) {
    return res.sendError(errors);
  }
  next();
};

exports.checkFieldsAreValidForLogin = (req, res, next) => {
  const {email, password} = req.body;

  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== "string" || !emailRegex.test(email)) errors.push("Email is invalid");
  if (typeof password !== "string" || password.length < 6 || password.length > 50) errors.push("Password is invalid");

  if (errors.length > 0) {
    return res.sendError(errors);
  }

  res.locals = {email, password};
  next();
};

exports.isEmailExist = async (req, res, next) => {
  try {
    const {email} = res.locals;

    const user = await User.findOne({email: email});
    if (!user) {
      return res.sendError("email or password wrong");
    }
    res.locals = {...res.locals, user};
    next();
  } catch (error) {
    return res.sendError(error);
  }
};

exports.isPasswordCorrect = async (req, res, next) => {
  try {
    const {password, user} = res.locals;

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.sendError("email or password wrong");
    }
    next();
  } catch (error) {
    return res.sendError(error);
  }
};

exports.loginWithToken = (req, res) => {
  try {
    const {user} = res.locals;

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: MAX_AGE});
    res.cookie("jwt", token, {MAX_AGE: MAX_AGE});
    return res.json({user, token});
  } catch (error) {
    return res.sendError(error);
  }
};

exports.decodeToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.sendError("no token");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return res.sendError("invalid token");
    }
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.sendError("no user");
    }
    res.locals = {...res.locals, userId};
    next();
  } catch (error) {
    return res.sendError({error});
  }
};

exports.updateLastSessionDate = async (req, res, next) => {
  try {
    const {userId} = res.locals;
    const lastSessionDate = new Date();
    const user = await User.findByIdAndUpdate(userId, {lastSessionDate}, {new: true});
    res.locals = {...res.locals, user};
    next();
  } catch (error) {
    return res.sendError({error});
  }
};

exports.getProfile = async (req, res) => {
  try {
    const {user} = res.locals;
    return res.json(user);
  } catch (error) {
    return res.sendError({error});
  }
};
