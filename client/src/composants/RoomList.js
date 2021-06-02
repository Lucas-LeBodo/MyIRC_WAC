import React, {Fragment} from "react";
import { Link } from "react-router-dom";
const RoomList = (props) => {
    const [roomName, setRoomName] = React.useState("");
    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };


    return (
        <div className="home-container">
            <input
                type="text"
                placeholder="Room"
                value={roomName}
                onChange={handleRoomNameChange}
                className="text-input-field"
            />
            <Link to={`/main/${props.name}/${roomName}`} className="enter-room-button">
                Join room
            </Link>
        </div>
    );
}

export default RoomList;