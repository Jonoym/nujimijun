function Logic() {
    logic = this;
    this.timerID = null;
    this.botLeftQueue = [];
    this.topLeftQueue = [];
    this.middleQueue = [];
    this.topRightQueue = [];
    this.botRightQueue = [];
}

Logic.prototype.setGame = function(track, bpm) {
    this.game = new Game(track, bpm);
}

Logic.prototype.getGame = function() {
    return this.game;
}

Logic.prototype.startGame = function() {
    this.gameStart = true;
    timerID = setInterval(logic.gameLoop, 60000/this.game.bpm);
}

Logic.prototype.getTrack = function() {
    return this.game.getTrack();
}

Logic.prototype.getFrame = function() {
    return this.game.track.shift();
}

Logic.prototype.pressPiece = function(position) {
    var d = new Date();
    var currentTime = d.getSeconds() * 1000 + d.getMilliseconds();
    let element;
    let timeDifference;
    let absoluteDifference;
    let queue;

    switch (position) {
        case 1:
            timeDifference = currentTime - logic.botLeftQueue[0][1] - 1850;
            queue = logic.botLeftQueue;
            element = "bottom-left";
            break;
        case 2:
            timeDifference = currentTime - logic.topLeftQueue[0][1] - 1850;
            queue = logic.topLeftQueue;
            element = "top-left";
            break;
        case 3:
            timeDifference = currentTime - logic.middleQueue[0][1] - 1850;
            queue = logic.middleQueue;
            element = "middle-left";
            break;
        case 4:
            timeDifference = currentTime - logic.topRightQueue[0][1] - 1850;
            queue = logic.topRightQueue;
            element = "top-right";
            break;
        case 5:
            timeDifference = currentTime - logic.botRightQueue[0][1] - 1850;
            queue = logic.botRightQueue;
            element = "bottom-right";
            break;
    }
    console.log(timeDifference);

    if (queue[0][2] != true) {
        absoluteDifference = Math.abs(timeDifference);
        if (absoluteDifference < 40) {
            console.log("PERFECT");
        } else if (absoluteDifference < 80) {
            console.log("GOOD");
        } else if (absoluteDifference < 120) {
            console.log("OKAY");
        } else {
            return;
        }
        queue[0][0].style.opacity = "0";
        queue[0][2] = true;
    }
}

Logic.prototype.gameLoop = function() {

    //Checks to see if the game track has finished.
    if (logic.game.track.length != 0) {
        let frame = logic.getFrame();
        let d = new Date();
        let n = d.getSeconds() * 1000 + d.getMilliseconds();

        let element;
        let queue;
        let currentTime;

        frame.positions.forEach(position => {

            let arrow = document.createElement("img");
            arrow.style.top = "150vh"
            arrow.classList.add("moving");

    
            if (position == 1) {
                arrow.src = "./assets/botleft.png"
                element = document.getElementById("bottom-left");
                queue = logic.botLeftQueue;

            } else if (position == 2) {
                arrow.src = "./assets/topleft.png"
                element = document.getElementById("top-left");
                queue = logic.topLeftQueue;

            } else if (position == 3) {
                arrow.src = "./assets/middle.png"
                element = document.getElementById("middle");
                queue = logic.middleQueue;

            } else if (position == 4) {
                arrow.src = "./assets/topright.png"
                element = document.getElementById("top-right");
                queue = logic.topRightQueue;

            } else if (position == 5) {
                arrow.src = "./assets/botright.png"
                element = document.getElementById("bottom-right");
                queue = logic.botRightQueue;
            }

            if (element != null) {
                const finalElement = element;
                const finalQueue = queue;
                finalElement.appendChild(arrow);
                finalQueue.push([arrow, n]);
    
                setTimeout(() => {
                    let date = new Date();
                    currentTime = date.getSeconds() * 1000 + date.getMilliseconds();
                    if (currentTime > n + 2000 && finalQueue[0][2] != true) {
                        console.log("MISS");
                    }
                    finalQueue.shift();
                    finalElement.removeChild(arrow);
                    arrow = undefined;
                    delete(arrow);
                }, 2120);
            }


            setTimeout(()=> {
                arrow.style.transform = 'translateY(-165vh)'
            }, 20);
        });
    } else {
        clearInterval(timerID);
    }
}

Logic.prototype.press = function() {

}

function Game(trackTitle, bpm) {
    this.track = []
    this.bpm = bpm;

    this.timeFrames = trackTitle.split("\n");
    this.timeFrames.forEach(frame => {
        let frameValues = frame.split(" ");
        let framePositions = frameValues[0].split(",");
        this.track.push(new TimeFrame(framePositions, frameValues[1]));
    })
}

Game.prototype.getTrack = function() {
    return this.track;
}


function TimeFrame(positions, hold) {
    this.positions = positions;
    this.hold = hold;
}

TimeFrame.prototype.getPositions = function() {
    return this.positions;
}

TimeFrame.prototype.getHold = function () {
    return this.hold;
}

var logic = new Logic();

logic.setGame(map1, 120);

logic.startGame();

/* Function called when a key is pressed. */
function handlePress(event) {
    if (event.keyCode === 97) {
        bottomLeftPress();
    }
    if (event.keyCode === 103) {
        topLeftPress();
    }
    if (event.keyCode === 101) {
        middlePress();
    }
    if (event.keyCode === 105) {
        topRightPress();
    }
    if (event.keyCode === 99) {
        bottomRightPress();
    }
}

/* Each of the individual functions depending on the position. */

function bottomLeftPress() {
    const bottomLeft = document.getElementById("glow-bottom-left");
    const bottomLeftWhite = document.getElementById("bottom-left white");

    logic.pressPiece(1);
    arrowFlash(bottomLeft, bottomLeftWhite, BOTTOM);
}

function topLeftPress() {
    const topLeft = document.getElementById("glow-top-left");
    const topLeftWhite = document.getElementById("top-left white");

    logic.pressPiece(2);
    arrowFlash(topLeft, topLeftWhite, TOP)
}

function middlePress() {
    const middle = document.getElementById("glow-middle");
    const middleWhite = document.getElementById("middle white");

    logic.pressPiece(3);
    arrowFlash(middle, middleWhite, MIDDLE)
}

function topRightPress() {
    const topRight = document.getElementById("glow-top-right");
    const topRightWhite = document.getElementById("top-right white");

    logic.pressPiece(4);
    arrowFlash(topRight, topRightWhite, TOP)
}

function bottomRightPress() {
    const bottomRight = document.getElementById("glow-bottom-right");
    const bottomRightWhite = document.getElementById("bottom-right white");

    logic.pressPiece(5);
    arrowFlash(bottomRight, bottomRightWhite, BOTTOM)
}

/* Flashes the arrow with a different colour. */

function arrowFlash(position, white, colour) {
    position.style.boxShadow = "0px 0px 100px " + colour;
    white.style.opacity = "1";
    const background = document.getElementById("wallpaper");
    background.style.opacity = "0.65";
    background.style.transform = "scale(1.01)";
}

/* Function called when a key is released. */

function handleRelease(event) {
    if (event.keyCode === 97) {
        bottomLeftRelease();
    }
    if (event.keyCode === 103) {
        topLeftRelease();
    }
    if (event.keyCode === 101) {
        middleRelease();
    }
    if (event.keyCode === 105) {
        topRightRelease();
    }
    if (event.keyCode === 99) {
        bottomRightRelease();
    }
}

/* Each of the individual functions depending on the position. */

function bottomLeftRelease() {
    const bottomLeft = document.getElementById("glow-bottom-left");
    const bottomLeftWhite = document.getElementById("bottom-left white");

    arrowRelease(bottomLeft, bottomLeftWhite, BOTTOM);
}

function topLeftRelease() {
    const topLeft = document.getElementById("glow-top-left");
    const topLeftWhite = document.getElementById("top-left white");

    arrowRelease(topLeft, topLeftWhite, TOP);
}

function middleRelease() {
    const middle = document.getElementById("glow-middle");
    const middleWhite = document.getElementById("middle white");

    arrowRelease(middle, middleWhite, MIDDLE);
}

function topRightRelease() {
    const topRight = document.getElementById("glow-top-right");
    const topRightWhite = document.getElementById("top-right white");

    arrowRelease(topRight, topRightWhite, TOP);
}

function bottomRightRelease() {
    const bottomRight = document.getElementById("glow-bottom-right");
    const bottomRightWhite = document.getElementById("bottom-right white");

    arrowRelease(bottomRight, bottomRightWhite, BOTTOM);
}

function arrowRelease(position, white, colour) {
    position.style.boxShadow = "none";
    white.style.opacity = "0";
    const background = document.getElementById("wallpaper");
    background.style.opacity = "0.6";
    background.style.transform = "scale(1)";
}