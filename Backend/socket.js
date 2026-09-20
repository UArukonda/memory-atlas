const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { parseCookie } = require("cookie");
const {
  getRelationship,
} = require("./repositories/relationship.repository.js");
const {
  createMessageDocument,
} = require("./repositories/message.repository.js");

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const cookies = parseCookie(socket.handshake.headers.cookie || "");
      const token = cookies.token;

      if (!token) {
        return next(new Error("Please login"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const relationship = await getRelationship(decoded.id);
      if (!relationship) {
        return next(new Error("You are not in a relationship"));
      }

      socket.data.userId = decoded.id;
      socket.data.relationshipId = relationship._id.toString();
      next();
    } catch (err) {
      console.log("[socket auth]", err);
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    const { userId, relationshipId } = socket.data;

    socket.join(relationshipId);

    socket.on("message:send", async (payload) => {
      try {
        const text =
          typeof payload?.text === "string" ? payload.text.trim() : "";

        if (!text || text.length > 2000) {
          return;
        }

        const message = await createMessageDocument({
          relationshipId,
          sender: userId,
          text,
        });

        io.to(relationshipId).emit("message:new", message);
      } catch (err) {
        console.error("[socket] message:send failed", err);
      }
    });
  });

  return io;
};

module.exports = initSocket;
