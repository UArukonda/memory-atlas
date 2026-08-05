const app = require("./app.js");

// door to our server
const PORT = 4000;
// address to our server
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`[server] listenig on ${HOST}:${PORT}`);
});
