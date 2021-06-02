import React, {Fragment} from "react";
import Chat from "../composants/Chat";

const ChatRoom = (props) => {
  const roomID = props.match.params.roomID;
  const [newMessage , setNewMessage] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    setNewMessage("");
  };

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