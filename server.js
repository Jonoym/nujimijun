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
const names = [null, null, null, null];
io.on("connection", socket => {

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

    for(const i in connections) {
        if (connections[i] != null && i != playerIndex) {
            socket.emit("playerName", i, names[i]);
            socket.emit("playerConnection", i);
        }
        if (connections[i] == true) {
            socket.emit("enemyReady", i);
        }
    }

    socket.on("getNumber", () => {
        console.log("here2");
        let playerIndex = -1;
        for (const i in connections) {
            if (connections[i] === null) {
                playerIndex = i;
                break;
            }
        }
        console.log(playerIndex);
        socket.emit("playerNumber", playerIndex);
    })

    socket.broadcast.emit("playerConnection", playerIndex);

    //Handling player disconnects
    socket.on("disconnect", () => {
        console.log(`Player ${playerIndex} disconnected.`);
        connections[playerIndex] = null;
        names[playerIndex] = null;
        socket.broadcast.emit("playerDisconnect", playerIndex)
    })

    socket.on("leaveLobby", (playerNum) => {
        console.log(`Player ${playerNum} disconnected.`);
        connections[playerNum] = null;
        names[playerNum] = null;
        socket.broadcast.emit("playerDisconnect", playerNum);
    })

    //Handling Player Names
    socket.on("playerName", (number, name) => {
        names[number] = name;
        socket.broadcast.emit("playerName", number, name);
        socket.broadcast.emit("playerConnection", number);
    });

    //Ready
    socket.on("playerReady", () => {
        socket.broadcast.emit("enemyReady", playerIndex);
        connections[playerIndex] = true;
    })

    socket.on("playerUnready", () => {
        socket.broadcast.emit("enemyUnready", playerIndex);
        connections[playerIndex] = false;
    })

});