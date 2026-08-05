// import of express from dependency into our file
const express = require("express");

// invoking express function so we can use its methods
const app = express();

app.use(express.json());

module.exports = app;
