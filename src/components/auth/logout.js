import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Loader from "../loader";
import "../client/client.css";

function Logout(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(true);
    const leave = async () => {
        const res = await axios.get(
            "https://sgbtech96-auth-chat-server.herokuapp.com/logout",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                    )}`,
                },
            }
        );
        if (res.data.error) {
            setAuth(false);
            return;
        }
        console.log(res.data);
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("roomId");
        props.setToken(localStorage.getItem("authToken"));
        history.push("/");
    };
    useEffect(() => {
        leave();
    }, []);
    if (auth === false) return <div className="auth">Access Forbidden</div>;
    return loading && <Loader msg="Logging out" />;
}

export default Logout;
