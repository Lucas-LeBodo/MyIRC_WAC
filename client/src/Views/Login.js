import React, { useState, Fragment } from "react";
import { Redirect } from "react-router";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function Login() {
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onTextChange = (e) => {
    setName(e.target.value);
  };

  const onNameSubmit = (e) => {
    e.preventDefault();
    if (name === "") return console.log("empty name");
    socket.emit("name", name);
    setName(name);
    setRedirect(true);
  };

  if (redirect === true) {

    return <Redirect to={{ pathname: `/main/${name}` }} />;
  }

  return (
    <Fragment>
      <form onSubmit={onNameSubmit} className={"loginForm"}>
        <h1> Login </h1>
        <div className="loginDivForm">
          <input name="name" onChange={(e) => onTextChange(e)} value={name} placeholder={"Username"} className="loginInput" autoComplete="off" />
          <button> test </button>
        </div>
      </form>
    </Fragment>
  );
}

export default Login;
