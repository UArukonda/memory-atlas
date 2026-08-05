// import of express from dependency into our file
const express = require("express");

// invoking express function so we can use its methods
const app = express();

app.use(express.json());

// const public = `${__dirname}/public`;

// function that creates listener on said socket (host + port)
module.exports = app;
