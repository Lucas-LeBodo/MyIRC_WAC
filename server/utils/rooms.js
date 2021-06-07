const rooms = [];

const addRoom = (room) => {
  room = room.trim().toLowerCase();
  if (rooms.includes(room)) return console.log("room exist");
  rooms.push(room);
  return room;
};

const getRooms = () => {
  return rooms;
};

const removeRoom = (room) => {
  const index = users.findIndex((r) => r === room);

  if (index !== -1) {
    return users.splice(index, 1);
  }
};

module.exports = {
  addRoom,
  getRooms,
  removeRoom,
};
