import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Loader from "../loader";
import { useHistory } from "react-router-dom";

function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const res = await axios.post(
            "https://sgbtech96-chit-auth-server.herokuapp.com/register",
            {
                email: sessionStorage.getItem("email"),
                username,
                password,
                confirmPassword,
            }
        );
        const { error, msg } = res.data;
        setLoading(false);
        if (error) {
            setErrorMsg(error);
        } else {
            setErrorMsg("");
            console.log(msg);
            sessionStorage.removeItem("email");
            history.push("/login");
        }
    };
    return loading === true ? (
        <Loader msg="Setting up your account" />
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
                        <div className="email-text">
                            <TextField
                                id="outlined-basic"
                                label="Confirm Password"
                                variant="outlined"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="send-otp">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Register
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

export default Register;
