const rooms = [];

const addRoom = (room) => {
  room = room.trim().toLowerCase();
  if (rooms.includes(room)) return "room already exist";
  rooms.push(room);
  return room;
};

const getRooms = (filter = "") => {
  if (filter !== "") {
    const filterRooms = rooms.filter((room) => {
      return room.includes(filter);
    });
    return filterRooms;
  }
  return rooms;
};

const removeRoom = (room) => {
  const index = rooms.findIndex((r) => r === room);

  if (index !== -1) {
    return rooms.splice(index, 1);
  }
};

module.exports = {
  addRoom,
  getRooms,
  removeRoom,
};
