import React, {useState, useEffect, Fragment} from "react";
import { FaSignOutAlt } from "react-icons/fa"
import { Redirect } from "react-router";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function Chat(props) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("") 
    const [redirect, setRedirect] = useState(false);
    const [chat, setChat] = useState([]);
    const [room, setRoom] = useState("");

    useEffect(() => {
        setRoom(props.room);
        setName(props.name);
        socket.emit("joinRoom", props.room, props.name);
    }, []);

    useEffect(() => {
        if (props.name) console.log(props.name);
        socket.on("message", (message) => {
            setChat([...chat, message]);
        });
    });

    const onMessageSubmit = (e) => {
        e.preventDefault();
        socket.emit("message", `${name} : ${message}`, room);
        setMessage("");
    };
    /* const onPrivateMessageSubmit = (e) => {
        e.preventDefault();
        socket.emit("sendPrivateMessage", `${name} : ${message}`, "test");
        setMessage("");
    }; */

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
            {/* <form onSubmit={onPrivateMessageSubmit}>
                <label>message</label>
                <input
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button>Send private message</button>
            </form> */}
            <button onClick={() => setRedirect("/")}><FaSignOutAlt/></button>
            <div>
                {renderChat()}
            </div>
            <form onSubmit={onMessageSubmit}>
                <input
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder="Send Message !"
                />
                <button>Send message</button>
            </form>
        </Fragment>
    );
}

export default Chat;
