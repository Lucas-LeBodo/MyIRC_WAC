import react, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Home from "../Views/Home";
import Login from "../Views/Login";
import Main from "../Views/Main";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route path="/" component={Login} exact={true} />
          <Route path="/main/:name" component={Main} exact={true} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default AppRouter;
