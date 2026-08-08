// import of express from dependency into our file
const express = require("express");
const authRoutes = require("./routes/auth.js");

// invoking express function so we can use its methods
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
