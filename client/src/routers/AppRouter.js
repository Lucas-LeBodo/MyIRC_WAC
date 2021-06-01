import react, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Home from "../Views/Home";
import Login from "../Views/Login";
import ChatRoom from "../Views/Room";
import hometemp from "../Views/hometemp"
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/home" component={hometemp} exact={true} />
          <Route path="/:roomID" component={ChatRoom}/>
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default AppRouter;
