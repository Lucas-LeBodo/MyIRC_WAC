import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router";
import io from "socket.io-client";
import RoomList from "../composants/RoomList"

const socket = io.connect("http://localhost:4000");

function Home(props) {
    const [state , setState] = useState({message: "" , name: ""});
    const [chat , setChat] = useState([]);

    return (
        <Fragment>
            <RoomList name={props.match.params.name}/>
        </Fragment>
    );
}

export default Home;
