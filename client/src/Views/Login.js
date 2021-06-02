import React, { useState, Fragment, useEffect } from "react";
import { Redirect } from "react-router";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function Login() {
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onTextChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const onNameSubmit = (e) => {
    e.preventDefault();
    socket.emit("name", name);
    setName(name);
    setRedirect(true);
  };

  if (redirect === true) {
    localStorage.setItem("name", name);
    return <Redirect to={{ pathname: `/main/${name}` }} />;
  }

  return (
    <Fragment>
      <form onSubmit={onNameSubmit}>
        <label>Name</label>
        <input name="name" onChange={(e) => onTextChange(e)} value={name} />
        <button>Log in</button>
      </form>
    </Fragment>
  );
}

export default Login;
