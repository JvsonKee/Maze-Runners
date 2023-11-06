class Timer {
    constructor() {
        this.isRunning = false;
        this.startTime = 0;
        this.overallTime = 0;
    }

    _getTimeElapsedSinceLastStart () {
        if (!this.startTime) {
          return 0;
        }
      
        return Date.now() - this.startTime;
      }

    start() {
        if (this.isRunning) {
            return console.error("Timer is already running");
        }
        this.isRunning = true;
        this.startTime = Date.now();
    }

    stop() {
        if (!this.isRunning) {
            return console.error("Timer is already stopped");
        }
        this.isRunning = false;
        this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    reset() {
        this.overallTime = 0;

        if (this.isRunning) {
          this.startTime = Date.now();
          return;
        }
    
        this.startTime = 0;
    }

    getTime () {
        if (!this.startTime) {
          return 0;
        }
    
        if (this.isRunning) {
          return this.overallTime + this._getTimeElapsedSinceLastStart();
        }
    
        return this.overallTime;
      }
}

function GameState() {
    this.isRunning = false;
}

function Player(name, id,  xCoordinate, yCoordinate) {
    this.name = name;
    this.id = id;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.isDone = false;
    this.specialItems = [0,0];
    this.runTime = 0;
    this.finalTime = 0; 
    this.scoreHistory = [];

    this.right = function() {
        if (isValidMove(this.xCoordinate, this.yCoordinate + 1)) {
            let prevTile = getTile(this.xCoordinate, this.yCoordinate);
            let newTile = getTile(this.xCoordinate, this.yCoordinate + 1);
            if (!this.isDone) {
                if (isFinished(this.xCoordinate, this.yCoordinate + 1)) {
                    this.runTime = (timer.getTime() / 1000).toFixed(1);
                    this.isDone = true;
                    this.calculateScore();
                    updatePlayerTimeOnScoreboard(this.finalTime, this.id);
                    if (shouldEndGame()) {
                        timer.stop();
                        state.isRunning = false;
                        displayWinner();
                    }
                    this.calculateScore();
                    maze[this.xCoordinate][this.yCoordinate] = 0;
                    maze[this.xCoordinate][this.yCoordinate + 1] = 6;
    
                } else {
                    if (isSpecialItemTile(this.xCoordinate, this.yCoordinate + 1)) {
                        this.pickupItem(this.xCoordinate, this.yCoordinate + 1);
                    }
                    maze[this.xCoordinate][this.yCoordinate] = 0;
                    maze[this.xCoordinate][this.yCoordinate + 1] = id;
                }
                this.yCoordinate++;
                updateTileAfterMove(newTile, prevTile, id);
            }
        }
    }

    this.left = function() {
        if (!this.isDone) {
            if (isValidMove(this.xCoordinate, this.yCoordinate - 1)) {
                if (isSpecialItemTile(this.xCoordinate, this.yCoordinate - 1)) {
                    this.pickupItem(this.xCoordinate, this.yCoordinate - 1);
                }
                maze[this.xCoordinate][this.yCoordinate] = 0;
                maze[this.xCoordinate][this.yCoordinate - 1] = id;
                let prevTile = getTile(this.xCoordinate, this.yCoordinate);
                let newTile = getTile(this.xCoordinate, this.yCoordinate - 1);
                this.yCoordinate--;
                updateTileAfterMove(newTile, prevTile, id);
            }
        }
    }

    this.up = function() {
        if (!this.isDone) {
            if (isValidMove(this.xCoordinate - 1, this.yCoordinate)) {
                if (isSpecialItemTile(this.xCoordinate - 1, this.yCoordinate)) {
                    this.pickupItem(this.xCoordinate - 1, this.yCoordinate);
                }
                maze[this.xCoordinate][this.yCoordinate] = 0;
                maze[this.xCoordinate - 1][this.yCoordinate] = id;
                let prevTile = getTile(this.xCoordinate, this.yCoordinate);
                let newTile = getTile(this.xCoordinate - 1, this.yCoordinate);
                this.xCoordinate--;
                updateTileAfterMove(newTile, prevTile, id);
            }
        }
    }

    this.down = function() {
        if (!this.isDone) {
            if (isValidMove(this.xCoordinate + 1, this.yCoordinate)) {
                if (isSpecialItemTile(this.xCoordinate + 1, this.yCoordinate)) {
                    this.pickupItem(this.xCoordinate + 1, this.yCoordinate);
                }
                maze[this.xCoordinate][this.yCoordinate] = 0;
                maze[this.xCoordinate + 1][this.yCoordinate] = id;
                let prevTile = getTile(this.xCoordinate, this.yCoordinate);
                let newTile = getTile(this.xCoordinate + 1, this.yCoordinate);
                this.xCoordinate++;
                updateTileAfterMove(newTile, prevTile, id);
            }
        }
    }

    this.pickupItem = function(x, y) {
        if (maze[x][y] === 4) {
            this.specialItems[0]++;
            updateItemCount(id, this.specialItems, 4);
        } else if (maze[x][y] === 5) {
            this.specialItems[1]++;
            updateItemCount(id, this.specialItems, 5);
        }
    }

    this.calculateScore = function() {
        let playerOneTimeReduction = this.convertBerryCountToTime();
        let score = (this.runTime - playerOneTimeReduction).toFixed(1);
        
        this.scoreHistory.push(score);
        this.finalTime = score;
    }   

    this.convertBerryCountToTime = function() {
        let berryTime = 0;
        berryTime += this.specialItems[0];
        berryTime += this.specialItems[1] * 3;
        return berryTime;
    }

    this.reset = function(startX, startY) {
        this.finalTime = 0;
        this.runTime = 0;
        this.xCoordinate = startX; 
        this.yCoordinate = startY;
        this.isDone = false;
        this.specialItems = [0,0];
    }
}

const p1 = new Player("name", 2, 6, 0);
const p2 = new Player("name", 3, 10, 0);
const state = new GameState();
const timer = new Timer();

document.addEventListener('keydown', (e) => {
    if (e.key == " " && !state.isRunning) {
        resetGame();
        startGame();
        p1.isRunning = true;
        p2.isRunning = true;
    }
})

let tan = "#c4a886";
let green = "#619259";
let blue = "#67d9ff";
let gold = "#ffd630";

function createMaze() {
    const maze = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,4,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,4,1,0,0,0,0,0,0,0,0,4,1],
        [1,0,1,1,0,0,0,0,0,0,0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1],
        [1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,1,0,0,0,0,1],
        [1,0,0,1,1,0,0,1,4,1,1,5,0,0,0,1,1,0,1,1,1,1,0,1,0,1,1,1,1],
        [1,1,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,0,0,0,0,1,0,1,0,1,1,1,1],
        [2,0,0,1,4,1,0,1,1,1,1,0,0,0,0,4,1,1,0,1,0,0,0,1,0,1,1,1,1],
        [1,0,1,1,0,1,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1],
        [1,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1,0,0,0,1,1,1],
        [1,1,0,1,1,1,1,1,1,1,0,0,1,1,1,0,0,0,0,1,1,5,1,0,1,0,0,0,6],
        [3,0,0,1,0,0,0,1,5,0,0,1,1,1,1,0,1,1,0,1,1,0,1,0,1,1,1,1,1],
        [1,0,1,1,0,1,0,1,1,1,0,1,1,0,0,0,4,1,0,1,1,0,1,0,1,0,0,0,1],
        [1,0,1,1,0,1,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1],
        [1,0,1,1,0,1,0,1,0,1,1,4,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
        [1,4,0,0,0,1,0,1,0,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
        [1,1,1,1,1,1,0,0,0,0,0,4,0,0,1,0,0,5,1,1,1,0,0,0,0,0,0,4,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];
    return maze;
}

maze = createMaze();

loadMaze();

function loadMaze() {
    gameboard.style.display = "grid";
    gameboard.style.gridTemplateColumns = `repeat(${maze.length}, 1fr)`;
    gameboard.style.gridTemplateColumns = `repeat(${maze[0].length}, 1fr)`;

    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            const div = document.createElement('div');
            gameboard.append(div);
            switch (maze[i][j]) {
                case 0: 
                    div.classList.add('path');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    break;
                case 1:
                    div.classList.add('wall');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    break;
                case 2:
                    div.classList.add('player');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    break;
                case 3: 
                    div.classList.add('player2');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    div.style.backgroundColor = "red";
                    break;
                case 4: 
                    div.classList.add('special-item-container');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    let berryImg = document.createElement('img');
                    berryImg.src = "../../images/berry.png";
                    div.append(berryImg);
                    break;
                case 5:
                    div.classList.add('special-item-container');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    let goldBerryImg = document.createElement('img');
                    goldBerryImg.src = "../../images/golden-berry.png";
                    div.append(goldBerryImg);
                    break;
                case 6: 
                    div.classList.add('finish');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    break;
                default:
                    break;
            }
        } 
    }
}
move();
/**
 * function for player movement
 * need to implement up, down, left and right movement for the player
 */
function move() {
    document.addEventListener('keydown', (e) => {
        if (state.isRunning) {
            switch (e.key) {
                case "ArrowRight":
                    p1.right();
                    break;
                case "ArrowLeft":
                    p1.left();
                    break;
                case "ArrowUp":
                    p1.up();
                    break;
                case "ArrowDown":
                    p1.down();
                    break;
                case "d":
                    p2.right();
                    break;
                case "a":
                    p2.left();
                    break;
                case "w":
                    p2.up();
                    break;
                case "s":
                    p2.down();
                    break;
                default:
                    break;
            }
        }
    })
}

function getTile(x, y) {
    let tile = document.querySelector(`[data-x-coordinate="${x}"][data-y-coordinate="${y}"]`);
    return tile;
}

/**
 * function to update the tile the player is currently on/passed over 
 * will need to change tile appearance when play passes over the tile
 */
function updateTileAfterMove(newTile, prevTile, id) {
    if (newTile.className == "finish") {
        newTile.style.backgroundColor = gold;
    } else  {
        if (id === 2) {
            newTile.style.backgroundColor = blue;
        } else if (id === 3) {
            newTile.style.backgroundColor = "red";
        }
    
        if (newTile.childNodes.length > 0) {
            newTile.removeChild(newTile.firstChild);
        }
    }
    prevTile.style.backgroundColor = tan;
}

/**
 * boolean function to check if player is on a special item spot
 */
function isSpecialItemTile(x, y) {
    if (maze[x][y] === 4 || maze[x][y] === 5) {
        return true;
    }
    return false;
}

/**
 * boolean function to check if player is running into a wall
 */
function isWall(x, y) {
    if (maze[x][y] === 1) {
        return true;
    }
    return false;
}

function isOtherPlayer(x, y) {
    if (maze[x][y] === 3 || maze[x][y] === 2) {
        return true;
    }
    return false;
}

function isFinished(x, y) {
    if (maze[x][y] === 6) {
        return true;
    }
    return false;
}

function isOutOfBounds(y) {
    if (y < 0 || y > maze[0].length) {
        return true;
    }
    return false;
}

function isValidMove(x, y) {
    if (!isWall(x, y) && !isOtherPlayer(x, y) && !isOutOfBounds(y)) {
        return true;
    }
    return false;
}

function updateItemCount(id, array, type) {
    switch(id) {
        case 2: 
            if (type === 4) {
                document.querySelector('#p1-berry-count').innerHTML = array[0];
            } else if (type === 5) {
                document.querySelector('#p1-gold-berry-count').innerHTML = array[1];
            }
            break;
        case 3:
            if (type === 4) {
                document.querySelector('#p2-berry-count').innerHTML = array[0];
            } else if (type === 5) {
                document.querySelector('#p2-gold-berry-count').innerHTML = array[1];
            }
            break;
        default:
            break;
    }
}

function updatePlayerTimeOnScoreboard(time, playerId) {
    switch (playerId) {
        case 2:
            document.querySelector('#player-one-time').innerHTML = time;
            break;
        case 3:
            document.querySelector('#player-two-time').innerHTML = time;
            break;
        default:
            break;
    }
}

function startTimer(timer) {
    timer.start();
    setInterval(() => {
        const time = (timer.getTime() / 1000).toFixed(1);
        document.querySelector('#timer').innerHTML = time;
    }, 100);
}

async function countDown() {
    let timeLeft = 3;
    let downloadTimer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(downloadTimer);
            startTimer(timer);
            state.isRunning = true;
        }
        let timerText = document.querySelector('#timer');
        if (timeLeft > 0) {
            timerText.innerHTML = timeLeft;
        } 
        timeLeft--;
    }, 1000)
}

function startGame() {
    if (!state.isRunning) {
        countDown();
    }
}

function shouldEndGame() {
    if (p1.isDone && p2.isDone) {
        return true;
    } 
    return false;
} 

function resetGame() {
    resetScoreboard();
    state.isRunning = false;
    maze = createMaze();
    clearGameboard();
    loadMaze();
    p1.reset(6, 0);
    p2.reset(10, 0);
    timer.reset();
}

function resetScoreboard() {
    document.querySelectorAll('.item-count').forEach((item) => {
        item.innerHTML = "0";
    })
    document.querySelectorAll('.player-score').forEach((score) => {
        score.innerHTML = " ";
    })
    document.querySelector('#timer').innerHTML = " ";
}

function clearGameboard() {
    document.querySelector('#gameboard').replaceChildren();
}


/**
 * function to calculate the winner of a run 
 * need to implement simple calculation to determine which player took the least ammount of time
 */
function displayWinner() {
    let gameboard = document.querySelector('#gameboard');
    gameboard.replaceChildren();
    gameboard.style.display = "flex";
    gameboard.style.justifyContent = "center";
    gameboard.style.alignItems = "center";

    const winnerMessage = document.createElement('div');
    winnerMessage.classList.add('winner-message');

    if (parseFloat(p1.finalTime) < parseFloat(p2.finalTime)) {
        winnerMessage.innerHTML = "Player 1 wins! (space) to play again"
        console.log('p1 wins');
    } else if (parseFloat(p1.finalTime) > parseFloat(p2.finalTime)){
        winnerMessage.innerHTML = "Player 2 wins! (space) to play again"
        console.log('p2 wins');
    }
    gameboard.append(winnerMessage);
    gameboard.style.backgroundColor = "#619259";
}

/**
 * function to update the scoreboard
 * need to implement a simple incrementer to update the respective player's score
 */
function updateScore() {}

/**
 * function to reset the score
 */
function resetScore() {}

/**
 * function to update the current players name on the screen
 */
function updateCurrentPlayer() {}

/**
 * function for asking players if they would like to play again
 */
function playAgain() {}

/**
 * function to update the leaderboard
 * will need to choose a sorting algorithm to ensure the scores are displayed properly 
 * probably use quick-sort
 * lowest -> highest
 */
function updateLeaderboard() {}

/**
 * will be used to sort leaderboard scores
 */
function quickSort() {}
