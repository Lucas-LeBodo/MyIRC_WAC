const users = [];

const addUser = ({ id, username, room, nickname }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  if (nickname) nickname = nickname.trim().toLowerCase();

  const existingUser = users.find((user) => {
    return user.username === username;
  });
  if (existingUser) return false;

  const user = { id, username, room, nickname };
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

const getUserById = (id) => {
  const user = users.filter((user) => user.id === id);
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

const addNickname = (id, nickname) => {
  const index = users.findIndex((user) => user.id === id);
  users[index].nickname = nickname;
  return users[index];
};

const changeRoom = (id, room) => {
  try {
    const index = users.findIndex((user) => user.id === id);
    users[index].room = room;
    return users[index];
  } catch (e) {
    //console.log(e);
  }
};

module.exports = {
  addUser,
  getUsersInRoom,
  getUserByName,
  removeUser,
  getAllUsers,
  addNickname,
  changeRoom,
  getUserById,
};
