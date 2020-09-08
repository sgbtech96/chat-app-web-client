import React, { useState, useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Loader from "../loader";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
} from "react-router-dom";
import axios from "axios";
import "./index.css";
import "../home/home.css";

function SendOTP(props) {
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        sessionStorage.setItem("email", email);
        setLoading(true);
        const res = await axios.post(
            "https://sgbtech96-chit-auth-server.herokuapp.com/sendOTPe",
            {
                email: sessionStorage.getItem("email"),
            }
        );
        const { msg, error } = res.data;
        if (error) {
            setLoading(false);
            setErrorMsg(error);
        } else {
            setLoading(false);
            setErrorMsg("");
            console.log(msg);
            history.push("/verifyOTP");
        }
    };
    return loading === true ? (
        <Loader msg="sending OTP" />
    ) : (
        <div className="outer-container below-container">
            <div className="info">
                <div className="info-text">Email Verification</div>
                <div className="info-state">Step 1 of 2</div>
            </div>
            <Box boxShadow={2}>
                <div className="inner-container">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="email-text">
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="send-otp">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Send otp
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

export default SendOTP;
