require("dotenv").config();
const { PORT } = process.env;
const app = require("express");
const {
  addUser,
  getUsersInRoom,
  getUserByName,
  removeUser,
  getAllUsers,
  addNickname,
  changeRoom,
  getUserById,
} = require("./utils/users");
const { addRoom, getRooms, removeRoom } = require("./utils/rooms");
const { join } = require("path");
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
    const nickname = false;
    try {
      const { user } = addUser({ id: socket.id, username, room, nickname });
      socket.join(user.room);
    } catch (e) {
      const { user } = changeRoom(socket.id, room);
      //const { user } = getUserByName(username);
      socket.join(user.room);
    }

    console.log(getRooms());
    // io.to(room).emit("message", `A new user join ${username}`)
  });

  socket.on("leftRoom", () => {
    try {
      const { user } = getUserById(socket.id);
      socket.leave(user.room);
      const { user } = changeRoom(socket.id, false);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("message", (message, room) => {
    if (!room) {
      io.emit("globalMessage", message);
    } else {
      socket.join(room);
      io.to(room).emit("message", message);
    }
  });

  socket.on("sendPrivateMessage", (message, to) => {
    const recipient = getUserByName(to);
    console.log(recipient[0].id);
    socket.to(recipient[0].id).emit("message", message);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

http.listen(PORT || 4000, () => {
  console.log(`server is listen on port ${PORT}!`);
});
