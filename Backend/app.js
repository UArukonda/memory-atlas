// import of express from dependency into our file
const express = require("express");

// invoking express function so we can use its methods
const app = express();

// door to our server
const PORT = 4000;
// address to our server
const HOST = "127.0.0.1";

// route - a place we can go in our server
// GET /test route
app.get("/test", (req, res) => {
  res.status(200).send("test endpoint has been hit");
});

// function that creates listener on said socket (host + port)
app.listen(PORT, HOST, () => {
  console.log(`[server] listenig on ${HOST}:${PORT}`);
});
