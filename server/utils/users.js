const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => {
    return user.username === username;
  });
  if (existingUser) return console.log("user already exist");

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

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getAllUsers = () => {
  return users;
};

module.exports = {
  addUser,
  getUsersInRoom,
  getUserByName,
  removeUser,
  getAllUsers,
};
