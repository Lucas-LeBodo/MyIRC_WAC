import  { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../Views/Login";
import ChatRoom from "../Views/Room";
import Main from "../Views/Main";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path="/" component={Login} exact={true} />
                    <Route path="/main" component={Login} exact={true} />
                    <Route path="/main/:name" component={Main} exact={true} />
                    <Route path="/main/:name/:roomID" component={ChatRoom}/>
                </Switch>
            </Fragment>
        </BrowserRouter>
    );
};

export default AppRouter;