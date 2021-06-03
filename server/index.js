require("dotenv").config();
const { PORT } = process.env;
const app = require("express");
const { addUser, getUsersInRoom } = require("./utils/users");
const { addRoom, getRooms } = require("./utils/rooms");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("joinRoom", (room, username) => {
    addRoom(room);
    const { user } = addUser({ id: socket.id, username, room });
    socket.join(user.room);
    // io.to(room).emit("message", `A new user join ${username}`)
  });

  socket.on("message", (message, room) => {
    if (!room) {
      io.emit("globalMessage", message);
    } else {
      socket.join(room);
      io.to(room).emit("message", message);
    }
  });

  /*  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
*/
});

http.listen(PORT || 4000, () => {
  console.log(`server is listen on port ${PORT}!`);
});
