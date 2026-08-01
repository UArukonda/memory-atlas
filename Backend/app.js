const express = require("express"); // importing everything that express gives us and assigning it to variable "express"

const app = express();

const PORT = 4000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`[server] listenig on ${HOST}:${PORT}`);
});
