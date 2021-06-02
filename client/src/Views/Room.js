import React, {Fragment} from "react";
import Chat from "../components/Chat";

const ChatRoom = (props) => {
  const roomID = props.match.params.roomID;

  console.log(props)

  return (
      <Fragment>
        <div className="chat-room-container">
          <h1 className="room-name">Room: {roomID}</h1>
          <Chat name={props.match.params.name} room={roomID}/>
        </div>
      </Fragment>
  )
};
export default ChatRoom;