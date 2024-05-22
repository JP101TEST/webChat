//ส่วน User
const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);
const io = new Server(server);
const changePage = require('./module/router/changePage');

// Use for module post want to get data from req.body
app.use(express.json());

// Serve the Socket.IO client library explicitly
app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist', 'socket.io.js'));
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes from login module
app.use('/', changePage);

let usersIdIsConnection = [];

io.on('connection', (socket) => {
    //console.log('a user connected ');

    socket.on('getUserIdConnect', (userIdConnect) => {
        // Update the user's socket ID if they reconnect
        usersIdIsConnection.push({ userIdConnect: userIdConnect, socketId: socket.id });
        //console.log("usersIdIsConnection:", usersIdIsConnection);
        io.emit('sendAllUserIdConnectToUsers', usersIdIsConnection);
    });

    socket.on('disconnect', () => {
        // Find the disconnected user's ID
        const disconnectedUser = usersIdIsConnection.find(user => user.socketId === socket.id);

        if (disconnectedUser) {
            // Remove the disconnected user from the list
            usersIdIsConnection = usersIdIsConnection.filter(user => user.socketId !== socket.id);

            //console.log('user disconnected');
            //console.log("userId disconnected:", disconnectedUser.userId);
            //console.log("Updated users:", users);

            //console.log("Who disconnect", disconnectedUser);
            io.emit('sendUserIdDisconnectToUsers', disconnectedUser.userIdConnect);


        }
    });

    socket.on('blockThisUser', (userHashBlock) => {
        //console.log("userHashBlock:",userHashBlock);
        io.emit('sendUserDataWhoHashBlockToUsers', userHashBlock);
    });

    socket.on('unblockThisUser', (userHashUnblock) => {
        //console.log("unblockThisUser:",userHashUnblock);
        io.emit('sendUserDataWhoHashUnblockToUsers', userHashUnblock);
    });

    socket.on('sendMessage',(message)=>{
        io.emit('sendNewDataMessageToUsers', message)
    })
});

server.listen(8080, () => {
    console.log("Server started at port 8080. Run in http://localhost:8080/");
});

