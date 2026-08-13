// import of express from dependency into our file
const express = require("express");
const authRoutes = require("./routes/authRoutes.js");
const endpoints = require("./endpoints.json");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// invoking express function so we can use its methods
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints });
});

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = app;
