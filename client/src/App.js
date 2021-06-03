import React, { useState, useEffect, Fragment } from "react";
import AppRouter from "./routers/AppRouter";
import './Styles/style.scss';

function App() {
  return (
    <Fragment>
      <AppRouter />
    </Fragment>
  );
}

export default App;
