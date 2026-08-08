const app = require("./app.js");
const connectDB = require("./db/db.js");
const dotenv = require("dotenv");
const dns = require("dns");
dns.setServers(["8.8.8.8"]);

dotenv.config();

// door to our server
const PORT = 4000;
// address to our server
const HOST = "127.0.0.1";

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, HOST, () => {
      console.log(`[server] listenig on ${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
