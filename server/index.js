const app = require("express");
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const port = 4000;

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
  });

  socket.on("name", (name) => {
    console.log(name);
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

http.listen(port, () => {
  console.log(`server is listen on port ${port}!`);
});
