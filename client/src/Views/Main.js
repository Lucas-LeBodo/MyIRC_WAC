import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router";
import RoomList from "../components/RoomList"

function Home(props) {

  return (
      <Fragment>
        <RoomList name={props.match.params.name}/>
      </Fragment>
  );
}

export default Home;