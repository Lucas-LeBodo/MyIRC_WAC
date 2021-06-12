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
      if (!user) {
        const { user } = changeRoom(socket.id, room);
        //const { user } = getUserByName(username);
        socket.join(user.room);
      }
      //console.log(getRooms());
    } catch (e) {}

    // io.to(room).emit("message", `A new user join ${username}`)
  });

  socket.on("leftRoom", () => {
    try {
      const { user } = getUserById(socket.id);
      socket.leave(user.room);
      changeRoom(socket.id, false);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("listRoom", () => {
    const roomList = getRooms();
    socket.emit("listRoom", roomList);
  });

  socket.on("userLeave", () => {
    console.log(changeRoom(socket.id, false));
  });

  socket.on("message", (from, messageContent, room) => {
    if (!room) {
      io.emit("globalMessage", from, messageContent);
    } else {
      socket.join(room);
      if (messageContent.startsWith("/users")) {
        const usersList = getUsersInRoom(room);
        io.to(room).emit("sendUserList", usersList);
      } else if (messageContent.startsWith("/nick")) {
        const args = messageContent.split(" ");
        console.log(addNickname(socket.id, args[1]));
      } else if (messageContent.startsWith("/list")) {
        const args = messageContent.split(" ");
        if (args[1]) {
          const roomList = getRooms(args[1]);
          io.to(room).emit("sendRoomList", roomList);
        } else {
          const roomList = getRooms();
          io.to(room).emit("sendRoomList", roomList);
        }
      } else if (messageContent.startsWith("/create")) {
        const args = messageContent.split(" ");
        console.log(addRoom(args[1]));
      } else if (messageContent.startsWith("/delete")) {
        const args = messageContent.split(" ");
        console.log(removeRoom(args[1]));
        socket.emit("leaveRoom");
      } else if (messageContent.startsWith("/join")) {
        const args = messageContent.split(" ");
        socket.emit("userJoinRoom", args[1]);
      } else if (messageContent.startsWith("/part")) {
        const args = messageContent.split(" ");
        socket.emit("leaveRoom");
      } else {
        io.to(room).emit("message", from, messageContent);
      }
    }
  });

  socket.on("sendPrivateMessage", (message, to) => {
    const recipient = getUserByName(to);
    socket.to(recipient[0].id).emit("message", message);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

http.listen(PORT || 4000, () => {
  console.log(`server is listen on port ${PORT}!`);
});
