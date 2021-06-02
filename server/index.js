require("dotenv").config();
const { PORT } = process.env;
const app = require("express");
const { addUser, getUsersInRoom } = require("./utils/users");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("joinRoom", (room, username) => {
    //console.log(username,room)
    const { user } = addUser({ id: socket.id, username, room });
    const usersRoom = getUsersInRoom(room)
    socket.join(user.room);
    console.log(usersRoom);
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
