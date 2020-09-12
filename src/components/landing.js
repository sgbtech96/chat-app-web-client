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
                <div className="landing-heading">
                    Chitter Chatter Client v1.0
                </div>
                <div className="landing-description">
                    Get an account for yourself and chat end-to-end with any of
                    the registered users!
                </div>
                <div className="creator-name">
                    Made & Maintained by Siddhant Gandhi
                </div>
                <div className="creator-link">
                    <a
                        className="linker"
                        target="_blank"
                        href="https://www.linkedin.com/in/sgbtech96/"
                    >
                        My LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
}
