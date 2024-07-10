const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
require("dotenv").config();

const app = express();

app.use(express.json());

const morgan = require("morgan");
app.use(morgan("combined"));

mongoose
  .connect(process.env.DATABASE_URL)
  .then(result => console.log("DB Connected"))
  .catch(err => console.log(err));

app.use("/", routes);

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
