import React , {Fragment , useState} from "react";
import Chat from "../components/Chat";
import { Redirect } from "react-router";
import {FaSignOutAlt} from "react-icons/fa";

const ChatRoom = (props) => {
  const roomID = props.match.params.roomID;
  const [redirect, setRedirect] = useState(false);

  if (redirect !== false) {
      return <Redirect to={{ pathname: redirect }} />;
  }

  return (
      <Fragment>
        <div className="chat-room-container">
            <div className="headerChat">
                <h1 className="room-name">Room: {roomID}</h1>
                <button onClick={() => setRedirect("/")}><FaSignOutAlt/></button>
            </div>
            <Chat name={props.match.params.name} room={roomID}/>
        </div>
      </Fragment>
  )
};
export default ChatRoom;