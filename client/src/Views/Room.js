import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function Room(props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", room);
    setRoom(props.match.params.room);
    setName(props.match.params.name);
  }, []);

  useEffect(() => {
    if (props.name) console.log(props.name);
    socket.on("message", (message) => {
      //console.log(name, message);
      setChat([...chat, message]);
    });
  });

  const onMessageSubmit = (e) => {
    e.preventDefault();
    console.log(room);
    socket.emit("message", `${name} : ${message}`, room);
    setMessage("");
  };

  if (redirect !== false) {
    return <Redirect to={{ pathname: redirect }} />;
  }

  const renderChat = () => {
    return chat.map((message, index) => {
      return (
        <div key={index}>
          <h3 key={index}>{message}</h3>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <form onSubmit={onMessageSubmit}>
        <label>message</label>
        <input
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>Send message</button>
      </form>
      <button onClick={() => setRedirect("/")}>disconnect</button>
      <div>
        <h1>Chat log</h1>
        {renderChat()}
      </div>
    </Fragment>
  );
}

export default Room;
