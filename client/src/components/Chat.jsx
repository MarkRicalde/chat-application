/**
 * Name: Mark Danez Ricalde
 * UCID: 10171889
 * Tutorial section: B02
 */

import React from 'react';
import './components.css';
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: props.user};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if  (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        }
    }

    render() {
        const userColor = {
            color: `#${this.state.user.color}`
        };

        return (
            <div className="ChatHeight">
                <p align="left">You are <b style={userColor} className="text-break">{this.state.user.name}</b>.</p>
                <ChatHistory socket={this.props.socket} user={this.state.user}/>
                <ChatInput socket={this.props.socket} user={this.state.user}/>
            </div>
        );
    }
}

export default Chat;
