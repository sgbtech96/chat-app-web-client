import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Loader from "../loader";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log("hello");
        const res = await axios.post("http://localhost:8000/login", {
            username,
            password,
        });
        const { error, msg, token } = res.data;
        const usernam = res.data.username;
        setLoading(false);
        if (error) {
            setErrorMsg(error);
        } else {
            setErrorMsg("");
            console.log(msg, token);
            localStorage.setItem("authToken", token);
            localStorage.setItem("username", usernam);
            props.setToken(localStorage.getItem("authToken"));
            history.push("/allUsers");
        }
    };
    return loading === true ? (
        <Loader msg="Logging in" />
    ) : (
        <div className="outer-container below-container">
            <Box boxShadow={2}>
                <div className="inner-container">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="email-text">
                            <TextField
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="email-text">
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="send-otp">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                    {errorMsg.length !== 0 && (
                        <div className="error-send">
                            <Alert severity="error">{errorMsg}</Alert>
                        </div>
                    )}
                </div>
            </Box>
        </div>
    );
}

export default Login;
