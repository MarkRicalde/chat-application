/**
 * Name: Mark Danez Ricalde
 * UCID: 10171889
 * Tutorial section: B02
 */

import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        // Create a React reference for text input
        this.input = React.createRef();
        this.socket = props.socket;
        this.state = {user: props.user};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if  (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        }
    }

    /**
     * Sends the user's message to the server
     */
    sendMsg() {
        const currentText = this.input.current.value;
        if (!currentText) {
            // If no message is written
            return;
        }
        this.input.current.value = '';

        if (currentText.startsWith('/')) {
            this.socket.emit('chat command', currentText);
            // No message sent due to being a command
            return;
        }

        const msg = {
            user: this.state.user,
            text: currentText,
        };
        this.socket.emit('chat message', msg);
    }

    render() {
        return (
            <div className="ChatInput rounded-bottom">
                <InputGroup className="mb-3">
                    <FormControl
                        ref={this.input}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                this.sendMsg()
                            }
                        }}/>
                </InputGroup>
            </div>
        );
    }
}

export default ChatInput;
