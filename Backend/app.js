// import of express from dependency into our file
const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const relationshipRoutes = require("./routes/relationshipRoutes.js");
const endpoints = require("./endpoints.json");
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
app.use(cookieParser());

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints });
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api", profileRoutes);

app.use("/api", relationshipRoutes);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = app;
