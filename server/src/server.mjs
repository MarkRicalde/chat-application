/**
 * Name: Mark Danez Ricalde
 * UCID: 10171889
 * Tutorial section: B02
 */
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import moment from "moment";
import { commandHandler, isUsernameUnique } from "./serverUtils.mjs";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use('/', (req, res) => {
    res.send("<p>This is the Server Page</p>");
});

server.listen(8000, () => {
    console.log('Server listening on http://localhost:8000/');
});

const chatHistory = [];
const onlineUsers = [];

let countUser = 0;

const serverUser = {
    name: "Server",
    color: "000000",
};

io.on('connection', (socket) => {
    let user = undefined;

    socket.on('cookie user', (cookieUser) => {
        const cookieUsername = cookieUser.name;

        if (cookieUsername === 'Offline' || !isUsernameUnique(cookieUsername, onlineUsers)) {
            do {
                user = {
                    name: `User${countUser}`,
                    color: `${Math.floor(Math.random() * 16777215).toString(16)}`,
                };
                countUser++;
            } while (!isUsernameUnique(user.name, onlineUsers));
        } else {
            user = cookieUser;
        }
        onlineUsers.push(user);
        socket.emit('user', user);
        socket.emit('chat history', chatHistory);
        io.emit('online users', onlineUsers);
        console.log('user connected: ' + JSON.stringify(user));
    });

    // Handle chat messages
    socket.on('chat message', (msg) => {
        // Calculate message timestamp
        msg.timestamp = moment().unix();
        chatHistory.push(msg);
        io.emit('chat message', msg);
    });

    // Handle commands
    socket.on('chat command', (cmd) => {
        const serverReply = {
            user: serverUser,
            text: "Command completed successfully",
            timestamp: moment().unix(),
        };

        // Validate and handle the command
        try {
            commandHandler(cmd, user, onlineUsers);
            io.emit('online users', onlineUsers);
            socket.emit('user', user);
        } catch (err) {
            serverReply.text = `Error: ${err}`;
        } finally {
            socket.emit('chat command', serverReply);
        }
    });

    // Handle disconnects
    socket.on('disconnect', () => {
        const userIndex = onlineUsers.indexOf(user);
        if (userIndex > -1) {
            onlineUsers.splice(userIndex, 1);
        }
        io.emit('online users', onlineUsers);
    });
});
