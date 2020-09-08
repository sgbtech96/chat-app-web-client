import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import "./index.css";
import "../home/home.css";
import Loader from "../loader";

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(true);
    const history = useHistory();
    const fetchUsers = async () => {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/allUsers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        if (res.data.error) {
            setLoading(false);
            setAuth(false);
            return;
        }
        console.log(res.data);
        const tmp = res.data.filter(
            (usr) => usr.username !== localStorage.getItem("username")
        );
        setUsers(tmp);
        setLoading(false);
    };
    const handleClick = async (name) => {
        setLoading(true);
        const res = await axios.post(
            "http://localhost:5000/room",

            {
                us1: localStorage.getItem("username"),
                us2: name,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "authToken"
                    )}`,
                },
            }
        );
        setLoading(false);
        console.log(res.data);
        localStorage.setItem("roomId", res.data.roomId);
        history.push("/client");
    };
    useEffect(() => {
        localStorage.setItem("roomId", "");
        fetchUsers();
    }, []);
    if (auth === false) return <div className="auth">Access Forbidden</div>;
    return loading === false ? (
        <div className="all-users below-container">
            <div className="all-users-head">
                Choose to Chat with any one of the below users
            </div>
            <div className="all-users-list">
                <List component="nav" aria-label="main mailbox folders">
                    {users.map((usr, i) => (
                        <ListItemLink
                            href="#"
                            key={i}
                            name={usr.username}
                            onClick={() => handleClick(usr.username)}
                        >
                            <ListItemText
                                primary={
                                    <div className="username-text">
                                        {usr.username}
                                    </div>
                                }
                            />
                        </ListItemLink>
                    ))}
                </List>
            </div>
        </div>
    ) : (
        <Loader msg="Please Wait" />
    );
}

export default AllUsers;
