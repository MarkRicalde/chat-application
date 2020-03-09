/**
 * Name: Mark Danez Ricalde
 * UCID: 10171889
 * Tutorial section: B02
 */

import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

/**
 * Users contains the list of online users
 */
class Users extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.state = {onlineUsers:[]};
    }

    /**
     * Sets up the socket.io listeners
     */
    componentDidMount() {
        this.socket.on('online users', (onlineUsers) => {
            this.setState({onlineUsers: onlineUsers})
        });
    }

    formatUserItem(user, index) {
        // Get the user's color
        const userColor = {color: `#${user.color}`};

        return (
            <ListGroupItem key={index}><span style={userColor} className="text-break">{user.name}</span></ListGroupItem>
        );
    }

    render() {
        return (
            <div className="Users text-center">
                <p>Online Users</p>
                <div className="Online overflow-auto rounded h-75">
                    <ListGroup>
                        {this.state.onlineUsers.map(
                            (user, index) => this.formatUserItem(user, index)
                        )}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default Users;
