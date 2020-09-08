import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./landing.css";
import "./home/home.css";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Landing() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div className="below-container">
            <div className="landing">
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Hey there, Gear up to explore my all new Chitter
                            Chatter Client(v1.0)!
                        </Typography>
                        <br />
                        <Typography
                            className={classes.pos}
                            color="textSecondary"
                        >
                            Herein, I'll walk you through the steps to use my
                            application.
                        </Typography>
                        <Typography variant="body2" component="p">
                            Click on the "Register" button on the top-right to
                            set-up an account for yourself.
                            <br />
                            You'll be prompted to send an OTP to your email
                            address, followed by its verification.
                            <br />
                            You'll now be asked to generate credentials for your
                            account.
                            <br />
                            Hurray!, your account is now set up. Use your
                            credentials to login.
                            <br />
                            After successfully logging-in, you'll be redirected
                            to a page wherein the list of all the registered
                            users would be presented.
                            <br />
                            You can now choose to chat END-TO-END with any of
                            these users.
                            <br />
                            Finally, database to our rescue, you'll not loose
                            any of your previous chats when you logout.
                        </Typography>
                        <br />
                        <Typography
                            className={classes.pos}
                            color="textSecondary"
                        >
                            Key features
                        </Typography>
                        <Typography variant="body2" component="p">
                            Full JWT based authorization.
                            <br />
                            Password Hashing.
                            <br />
                            OTP based email verification.
                            <br />
                            Single account per email.
                            <br />
                            Ability to chat with any of the registered users.
                            <br />
                            Chats are NOT LOST when you logout.
                            <br />
                            Great user experience
                        </Typography>
                        <br />
                        <Typography
                            className={classes.pos}
                            color="textSecondary"
                        >
                            About Me
                        </Typography>
                        <Typography variant="body2" component="p">
                            This project is made and maintained by Siddhant
                            Gandhi, a student at IIIT Una.
                            <br />
                            <a
                                href="https://www.linkedin.com/in/sgbtech96/"
                                target="_blank"
                            >
                                LinkedIn
                            </a>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
