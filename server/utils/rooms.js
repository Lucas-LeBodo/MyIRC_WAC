const rooms = [];

const addRoom = (room) => {
  room = room.trim().toLowerCase();
  if (rooms.includes(room)) return;
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
