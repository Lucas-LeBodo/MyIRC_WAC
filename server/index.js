require('dotenv').config();
const { PORT } = process.env;
const app = require("express");
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  //console.log("New WebSocket connection");

  //socket.emit("message", "welcome !");

  //socket.broadcast.emit("message", "A new user has joined!");

  /* socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed!");
    }
    io.emit("message", message);
    callback();
  }); */

  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
  });

/*  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
*/
});

http.listen(PORT || 4000, () => {
  console.log(`server is listen on port ${PORT}!`);
});
