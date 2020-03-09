/**
 * Name: Mark Danez Ricalde
 * UCID: 10171889
 * Tutorial section: B02
 */

import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import socketIO from 'socket.io-client';
import {Container, Row, Col} from "react-bootstrap";
import './App.css';
import Chat from "./components/Chat";
import Users from "./components/Users";

class App extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        // Connect to the socket.io server at this endpoint
        this.socket = socketIO('http://localhost:8000');
        // Check if the cookie has user data, otherwise set to default
        this.state = {user: cookies.get('user') || {name: 'Offline', color: '808080'}};
    }

    componentDidMount() {
        this.socket.emit('cookie user', this.state.user);

        this.socket.on('user', (user) => {
            // Update the state
            this.setState({user: user});

            // Update the cookie
            const { cookies } = this.props;
            cookies.set('user', this.state.user, { path: '/' });
        });
    }

    render() {
        return (
            <div className="App text-center">
                <Container className="container-fluid h-100 max-width">
                    <Row className="h-100">
                        <Col xs={10} className="h-100">
                            <Chat socket={this.socket} user={this.state.user}/>
                        </Col>
                        <Col xs={2} className="h-100">
                            <Users socket={this.socket}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withCookies(App);
