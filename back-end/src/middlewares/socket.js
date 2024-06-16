const socket = require("socket.io");

const initSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
  
  io.on("connection", (socket) => {
    console.log("User connected...");
    socket.on("disconnect", () => {
      console.log("User disconnected...");
    });
  });
  return io;
};

module.exports = initSocket;
