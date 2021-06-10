import React, {useState, useEffect, Fragment} from "react";
import {IoSend} from "react-icons/io5";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function Chat(props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState("");
  const  ChatBox = React.createRef();

  useEffect(() => {
    setRoom(props.room);
    setName(props.name);
    socket.emit("joinRoom", props.room, props.name);
  }, []);

  useEffect(() => {
    socket.on("message", (from, messageContent) => {
      setChat( (lastState) => [...lastState, { from, messageContent }]);
    });
  },  []);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", name, message, room);
    setMessage("");
    scrollToMyRef();
  };

   const scrollToMyRef = () => {
        const scroll =
            ChatBox.current.scrollHeight -
            ChatBox.current.clientHeight;
            ChatBox.current.scrollTo(0, scroll);
   };


  /* const onPrivateMessageSubmit = (e) => {
        e.preventDefault();
        socket.emit("sendPrivateMessage", `${name} : ${message}`, "test");
        setMessage("");
    }; */


  const renderChat = () => {
    return chat.map(({ from, messageContent }, index) => {
      return (
        <div key={index}>
          <h3 key={index}>
              <div className="messages">
                <div className="pseudo">{from} :</div> <div className="msg">{messageContent}</div>
              </div>
          </h3>
        </div>
      );
    });
  };

  return (
    <Fragment>
      {/* <form onSubmit={onPrivateMessageSubmit}>
                <label>message</label>
                <input
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button>Send private message</button>
            </form> */}

            <div className="msgBox" ref={ChatBox}>
                {renderChat()}
            </div>
            <form onSubmit={onMessageSubmit} className="msgForm">
                <input
                    className="messageInput"
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder="Send Message !"
                    autoComplete="off"
                />
                <button><IoSend/></button>
            </form>
        </Fragment>
    );
}

export default Chat;
