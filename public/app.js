const BOTTOM = "blue";
const TOP = "red";
const MIDDLE = "yellow";
const FLASH = "white";


class Controller {

    constructor(logic) {

        this.loadingScreen = true;
        this.logic = logic;

         /** Checks for the first time the button is pressed if it is held down */
        this.bottomLeft = false;
        this.topLeft = false;
        this.middle = false;
        this.topRight = false;
        this.bottomRight = false;

        /** Timers for each arrow position to simulate the hold without delays */
        this.botLeftTimer;
        this.topLeftTimer;
        this.middleTimer;
        this.topRightTimer;
        this.botRightTimer;

        /** Creates the key press event detection */
        document.addEventListener('keydown', this.handlePress.bind(this));
        document.addEventListener('keyup', this.handleRelease.bind(this));

        /** Instantiates the elements for the masks to hide the hold columns */
        this.bottomLeftMask = document.getElementById("mask-bottom-left");
        this.topLeftMask = document.getElementById("mask-top-left");
        this.middleMask = document.getElementById("mask-middle");
        this.topRightMask = document.getElementById("mask-top-right");
        this.bottomRightMask = document.getElementById("mask-bottom-right");

        /** Instantiates the elements for all the buttons to change screens */
        document.getElementById("start").addEventListener('click', this.logic.startGame.bind(this.logic));

        /** Chooses to start a single game, displays the song selection page */
        document.getElementById("single").addEventListener('click', this.logic.displaySelectSingle.bind(this.logic));

        /** Starts a singleplayer game */
        document.getElementById("single-start").addEventListener('click', this.logic.startSingle.bind(this.logic));
        document.getElementById("multi").addEventListener('click', this.logic.displayEnterName.bind(this.logic));
        document.getElementById("controls-button").addEventListener('click', this.logic.displayControls.bind(this.logic));

        document.getElementById("lobby-back").addEventListener('click', this.logic.displaySelect.bind(this.logic));
        document.getElementById("name-back").addEventListener('click', this.logic.displaySelect.bind(this.logic));
        document.getElementById("controls-back").addEventListener('click', this.logic.displayPrevious.bind(this.logic));
        document.getElementById("single-select-controls").addEventListener('click', this.logic.displayControls.bind(this.logic));

        document.getElementById("single-select-back").addEventListener('click', this.logic.displaySelect.bind(this.logic));
        document.getElementById("left-button-single").addEventListener('click', this.logic.prevSongLeft.bind(this.logic));
        document.getElementById("right-button-single").addEventListener('click', this.logic.nextSongRight.bind(this.logic));


        document.getElementById("next").addEventListener('click', this.logic.displayLobby.bind(this.logic));

        document.getElementById("single-stats-to-menu").addEventListener('click', this.logic.displaySelect.bind(this.logic));
        document.getElementById("single-stats-to-settings").addEventListener('click', this.logic.displayLobby.bind(this.logic));
        document.getElementById("single-stats-to-song-select").addEventListener('click', this.logic.displaySelectSingle.bind(this.logic));
        document.getElementById("single-stats-to-play-again").addEventListener('click', this.logic.startSingle.bind(this.logic));
    }

    /**
     * Handles the button press event depending on the button that has been pressed.
     * 
     * @param {*} event the key code of the key pressed
     */
    handlePress(event) {
        if (event.keyCode === 97 || event.keyCode === 78) {
            this.bottomLeftPress();
        }
        if (event.keyCode === 103 || event.keyCode === 85) {
            this.topLeftPress();
        }
        if (event.keyCode === 101 || event.keyCode === 74) {
            this.middlePress();
        }
        if (event.keyCode === 105 || event.keyCode === 73) {
            this.topRightPress();
        }
        if (event.keyCode === 99 || event.keyCode === 77) {
            this.bottomRightPress();
        }
        if (this.loadingScreen === true) {
            let loadingScreen = document.getElementById("loadscreen");
            loadingScreen.style.opacity = 0;
            setTimeout(() => {
                loadingScreen.remove();
            }, 1000);
            this.loadingScreen = false;
        }
    }

    /** Handles the press when the bottom left button has been pressed */
    bottomLeftPress() {
        const bottomLeft = document.getElementById("glow-bottom-left");
        const bottomLeftWhite = document.getElementById("bottom-left white");
        this.arrowFlash(bottomLeft, bottomLeftWhite, BOTTOM);
        this.bottomLeftMask.classList.remove("move-up")

        if (this.bottomLeft === false) {
            this.bottomLeft = true;
            this.logic.pressPiece(1, false);

            this.botLeftTimer = setInterval(() => {
                this.logic.pressPiece(1, true);
            }), 50;
        }
    }
    
    /** Handles the press when the top left button has been pressed */
    topLeftPress() {
        const topLeft = document.getElementById("glow-top-left");
        const topLeftWhite = document.getElementById("top-left white");
        this.arrowFlash(topLeft, topLeftWhite, TOP);
        this.topLeftMask.classList.remove("move-up")

        if (this.topLeft === false) {
            this.topLeft = true;
            this.logic.pressPiece(2, false);

            this.topLeftTimer = setInterval(() => {
                this.logic.pressPiece(2, true);
            }), 50;
        } 
    }
    
    /** Handles the press when the middle button has been pressed */
    middlePress() {
        const middle = document.getElementById("glow-middle");
        const middleWhite = document.getElementById("middle white");
        this.arrowFlash(middle, middleWhite, MIDDLE);
        this.middleMask.classList.remove("move-up")

        if (this.middle === false) {
            this.middle = true;
            this.logic.pressPiece(3, false);

            this.middleTimer = setInterval(() => {
                this.logic.pressPiece(3, true);
            }), 50;
        }
    }
    
    /** Handles the press when the top right button has been pressed */
    topRightPress() {
        const topRight = document.getElementById("glow-top-right");
        const topRightWhite = document.getElementById("top-right white");
        this.arrowFlash(topRight, topRightWhite, TOP);
        this.topRightMask.classList.remove("move-up")

        if (this.topRight === false) {
            this.topRight = true;
            this.logic.pressPiece(4, false);

            this.topRightTimer = setInterval(() => {
                this.logic.pressPiece(4, true);
            }), 50;
        } 
    }
    
    /** Handles the press when the bottom right button has been pressed */
    bottomRightPress() {
        const bottomRight = document.getElementById("glow-bottom-right");
        const bottomRightWhite = document.getElementById("bottom-right white");
        this.arrowFlash(bottomRight, bottomRightWhite, BOTTOM);
        this.bottomRightMask.classList.remove("move-up")

        if (this.bottomRight === false) {
            this.bottomLeft = true;
            this.logic.pressPiece(5, false);

            this.botRightTimer = setInterval(() => {
                this.logic.pressPiece(5, true);
            }), 50;
        }
    }

    /** Flashes the arrow at the posiiton white */
    arrowFlash(position, white, colour) {
        position.style.boxShadow = "0px 0px 100px " + colour;
        white.style.opacity = 1;
        white.style.zIndex = 999;
        const background = document.getElementById("wallpaper-image");
        background.style.opacity = 0.65;
        background.style.transform = "scale(1.01)";
    }

    /**
     * Handles the button release event depending on the button that has been released.
     * 
     * @param {*} event the key code of the key released
     */
    handleRelease(event) {
        if (event.keyCode === 97 || event.keyCode === 78) {
            this.bottomLeftRelease();
        }
        if (event.keyCode === 103 || event.keyCode === 85) {
            this.topLeftRelease();
        }
        if (event.keyCode === 101 || event.keyCode === 74) {
            this.middleRelease();
        }
        if (event.keyCode === 105 || event.keyCode === 73) {
            this.topRightRelease();
        }
        if (event.keyCode === 99 || event.keyCode === 77) {
            this.bottomRightRelease();
        }
    }

    /** Handles the release event when the bottom left button has been released */
    bottomLeftRelease() {
        clearInterval(this.botLeftTimer);
        this.bottomLeft = false;
        const bottomLeft = document.getElementById("glow-bottom-left");
        const bottomLeftWhite = document.getElementById("bottom-left white");
        this.bottomLeftMask.offsetWidth;
        this.bottomLeftMask.classList.add("move-up");
    
        this.arrowRelease(bottomLeft, bottomLeftWhite);
    }
    
    /** Handles the release event when the top left button has been released */
    topLeftRelease() {
        clearInterval(this.topLeftTimer);
        this.topLeft = false;
        const topLeft = document.getElementById("glow-top-left");
        const topLeftWhite = document.getElementById("top-left white");
        this.topLeftMask.offsetWidth;
        this.topLeftMask.classList.add("move-up");
    
        this.arrowRelease(topLeft, topLeftWhite);
    }
    
    /** Handles the release event when the middle button has been released */
    middleRelease() {
        clearInterval(this.middleTimer);
        this.middle = false;
        const middle = document.getElementById("glow-middle");
        const middleWhite = document.getElementById("middle white");
        this.middleMask.offsetWidth;
        this.middleMask.classList.add("move-up");
    
        this.arrowRelease(middle, middleWhite);
    }
    
    /** Handles the release event when the top right button has been released */
    topRightRelease() {
        clearInterval(this.topRightTimer);
        this.topRight = false;
        const topRight = document.getElementById("glow-top-right");
        const topRightWhite = document.getElementById("top-right white");
        this.topRightMask.offsetWidth;
        this.topRightMask.classList.add("move-up");
    
        this.arrowRelease(topRight, topRightWhite);
    }
    
    /** Handles the release event when the bottom right button has been released */
    bottomRightRelease() {
        clearInterval(this.botRightTimer);
        this.bottomLeft = false;
        const bottomRight = document.getElementById("glow-bottom-right");
        const bottomRightWhite = document.getElementById("bottom-right white");
        this.bottomRightMask.offsetWidth;
        this.bottomRightMask.classList.add("move-up");
    
        this.arrowRelease(bottomRight, bottomRightWhite);
    }
    
    /**
     * Handles the event when an arrow button has been released.
     * 
     * @param {*} position position of the arrow released 
     * @param {*} white element that has been changed
     */
    arrowRelease(position, white) {
        setTimeout(() => {
            white.style.opacity = 0;
        }, 100);
        position.style.boxShadow = "none";
        const background = document.getElementById("wallpaper");
        background.style.opacity = 0.6;
        background.style.transform = "scale(1)";
    }
}

/** Class to represent the logic that will manipulate the game and the interface */

class Logic {

    constructor() {

        /** Defines the gamemode to be singleplayer or multiplayer */
        this.gameMode = 0;

        /** The player number assigned to the player when joining a lobby */
        this.playerNum;

        /** Checks if the local player is ready */
        this.ready = false;

        /** The queue at each position for normal arrow pieces */
        this.socket;

        /** An array to represent which players are ready in the lobby */
        this.playersReady = [false, false, false, false];

        /** Function that is bound to the ready button in the lobby */
        this.callMultiReady;

        /** Timer to read the position values at each increment */
        this.timerID = null;

        /** Stores a track object of the track that will be played */
        this.track;

        /** Stores the bpm of the song track */
        this.bpm;

        /** Stores the delay between each piece */
        this.pieceDelay;
        
        /** Stores an object of the game for each song */
        this.game;
        
        /** Boolean to determine if the game has been started */
        this.gameStart = false;

        /** Boolean to determine if the game has ended */
        this.gameEnd = false;

        /** The queue at each position for normal arrow pieces */
        this.botLeftQueue = [];
        this.topLeftQueue = [];
        this.middleQueue = [];
        this.topRightQueue = [];
        this.botRightQueue = [];

        /** The queue at each position for old arrow pieces */
        this.botLeftHoldQueue = [];
        this.topLeftHoldQueue = [];
        this.middleHoldQueue = [];
        this.topRightHoldQueue = [];
        this.botRightHoldQueue = [];

        /** Stores the DOM elements which will be changed on presses */
        this.textBox = document.getElementById("pop-up");
        this.arrowText = document.getElementById("arrow-text");
        this.comboNumber = document.getElementById("combo-number");
        this.comboText = document.getElementById("combo-text");

        /** Singleplayer Cards */
        this.leftCardSingle = document.getElementById("left-card-single");
        this.middleCardSingle = document.getElementById("middle-card-single");
        this.rightCardSingle = document.getElementById("right-card-single");

        /** Element for the health mask. */
        this.healthMask = document.getElementById("health-mask");

        /** Sets previous page */
        this.previousPage = document.getElementById("menuscreen");

        /** Stores the players current score and combo */
        this.combo = 0;
        this.missCombo = 0;
        this.score = 0;
        this.health = 100;
        this.perfectCount = 0;
        this.goodCount = 0;
        this.okayCount = 0;
        this.missCount = 0;
        this.maxCombo = 0;

        /** Songs stored in String Format. */
        this.songList = [["Map 1", "1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n\n\n\n\n\n\n\n\n\n\n"],
                        ["Map 2", "1,2 0\n1,2 0\n 0\n4,5 0\n3,5 0\n1,5 0\n2,3 0\n3 0\n4 0\n5 0\n1,2 0\n2,3 0\n3 0\n4 0\n5,1 0\n1,5 0\n2,4 0\n3 0\n4,2 0\n5,1 0\n1,5 0\n2 0\n3 0\n4,2 0\n5 0\n1 0\n2 0\n3 0\n4 0\n5 0\n\n\n\n\n\n\n\n\n\n\n"],
                        ["Map 3", "1,2 0\n4,5  0\n1,2 0\n4,5  0\n1,2 0\n4,5  0\n1,2 0\n4,5  0\n1,2 0\n4,5  0\n1,2 0\n4,5  0\n1,2 0\n4,5  0\n1,2 0\n4,5  0\n1,2 0\n4,5  0\n1,2 0\n4,5  0\n\n\n\n\n\n\n\n\n\n\n\n\n"],
                        ["Map 4", "1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n1,2,3 0\n\n\n\n\n\n\n\n\n\n\n\n"]
                        ];
        this.currentSong = 0;
        this.updateCards();

    }

    /**
     * Sets the current track and BPM to the local player.
     * 
     * @param {*} track the song track
     * @param {*} bpm number of beats per minute
     */
    setGame(track, bpm) {
        this.track = track;
        this.bpm = bpm;
        this.pieceDelay = 60000/bpm;
        //Stores the object of the game as a data member of the logic object
        this.game = new Game(this.track, this.bpm);
    }

    /** Starts the game depending on if it is singleplayer or multiplayer */
    startGame() {
        if (this.gameMode === 1) {
            this.singleplayerGame();
        } else if (this.gameMode === 2) {
            this.multiplayerGame();
        }
    }

    /** Creates a new game with the track and bpm that is stroed in the logic */
    loadGame() {
        this.setGame(this.songList[this.currentSong][1], 240);
    }

    /** Selects the next song in the song list. */
    nextSongRight() { 
        this.currentSong = (this.currentSong + 1) % this.songList.length;

        this.rightCardSingle.style.transition = "all 0.2s ease";
        this.rightCardSingle.style.transform = "scale(1.2) translateX(0)";
        this.rightCardSingle.style.zIndex = 13;

        this.middleCardSingle.style.transition = "all 0.2s ease";
        this.middleCardSingle.style.transform = "scale(1) translateX(-15vw)";
        this.middleCardSingle.style.zIndex = 10;

        this.leftCardSingle.style.transition = "all 0.2s ease";
        this.leftCardSingle.style.transform = "translateX(15vw)";
        this.leftCardSingle.style.zIndex = 10; 

        setTimeout(() => {
            this.resetCards();
            this.updateCards();
        }, 200);
    }

    /** Selects the previous song in the song list. */
    prevSongLeft() {
        this.currentSong = (this.currentSong + this.songList.length - 1) % this.songList.length;

        this.leftCardSingle.style.transition = "all 0.2s ease";
        this.leftCardSingle.style.transform = "scale(1.2) translateX(0)";
        this.leftCardSingle.style.zIndex = 13;

        this.middleCardSingle.style.transition = "all 0.2s ease";
        this.middleCardSingle.style.transform = "scale(1) translateX(15vw)";
        this.middleCardSingle.style.zIndex = 10;

        this.rightCardSingle.style.transition = "all 0.2s ease";
        this.rightCardSingle.style.transform = "translateX(-15vw)";
        this.rightCardSingle.style.zIndex = 10;

        setTimeout(() => {
            this.resetCards();
            this.updateCards();
        }, 200);
    }
    
    resetCards() {
        this.leftCardSingle.style.transition = "all 0s ease";
        this.leftCardSingle.style.transform = "scale(1) translateX(-15vw)";
        this.leftCardSingle.style.zIndex = 10;

        this.middleCardSingle.style.transition = "all 0s ease";
        this.middleCardSingle.style.transform = "scale(1.2) translateX(0vw)";
        this.middleCardSingle.style.zIndex = 13;

        this.rightCardSingle.style.transition = "all 0s ease";
        this.rightCardSingle.style.transform = "scale(1) translateX(15vw)";
        this.rightCardSingle.style.zIndex = 10;
    }

    updateCards() {
        let current = this.currentSong;
        this.leftCardSingle.textContent = this.songList[(current + this.songList.length - 1) % this.songList.length][0];
        this.middleCardSingle.textContent = this.songList[current][0];
        this.rightCardSingle.textContent = this.songList[(current + 1) % this.songList.length][0];
    }

    /** Starts a singleplayer game */
    singleplayerGame() {
        this.gameStart = true;
        this.timerID = setInterval(this.gameLoop.bind(this), this.pieceDelay);
    }

    /** Starts a multiplayer game */
    multiplayerGame() {
        this.gameStart = true;
        this.timerID = setInterval(this.gameLoop.bind(this), this.pieceDelay);
    }

    /** Changes the gamemode stored to a singleplayer game */
    startSingle() {
        this.gameMode = 1;
        this.displayGame();
        this.clearMenu();
    }

    /** Resets the game stats */
    resetStats() {
        this.combo = 0;
        this.score = 0;
        this.perfectCount = 0;
        this.goodCount = 0;
        this.okayCount = 0;
        this.missCount = 0;
        this.maxCombo = 0;
        this.missCombo = 0;
        this.health = 100;
    }

    /** Displays the gameboard */
    displayGame() {
        this.clearAll();
        this.loadGame();
        this.resetStats();
        this.changeHealth();
        this.health = 100;
        let gameboard = document.getElementById("game");
        gameboard.style.opacity = 1;
        gameboard.style.zIndex = 998;
    }
    
    /** Displays the stat at the end of a game. */
    displayStats() {
        this.clearAll();
        let gameboard = document.getElementById("stats");
        gameboard.style.opacity = 1;
        gameboard.style.zIndex = 999;
        document.getElementById("score").textContent = this.score;
        document.getElementById("perfect").textContent = this.perfectCount;
        document.getElementById("good").textContent = this.goodCount;
        document.getElementById("okay").textContent = this.okayCount;
        document.getElementById("miss").textContent = this.missCount;
        document.getElementById("max-combo").textContent = this.maxCombo;
    }

    /** Displays the view of the lobby, if this is the first time connecting, a socket
     *  is instantiated, if not, then the number of the player is received.
     */
     displayLobby() {
        this.clearAll();
        let lobbyScreen = document.getElementById("lobby");
        lobbyScreen.style.opacity = 1;
        lobbyScreen.style.zIndex = 997;
    }

    /** Displays the stage where the player is to enter their name.
     *  The previous screen is sent to the back and the player number is reset to null.
     */
    displayEnterName() {
        this.clearAll();
        let enterName = document.getElementById("enter-name");
        enterName.style.opacity = 1;
        enterName.style.zIndex = 997;
        if (this.playerNum != undefined) {
            this.leaveLobby();
        }
        this.playerNum = null;
    }

    /** Displays the stage which shows the controls of the game.
     */
     displayControls() {
        this.clearAll();
        let controls = document.getElementById("controls");
        controls.style.opacity = 1;
        controls.style.zIndex = 997;
    }

    /** Displays the stage where the player is to select the type of gamemode they're playing */
    displaySelect() {
        this.clearAll();
        let menuScreen = document.getElementById("menuscreen");
        menuScreen.style.opacity = 1;
        menuScreen.style.zIndex = 997;
        this.previousPage = menuScreen;
    }

    /** Displays the stage where the player is to select the song they're playing */
    displaySelectSingle() {
        this.clearAll();
        let select = document.getElementById("song-select-single");
        select.style.opacity = 1;
        select.style.zIndex = 997;
        this.previousPage = select;
    }

    /** Displays the view of the lobby, if this is the first time connecting, a socket
     *  is instantiated, if not, then the number of the player is received.
     */
    displayLobby() {
        this.clearAll();
        let lobbyScreen = document.getElementById("lobby");
        lobbyScreen.style.opacity = 1;
        lobbyScreen.style.zIndex = 997;
    }

    /** Displays the stage where the player is to enter their name.
     *  The previous screen is sent to the back and the player number is reset to null.
     */
    displayEnterName() {
        this.clearAll();
        let enterName = document.getElementById("enter-name");
        enterName.style.opacity = 1;
        enterName.style.zIndex = 997;
        if (this.playerNum != undefined) {
            this.leaveLobby();
        }
        this.playerNum = null;
        this.previousPage = enterName;
    }

    /** Displays the page that was previously shown. */
    displayPrevious() {
        if (this.previousPage == document.getElementById("menuscreen")) {
            this.displaySelect();
        } else if (this.previousPage == document.getElementById("song-select-single")) {
            this.displaySelectSingle();
        }
    }

    /** Clears the game stats display. */
    clearStats() {
        let gameboard = document.getElementById("stats");
        gameboard.style.opacity = 0;
        gameboard.style.zIndex = 0;
    }

    /** Displays the gameboard */
    clearGame() {
        let gameboard = document.getElementById("game");
        gameboard.style.opacity = 0;
        gameboard.style.zIndex = 0;
    }

    /** Clears the menu by moving it to the back and changing the opacity to 0 */
    clearMenu() {
        let menuScreen = document.getElementById("menuscreen");
        menuScreen.style.opacity = 0;
        menuScreen.style.zIndex = 0;
    }

    /** Moves the lobby stage out of view and sends it to the back */
    clearLobby() {
        let lobbyScreen = document.getElementById("lobby");
        lobbyScreen.style.opacity = 0;
        lobbyScreen.style.zIndex = 0;
    }

    /** Moves the lobby stage out of view and sends it to the back */
    clearEnterName() {        
        let nameEnter = document.getElementById("enter-name");
        nameEnter.style.opacity = 0;
        nameEnter.style.zIndex = 0;
    }

    /** Moves the lobby stage out of view and sends it to the back */
    clearControls() {        
        let controls = document.getElementById("controls");
        controls.style.opacity = 0;
        controls.style.zIndex = 0;
    }

    /** Moves the select stage out of view and sends it to the back */
    clearSelectSingle() {        
        let select = document.getElementById("song-select-single");
        select.style.opacity = 0;
        select.style.zIndex = 0;
    }

    /** Clears all game screens. */
    clearAll() {
        this.clearGame();
        this.clearStats();
        this.clearEnterName();
        this.clearLobby();
        this.clearMenu();
        this.clearSelectSingle();
        this.clearControls();
    }

    /** Functions below are to handle the game functionality on the local side */

    /**
     * Returns the current track that is being stored.
     * 
     * @returns current track
     */
    getTrack() {
        return this.game.getTrack();
    }

    /**
     * Returns the current frame of the track.
     * 
     * @returns frame of the track
     */
    getFrame() {
        return this.game.getTrack().shift();
    }

    /**
     * Handles the game logic when a button has been pressed.
     * 
     * @param {*} position button position being pressed
     * @param {*} held if the button has been held down
     */
    pressPiece(position, held) {
        var date = new Date();
        var currentTime = date.getSeconds() * 1000 + date.getMilliseconds();
        let timeDifference;
        let queue;
        let holdQueue;

        switch (position) {
            case 1:
                if (this.botLeftQueue[0] != undefined) {
                    timeDifference = currentTime - this.botLeftQueue[0][1] - 1850;
                    queue = this.botLeftQueue;
                }
                if (this.botLeftHoldQueue[0] != undefined) {
                    timeDifference = currentTime - this.botLeftHoldQueue[0][1] - 1850;
                    holdQueue = this.botLeftHoldQueue;
                }
                break;
            case 2:
                if (this.topLeftQueue[0] != undefined) {
                    timeDifference = currentTime - this.topLeftQueue[0][1] - 1850;
                    queue = this.topLeftQueue;
                }
                if (this.topLeftHoldQueue[0] != undefined) {
                    timeDifference = currentTime - this.topLeftHoldQueue[0][1] - 1850;
                    holdQueue = this.topLeftHoldQueue;
                }
                break;
            case 3:
                if (this.middleQueue[0] != undefined) {
                    timeDifference = currentTime - this.middleQueue[0][1] - 1850;
                    queue = this.middleQueue;
                }
                if (this.middleHoldQueue[0] != undefined) {
                    timeDifference = currentTime - this.middleHoldQueue[0][1] - 1850;
                    holdQueue = this.middleHoldQueue;
                }
                break;
            case 4:
                if (this.topRightQueue[0] != undefined) {
                    timeDifference = currentTime - this.topRightQueue[0][1] - 1850;
                    queue = this.topRightQueue;
                }

                if (this.topRightHoldQueue[0] != undefined) {
                    timeDifference = currentTime - this.topRightHoldQueue[0][1] - 1850;
                    holdQueue = this.topRightHoldQueue;
                }
                break;
            case 5:
                if (this.botRightQueue[0] != undefined) {
                    timeDifference = currentTime - this.botRightQueue[0][1] - 1850;
                    queue = this.botRightQueue;
                }
                if (this.botRightHoldQueue[0] != undefined) {
                    timeDifference = currentTime - this.botHoldRightQueue[0][1] - 1850;
                    holdQueue = this.botRightHoldQueue;
                }
                break;
        }
        
    
        if (queue != undefined && queue[0][2] != true && held == false) {
            if (timeDifference < -50000) {
                timeDifference += 60000;
            }

            let displayText;
            let colour;
            let absoluteDifference = Math.abs(timeDifference);
            if (absoluteDifference < 50) {
                displayText = "PERFECT";
                this.perfectCount++;
                colour = "#aaaaff"
            } else if (absoluteDifference < 90) {
                displayText = "GOOD";
                this.goodCount++;
                colour = "#40e0d0";
            } else if (absoluteDifference < 120) {
                displayText = "OKAY";
                this.okayCount++;
                colour = "#ffb347";
            } else {
                return;
            }
            
            this.combo++;
            this.missCombo = 0;
            if (this.combo > this.maxCombo) {
                this.maxCombo = this.combo;
            }
            this.changeText(displayText, this.combo, colour);
            this.addScore(displayText);
            this.changeHealth(displayText);
            this.changeSideBar(this.playerNum, this.score, this.combo);
            queue[0][0].style.opacity = 0;
            queue[0][2] = true;
        }

        if (holdQueue != undefined && holdQueue[0][4] != true) {
            if (timeDifference > -10 && timeDifference < 40) {
                this.combo++;
                this.missCombo = 0;
                if (this.combo > this.maxCombo) {
                    this.maxCombo = this.combo;
                }
                this.perfectCount++;
                this.changeText("PERFECT", this.combo, "#aaaaff");
                this.addScore("PERFECT");
                this.changeHealth("PERFECT");
                this.changeSideBar(this.playerNum, this.score, this.combo);
                holdQueue[0][0].style.opacity = 0;
                holdQueue[0][4] = true;
            }
        }
    }

    /** The function that will be loooped repeatedly until the game has stopped.
     *  The method will repeatedly add arrows to the tracklist array at the bpm specified.
    */
    gameLoop() {
        if (this.game.getTrack().length != 0 && this.gameEnd == false) {
            let frame = this.getFrame();
            if (frame.getHold() == 0) {
                let positions = frame.getPositions();
                positions.forEach(position => {
                    this.makeArrow(position);
                });
            } else {
                frame.positions.forEach(position => {
                    this.makeHoldArrow(position, frame.getHold());
                });
            }
        } else {
            clearInterval(this.timerID);
            this.gameStart = false;
            this.displayStats();
            this.clearGame();
        }
    }

    /**
     * Adds to the score depending on the timing.
     * 
     * @param {*} text that is to be displayed
     */
    addScore(text) {
        let multiplier = this.combo/100 + 1;
        if (text == "PERFECT") {
            this.score += 1000 * multiplier;
        } else if (text == "GOOD") {
            this.score += 700 * multiplier;
        } else if (text == "OKAY") {
            this.score += 300 * multiplier;
        }
    }

    /**
     * Changes the text displayed on the board for each arrow
     * 
     * @param {*} text to be displayed
     * @param {*} combo hits in a row
     * @param {*} colour colour of the display text
     */
    changeText(text, combo, colour) {
        if (combo > 3) {
            this.comboNumber.style.opacity = 1;
            this.comboText.style.opacity = 1;
        } else {
            this.comboNumber.style.opacity = 0;
            this.comboText.style.opacity = 0;
        }
        this.arrowText.style.color = colour;
        this.arrowText.textContent = text;
        this.comboNumber.textContent = combo;
        this.textBox.classList.remove("appear");
        this.textBox.offsetWidth;
        this.textBox.classList.add("appear");
    }

    changeHealth(text) {
        let scale = this.combo / 50 + 1;
        let missScale = this.missCombo / 3 + 1;
        if (text == "MISS") {
            this.calculateHealth(-5 * missScale);
        } else if (text == "PERFECT") {
            this.calculateHealth(2 * scale);
        } else if (text == "GOOD") {
            this.calculateHealth(1 * scale);
        } else if (text == "OKAY") {
            this.calculateHealth(0.5 * scale);
        }
        let ratio = 100/103;
        let transform = this.health * ratio + 3;
        this.healthMask.style.transform = `translateX(${transform}%)`;
    }

    calculateHealth(difference) {
        if (difference + this.health > 100) {
            this.health = 100;
        } else if (difference + this.health < 0) {
            this.health = 0;
        } else {
            this.health += difference;
        }
    }

    changeSideBar(number, score, combo) {
        if (this.gameMode == 2) {
            let player = `p${number + 1}`;
            document.getElementById(player + "-combo").textContent = "x" + combo;
            document.getElementById(player + "-score").textContent = score;
        }
    }

    makeArrow(position) {
        let date = new Date();
        let arrowTime = date.getSeconds() * 1000 + date.getMilliseconds();
        let element;
        let queue;
        let currentTime;

        let arrow = document.createElement("img");
        arrow.style.top = "150vh"
        arrow.classList.add("moving");

        if (position == 1) {
            arrow.src = "./assets/botleft.png"
            element = document.getElementById("bottom-left");
            queue = this.botLeftQueue;

        } else if (position == 2) {
            arrow.src = "./assets/topleft.png"
            element = document.getElementById("top-left");
            queue = this.topLeftQueue;

        } else if (position == 3) {
            arrow.src = "./assets/middle.png"
            element = document.getElementById("middle");
            queue = this.middleQueue;

        } else if (position == 4) {
            arrow.src = "./assets/topright.png"
            element = document.getElementById("top-right");
            queue = this.topRightQueue;
            
        } else if (position == 5) {
            arrow.src = "./assets/botright.png"
            element = document.getElementById("bottom-right");
            queue = this.botRightQueue;
        }
        
        if (element != null && queue != null) {
            element.appendChild(arrow);
            queue.push([arrow, arrowTime]);

            setTimeout(() => {
                let date = new Date();
                currentTime = date.getSeconds() * 1000 + date.getMilliseconds();
                if (currentTime > arrowTime + 2000 && queue[0][2] != true) {
                    this.combo = 0;
                    this.missCombo++;
                    this.changeText("MISS", this.combo, "#ff6961");
                    this.missCount++;
                    this.addScore("MISS");
                    this.changeHealth("MISS");
                    //this.changeSideBar(this.playerNum, this.score, this.combo);
                }
                queue.shift();
                element.removeChild(arrow);
                arrow.remove();
            }, 2100);
        }
        setTimeout(()=> {
            arrow.style.transform = "translateY(-330vh)"
        }, 20);
    }

    makeHoldArrow(position, holdLength) {
        let date = new Date();
        let arrowTime = date.getSeconds() * 1000 + date.getMilliseconds();
        let element;
        let queue;
        let currentTime;

        let arrowStart = document.createElement("img");
        let arrowHold = document.createElement("img");
        let arrowEnd = document.createElement("img");

        arrowStart.style.top = "150vh"
        arrowStart.classList.add("moving");
        arrowStart.style.zIndex = "999";

        arrowHold.style.top = "150vh";
        arrowHold.classList.add("moving");
        arrowHold.style.width = "60px";
        arrowHold.style.zIndex = "950";

        arrowEnd.style.top = "150vh"
        arrowEnd.classList.add("moving");
        arrowEnd.style.zIndex = "999";

        if (position == 1) {
            arrowStart.src = "./assets/botleft.png"
            arrowHold.src = "./assets/bot hold.png"
            arrowEnd.src = "./assets/botleft.png"
            element = document.getElementById("bottom-left");
            queue = this.botLeftHoldQueue;

        } else if (position == 2) {
            arrowStart.src = "./assets/topleft.png"
            arrowHold.src = "./assets/top hold.png"
            arrowEnd.src = "./assets/topleft.png"
            element = document.getElementById("top-left");
            queue = this.topLeftHoldQueue;

        } else if (position == 3) {
            arrowStart.src = "./assets/middle.png"
            arrowHold.src = "./assets/middle hold.png"
            arrowEnd.src = "./assets/middle.png"
            element = document.getElementById("middle");
            queue = this.middleHoldQueue;

        } else if (position == 4) {
            arrowStart.src = "./assets/topright.png"
            arrowHold.src = "./assets/top hold.png"
            arrowEnd.src = "./assets/topright.png"
            element = document.getElementById("top-right");
            queue = this.topRightHoldQueue;
            
        } else if (position == 5) {
            arrowStart.src = "./assets/botright.png"
            arrowHold.src = "./assets/bot hold.png"
            arrowEnd.src = "./assets/botright.png"
            element = document.getElementById("bottom-right");
            queue = this.botRightHoldQueue;
        }
        let arrowHoldHeight;
        if (holdLength < 6) {
            arrowHoldHeight = holdLength * 150 + 6 * holdLength * holdLength;
        } else {
            arrowHoldHeight = holdLength * 147 + 5 * holdLength * holdLength;
        }


        arrowHold.style.height = arrowHoldHeight + "px";

        if (element != null && queue != null) {
            element.appendChild(arrowStart);
            element.appendChild(arrowHold);
            element.appendChild(arrowEnd);

            queue.push([arrowStart, arrowTime]);

            setTimeout(() => {
                let date = new Date();
                currentTime = date.getSeconds() * 1000 + date.getMilliseconds();
                if (currentTime > arrowTime + 2000 && queue[0][4] != true) {
                    this.combo = 0;
                    this.missCombo++;
                    this.changeText("MISS", this.combo, "#ff6961");
                    this.changeHealth("MISS");
                    //this.changeSideBar(this.playerNum, this.score, this.combo);
                }
                queue.shift();
                element.removeChild(arrowStart);
                arrowStart = undefined;
            }, 2000);

            for (let i = 1; i < holdLength; i++) {
                let hold = document.createElement("img");
                hold.style.top = arrowHold.style.top;
                hold.classList.add("moving");
                queue.push([hold, arrowTime + this.pieceDelay * i, arrowHold, holdLength - i]);

                setTimeout(() => {
                    let date = new Date();
                    currentTime = date.getSeconds() * 1000 + date.getMilliseconds();
                    if (currentTime > arrowTime + this.pieceDelay * i + 2000 && queue[0][4] != true) {
                        this.combo = 0;
                        this.missCombo++;
                        this.changeText("MISS", this.combo, "#ff6961");
                        this.changeHealth("MISS");
                        //this.changeSideBar(this.playerNum, this.score, this.combo);
                    }
                    queue.shift();
                    hold = undefined;
                }, 2000 + this.pieceDelay * i);
            }

            queue.push([arrowEnd, arrowTime + this.pieceDelay * holdLength]);

            setTimeout(() => {
                let date = new Date();
                currentTime = date.getSeconds() * 1000 + date.getMilliseconds();
                if (currentTime > arrowTime + this.pieceDelay * holdLength + 2000 && queue[0][4] != true) {
                    this.combo = 0;
                    this.missCombo++;
                    this.changeText("MISS", this.combo, "#ff6961");
                    this.changeHealth("MISS");
                    //this.changeSideBar(this.playerNum, this.score, this.combo);

                }
                queue.shift();
                element.removeChild(arrowHold);
                element.removeChild(arrowEnd);
                arrowEnd = undefined;
            }, 2000 + this.pieceDelay * holdLength);
        }

        setTimeout(()=> {
            arrowStart.style.transform = "translateY(-330vh)"
        }, 20);

        setTimeout(()=> {
            arrowHold.style.transform = "translateY(-330vh)"
        }, 120);

        setTimeout(()=> {
            arrowEnd.style.transform = "translateY(-330vh)"
        }, 20 + this.pieceDelay * holdLength);
    }
}

class Game {
    constructor(trackTitle, bpm) {
        this.track = [];
        this.bpm = bpm;

        this.timeFrames = trackTitle.split("\n");
        this.timeFrames.forEach(frame => {
            let frameValues = frame.split(" ");
            let framePositions = frameValues[0].split(",");
            this.track.push(new TimeFrame(framePositions, frameValues[1]));
        })
    }

    getTrack() {
        return this.track;
    }
}

class TimeFrame {
    constructor(positions, hold) {
        this.positions = positions;
        this.hold = hold;
    }

    getPositions() {
        return this.positions;
    }

    getHold() {
        return this.hold;
    }
}

const logic = new Logic();
const controller = new Controller(logic);