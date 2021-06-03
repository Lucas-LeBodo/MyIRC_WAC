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

module.exports = {
  addRoom,
  getRooms,
};
