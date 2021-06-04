import React, {Fragment } from "react";
import RoomList from "../components/RoomList"

function Home(props) {

  return (
      <Fragment>
        <RoomList name={props.match.params.name}/>
      </Fragment>
  );
}

export default Home;