import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./client.css";
import { TextField } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import SendButton from "./sendBtn";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import FaceIcon from "@material-ui/icons/Face";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import Chat from "./chat";
import axios from "axios";
import "../home/home.css";
import Loader from "../loader";

let socket;
class Client extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            text: "",
            allMessages: [],
            roomId: localStorage.getItem("roomId"),
            activeUsers: [],
            username: localStorage.getItem("username"),
            loading: true,
            auth: true,
        };
        this.handleSend = this.handleSend.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom = () => {
        if (this.messagesEnd)
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    componentDidUpdate() {
        this.scrollToBottom();
    }

    async componentDidMount() {
        socket = socketIOClient(
            "https://sgbtech96-auth-chat-server.herokuapp.com/"
        );
        console.log("did mount");
        socket.on("connect", async () => {
            console.log("hello socket");
            socket.emit("join", {
                username: this.state.username,
                room: this.state.roomId,
            });
            const res = await axios.get(
                `https://sgbtech96-auth-chat-server.herokuapp.com/chats/${this.state.roomId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "authToken"
                        )}`,
                    },
                }
            );
            console.log(res.data);
            if (res.data.error) {
                this.setState({
                    loading: false,
                    auth: false,
                });
                return;
            }
            if (res.data.chats.length === 0) {
                this.setState({
                    loading: false,
                    auth: true,
                });
                return;
            }
            this.setState(
                {
                    allMessages: res.data.chats,
                },
                () => {
                    console.log(this.state.allMessages);
                    this.setState({
                        loading: false,
                        auth: true,
                    });
                }
            );
            console.log(this.state.allMessages);
            this.scrollToBottom();
        });
        socket.on("newMessage", (message) => {
            // console.log(message)
            const updatedMessages = [...this.state.allMessages, message];
            this.setState({
                allMessages: updatedMessages,
            });
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }

    handleSend(event) {
        if (this.state.text === "") return;
        socket.emit(
            "createMessage",
            {
                text: this.state.text,
                room: this.state.roomId,
                username: this.state.username,
            },
            () => {
                console.log("callback check");
            }
        );
        this.setState(
            {
                text: "",
            },
            () => {
                this.textInput.current.focus();
            }
        );
    }

    render() {
        const {
            allMessages,
            activeUsers,
            error,
            roomId,
            username,
        } = this.state;
        if (!this.state.loading)
            return this.state.auth === true ? (
                <div className="chat-page below-container">
                    <div className="sidebar">
                        <div className="sidebar-text">
                            <div className="sidebar-icon">
                                <AccountCircle fontSize="large" />
                            </div>
                            {roomId.replace(username, "")}
                        </div>
                        <div className="sidebar-msg">
                            <div>
                                <LockIcon />
                            </div>
                            <div className="sidebar-msg-text">
                                This communication is end-to-end
                            </div>
                        </div>
                        <div className="extra-info">
                            Press ENTER key to send
                        </div>
                        {/* <div className="active-users">
                        {activeUsers.map((user) => <div><Chip avatar={user && <Avatar>{user.username[0]}</Avatar>} label={<div className="active-name">{user.username}</div>} /></div>)}
                    </div> */}
                        <div className="sidebar-image">
                            <img
                                className="actual-image"
                                src="https://us.123rf.com/450wm/topvectors/topvectors1706/topvectors170600696/80957941-stock-vector-smiling-businessman-and-businesswoman-having-meeting-in-office-vector-illustration-isolated-on-a-whi.jpg?ver=6"
                            />
                        </div>
                    </div>
                    <div className="contain">
                        <div className="display-section">
                            {allMessages.map((msg) => (
                                <Chat key={msg.createdAt} message={msg} />
                            ))}
                            <div
                                style={{ float: "left", clear: "both" }}
                                ref={(el) => {
                                    this.messagesEnd = el;
                                }}
                            ></div>
                        </div>
                        <div className="send-section">
                            <div className="form-contain">
                                <div className="form-input">
                                    <TextField
                                        value={this.state.text}
                                        name="text"
                                        label="Message"
                                        variant="outlined"
                                        required={true}
                                        onChange={this.handleChange}
                                        placeholder="Type here"
                                        autoFocus={true}
                                        fullWidth={true}
                                        inputRef={this.textInput}
                                        onKeyPress={(event) => {
                                            if (event.charCode === 13) {
                                                this.handleSend();
                                            }
                                        }}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="form-send">
                                    <SendButton handleSend={this.handleSend} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="auth">Access Forbidden</div>
            );
        else return <Loader msg="Fetching your chats" />;
    }
}

export default Client;
