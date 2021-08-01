const express = require("express");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 4000;
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Start Server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//Handle a socket connection request from web client
const connections = [null, null, null, null];
io.on("connection", socket => {
    //console.log("New WS Connection");

    //Finding an available player number
    let playerIndex = -1;
    for (const i in connections) {
        if (connections[i] === null) {
            playerIndex = i;
            break;
        }
    }
    socket.emit('playerNumber', playerIndex);
    console.log(`Player ${playerIndex} has connected.`);

    if (playerIndex === -1) {
        return;
    } else {
        connections[playerIndex] = false;
    }
    socket.broadcast.emit("playerConnection", playerIndex);

    //Handling player disconnects
    socket.on("disconnect", () => {
        console.log(`PLayer ${playerIndex} disconnected.`);
        connections[playerIndex] = null;
    })
    socket.broadcast.emit("playerConnection", playerIndex)
});