import React, { useState, Fragment, useEffect } from "react";
import { Redirect } from "react-router";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const RoomList = (props) => {
  const [roomName, setRoomName] = React.useState("");
  const [redirect, setRedirect] = useState(false);
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    socket.emit("listRoom");
  }, []);

  useEffect(() => {
    socket.on("listRoom", (roomList) => {
      //console.log(roomList);
      setRoomList(roomList);
    });
    console.log(roomList);
  }, [roomList]);

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRedirect(`/main/${props.name}/${roomName}`);
  };

  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />;
  }

  const renderRooms = () => {
    return roomList.map((room, index) => {
      return (
        <div key={index}>
          <h3 key={index}>
            <div className="rooms">
              <div onClick={() => setRedirect(`/main/${props.name}/${room}`)}>
                {room}
              </div>
            </div>
          </h3>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="formRoom">
        <div className="selectRoom">
          <div className="list">{renderRooms()}</div>
          <div className="roomForm">
            <h1> Choose Room </h1>
            <input
              type="text"
              placeholder="Room"
              value={roomName}
              onChange={handleRoomNameChange}
              className="text-input-field"
              autoComplete="off"
            />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default RoomList;
