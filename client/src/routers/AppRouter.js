import react, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Home from "../Views/Home";
import Login from "../Views/Login";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/login" component={Login} exact={true} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default AppRouter;
