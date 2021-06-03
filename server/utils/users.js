const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

const getUserByName = (username) => {
  username = username.trim().toLowerCase();
  const user = users.filter((user) => user.username === username);
  if (!user) return console.log("user doesn't exist");
  return user;
};

module.exports = {
  addUser,
  getUsersInRoom,
  getUserByName,
};
