import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation,
} from "react-router-dom";
import "./index.css";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../home/home.css";
import Loader from "../loader";

function VerifyOTP(props) {
    const [otp, setOtp] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [mail, setMail] = useState(sessionStorage.getItem("email"));
    const history = useHistory();
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const res = await axios.post("http://localhost:8000/verifyOTPe", {
            email: sessionStorage.getItem("email"),
            otp,
        });
        const { msg, error } = res.data;
        setLoading(false);
        if (error) {
            setErrorMsg(error);
        } else {
            setErrorMsg("");
            console.log(msg);
            history.push("/register");
        }
    };
    return loading === false ? (
        <div className="outer-container below-container">
            <div className="info">
                <div className="info-text">Email Verification</div>
                <div className="info-state">Step 2 of 2</div>
            </div>
            <Box boxShadow={2}>
                <div className="inner-container">
                    <div className="my-mail">
                        Verify the Otp sent to your email &nbsp;
                        {mail.substr(0, 3)}*****
                        {mail.substr(mail.length - 4, 4)}
                    </div>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="email-text">
                            <TextField
                                id="outlined-basic"
                                label="Enter Otp"
                                variant="outlined"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div className="send-otp">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Verify otp
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
    ) : (
        <Loader msg="Verifying otp" />
    );
}

export default VerifyOTP;
