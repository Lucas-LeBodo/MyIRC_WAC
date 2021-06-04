import React, {useState, Fragment} from "react";
import { Redirect } from "react-router";

const RoomList = (props) => {
    const [roomName, setRoomName] = React.useState("");
    const [redirect, setRedirect] = useState(false);
    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setRedirect(true);
        if (redirect === true) {
            return <Redirect to={{pathname: `/main/${props.name}/${roomName}`}}/>;
        }
    }

    return (
        <Fragment>
          <form onSubmit={handleSubmit} className="formRoom">
              <div className="selectRoom">
                  <div className="list">
                      <p> Salon A<br/> Salon B <br/> Salon C</p>
                  </div>
                  <div className="roomForm">
                      <h1> Choose Room </h1>
                    <input
                        type="text"
                        placeholder="Room"
                        value={roomName}
                        onChange={handleRoomNameChange}
                        className="text-input-field"
                    />
                  </div>
              </div>
            </form>
        </Fragment>
    );
}

export default RoomList;