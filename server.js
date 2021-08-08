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

    /**
     * Looks for a position in the lobby.
     */
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

    /** 
     * Broadcasts to other players that a player has connected
     * and the name that they are using.
     */
    socket.on("playerName", (number, name) => {
        names[number] = name;
        socket.broadcast.emit("playerName", number, name);
        socket.broadcast.emit("playerConnection", number);
    });

    /** 
     * When a player has already instantiated a connection,
     * this is used to get a new player number.
     */
    socket.on("getNumber", (name) => {
        console.log("here");
        let playerIndex = -1;
        for (const i in connections) {
            if (connections[i] === null) {
                playerIndex = i;
                connections[i] = false;
                names[i] = name;
                console.log(playerIndex);
                break;
            }
        }
        console.log(names);
        console.log(connections);
        socket.emit("playerNumber", playerIndex);
    })

    /**
     * When a player has connected, it will set the lobby array
     * to their default values.
     */
    socket.on("disconnect", () => {
        console.log(`Player ${playerIndex} disconnected.`);
        connections[playerIndex] = null;
        names[playerIndex] = null;
        socket.broadcast.emit("playerDisconnect", playerIndex)
    })

    /**
     * When a player has left the lobby, it will take it 
     * as a disconnect.
     */
    socket.on("leaveLobby", (playerNum) => {
        console.log(`Player ${playerNum} disconnected.`);
        connections[playerNum] = null;
        names[playerNum] = null;
        socket.broadcast.emit("playerDisconnect", playerNum);
    })

    /**
     * When a player has connected, it will check if all of the
     * players in the lobby are ready, if they are the game will start.
     */
    socket.on("playerReady", (number) => {
        socket.broadcast.emit("enemyReady", number);
        connections[number] = true;
        let startGame = true;
        let numReady = 0;
        for (const i in connections) {
            if (names[i] != null && connections[i] == false) {
                startGame = false;
            }
            if (names[i] != null) {
                numReady++;
            }
        }
        console.log(connections);
        console.log(names);
        if (startGame/** && numReady > 1*/) {
            console.log("START");
            socket.broadcast.emit("startGame");
            socket.emit("startGame");
        }
    })

    /**
     * When a player has unreadied, it will set their ready status
     * to false and notify the other players that they are no longer ready.
     */
    socket.on("playerUnready", (number) => {
       socket.broadcast.emit("enemyUnready", number);
       connections[number] = false;
       console.log(connections);
       console.log(names);
    });
});