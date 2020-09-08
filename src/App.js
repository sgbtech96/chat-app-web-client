import React, { useState, useEffect } from "react";
import "./App.css";
import SendOTP from "./components/auth/sendOTP";
import VerifyOTP from "./components/auth/verifyOTP";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import AllUsers from "./components/auth/allUsers";
import Logout from "./components/auth/logout";
import Client from "./components/client/client";
import Home from "./components/home/home";
import Landing from "./components/landing";
import "./components/home/home.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useLocation,
} from "react-router-dom";

function App() {
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    return (
        <Router>
            <div className="complete-wrapper">
                <Home token={token} />
                <Switch>
                    <Route exact path="/">
                        <Landing />
                    </Route>
                    <Route path="/sendOTP">
                        <SendOTP />
                    </Route>
                    <Route path="/verifyOTP">
                        <VerifyOTP />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login setToken={setToken} />
                    </Route>
                    <Route path="/allUsers">
                        <AllUsers />
                    </Route>
                    <Route path="/logout">
                        <Logout setToken={setToken} />
                    </Route>
                    <Route path="/client">
                        <Client />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
