const express = require("express");
const mongoose = require("mongoose");
const routers = require("./routers/index");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const User = require("./models/UserModel");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

const morgan = require("morgan");
app.use(morgan("combined"));

mongoose
  .connect(process.env.DATABASE_URL)
  .then(result => console.log("DB Connected"))
  .catch(err => console.log(err));

app.use(function (req, res, next) {
  res.sendError = errorMessages => {
    let errors;
    if (typeof errorMessages === "string") {
      errors = [errorMessages];
    } else if (Array.isArray(errorMessages)) {
      errors = errorMessages;
    } else if (errorMessages.message) {
      errors = [errorMessages.message];
    }
    return res.status(400).json({errors});
  };
  next();
});

app.use(async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.sendError("decoded not work");
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.sendError("token invalid");
      }
      res.locals.user = user;
    }
    next();
  } catch (error) {
    return res.sendError("no login");
  }
});

app.use("/", routers);

// 404
app.use(function (req, res, next) {
  return res.status(404).send({message: "Route" + req.url + " Not found."});
});
// 500 - Any server error
app.use(function (err, req, res, next) {
  console.log("500 error: ", req.originalUrl, err);
  return res.status(500).send({errors: "Error occured"});
});

app.listen(process.env.PORT || 3000);
