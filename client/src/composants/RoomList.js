import React, {Fragment} from "react";
import { Link } from "react-router-dom";
const RoomList = (props) => {
    const [roomName, setRoomName] = React.useState("");
    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    const handleSubmit = () => {

    }

    return (
        <div className="home-container">
          <form onSubmit={handlesubmit}>
                <input
                    type="text"
                    placeholder="Room"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    className="text-input-field"
                />
                <input type="submit"/>
                <Link to={`/main/${props.name}/${roomName}`} className="enter-room-button">
                    Join room
                </Link>
            </form>
            <div className="list">

            </div>
        </div>
    );
}

export default RoomList;