import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import "./home.css";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textTransform: "uppercase",
        fontWeight: "500",
    },

    title2: {
        fontWeight: "600",
        marginRight: theme.spacing(6),
    },
}));

function Home(props) {
    let history = useHistory();
    const classes = useStyles();
    return (
        <div className="navbar">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Chitter Chatter
                    </Typography>
                    {!props.token && (
                        <Button
                            color="inherit"
                            onClick={() => history.push("/sendOTP")}
                        >
                            Register
                        </Button>
                    )}
                    {!props.token && (
                        <Button
                            color="inherit"
                            onClick={() => history.push("/login")}
                        >
                            Login
                        </Button>
                    )}
                    {props.token && (
                        <Typography variant="h6" className={classes.title2}>
                            Hi {localStorage.getItem("username")}
                        </Typography>
                    )}
                    {props.token && (
                        <Button
                            color="inherit"
                            onClick={() => history.push("/logout")}
                        >
                            Logout
                        </Button>
                    )}
                    {props.token && (
                        <Button
                            color="inherit"
                            onClick={() => history.push("/allUsers")}
                        >
                            Users
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Home;
