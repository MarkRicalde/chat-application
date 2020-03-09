import React from "react";
import moment from "moment";
import "./components.css";

class ChatHistory extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.state = {
            history: [],
            user: props.user,
        };
    }

    componentDidMount() {
        this.socket.on('chat history', (chatHistory) => {
            this.setState({history: chatHistory})
        });

        this.socket.on('chat message', (msg) => {
            this.concatToHistory(msg);
        });

        this.socket.on('chat command', (cmd) => {
            this.concatToHistory(cmd);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if  (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        }
    }

    concatToHistory(msg) {
        this.setState((state) => ({
            history: state.history.concat(msg)
        }))
    }

    formatMsg(msg, index) {

        const userColor = {color: `#${msg.user.color}`};
        const timestamp = moment.unix(msg.timestamp).format("H:mm:ss");
        let userMsg = (<>{`(${timestamp})`} <span style={userColor}>{msg.user.name}</span>: {msg.text}</>);

        if (JSON.stringify(msg.user.name) === JSON.stringify(this.state.user.name)) {
            userMsg = (<b>{userMsg}</b>);
        }

        return (
            <p key={index} className="text-break m-0">{userMsg}</p>
        );
    }

    render() {
        return (
            <div className="ChatBackground d-flex flex-column-reverse overflow-auto text-left h-75">
            {this.state.history.slice(0).reverse().map(
                (msg, index) => this.formatMsg(msg, index)
            )}
            </div>
        );
    }
}

export default ChatHistory;
