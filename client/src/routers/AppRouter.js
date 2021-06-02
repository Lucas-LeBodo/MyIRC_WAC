import react, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Login from "../Views/Login";
import Main from "../Views/Main";
import Room from "../Views/Room";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <Route path="/room/:name/:room" component={Room} exact={true} />
          {/* <Route path="/main/:name" component={Main} exact={true} /> */}
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default AppRouter;
