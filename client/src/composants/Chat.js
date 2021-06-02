import React, {useState, useEffect, Fragment} from "react";
import { Redirect } from "react-router";
import io from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io.connect("http://localhost:4000");

function Chat(props) {
    const [state, setState] = useState({ message: "", name: "" });
    const [redirect, setRedirect] = useState(false);
    const [chat, setChat] = useState([]);

    useEffect(() => {
        console.log(props.name);
        const storeName = props.name;
        setState({ message: "", name: storeName });
    }, []);

    useEffect(() => {
        if (props.name) console.log(props.name);
        socket.on("message", ({ name, message }) => {
            console.log(name, message);
            setChat([...chat, { name, message }]);
        });
    });

    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const onMessageSubmit = (e) => {
        e.preventDefault();
        const { name, message } = state;
        socket.emit("message", { name, message });
        setState({ message: "", name });
    };

    if (redirect !== false) {
        return <Redirect to={{ pathname: redirect }} />;
    }

    const renderChat = () => {
        return chat.map(({ name, message }, index) => {
            return (
                <div key={index}>
                    <h3 key={index}>
                        {name} : <span>{message}</span>
                    </h3>
                </div>
            );
        });
    };

    return (
        <Fragment>
            <form onSubmit={onMessageSubmit}>
                <input
                    name="message"
                    placeholder={"message"}
                    onChange={(e) => onTextChange(e)}
                    value={state.message}
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

export default Chat;