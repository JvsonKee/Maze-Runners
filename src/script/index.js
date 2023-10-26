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

function Player(name, id,  xCoordinate, yCoordinate) {
    this.name = name;
    this.id = id;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.specialItems = [0, 0];

    this.right = function() {
        if (!isWall(xCoordinate, yCoordinate + 1) && !isOtherPlayer(xCoordinate, yCoordinate + 1)) {
            if (isFinished(xCoordinate, yCoordinate + 1)) {
                timer.stop();
            }
            if (isSpecialItemTile(xCoordinate, yCoordinate + 1)) {
                this.pickupItem(xCoordinate, yCoordinate + 1);
            }
            maze[xCoordinate][yCoordinate] = 0;
            maze[xCoordinate][yCoordinate + 1] = id;
            let prevTile = getTile(xCoordinate, yCoordinate);
            let newTile = getTile(xCoordinate, yCoordinate + 1);
            yCoordinate++;
            updateTileAfterMove(newTile, prevTile, id);
        }
    }

    this.left = function() {
        if (!isWall(xCoordinate, yCoordinate - 1) && !isOtherPlayer(xCoordinate, yCoordinate - 1)) {
            if (isFinished(xCoordinate, yCoordinate - 1)) {
                timer.stop();
            }
            if (isSpecialItemTile(xCoordinate, yCoordinate - 1)) {
                this.pickupItem(xCoordinate, yCoordinate - 1);
            }
            maze[xCoordinate][yCoordinate] = 0;
            maze[xCoordinate][yCoordinate - 1] = id;
            let prevTile = getTile(xCoordinate, yCoordinate);
            let newTile = getTile(xCoordinate, yCoordinate - 1);
            yCoordinate--;
            updateTileAfterMove(newTile, prevTile, id);
        }
    }

    this.up = function() {
        if (!isWall(xCoordinate - 1, yCoordinate) && !isOtherPlayer(xCoordinate - 1, yCoordinate)) {
            if (isFinished(xCoordinate - 1, yCoordinate)) {
                timer.stop();
            }
            if (isSpecialItemTile(xCoordinate - 1, yCoordinate)) {
                this.pickupItem(xCoordinate - 1, yCoordinate);
            }
            maze[xCoordinate][yCoordinate] = 0;
            maze[xCoordinate - 1][yCoordinate] = id;
            let prevTile = getTile(xCoordinate, yCoordinate);
            let newTile = getTile(xCoordinate - 1, yCoordinate);
            xCoordinate--;
            updateTileAfterMove(newTile, prevTile, id);
        }
    }

    this.down = function() {
        if (!isWall(xCoordinate + 1, yCoordinate) && !isOtherPlayer(xCoordinate + 1, yCoordinate)) {
            if (isFinished(xCoordinate + 1, yCoordinate)) {
                timer.stop();
            }
            if (isSpecialItemTile(xCoordinate + 1, yCoordinate)) {
                this.pickupItem(xCoordinate + 1, yCoordinate);
            }
            maze[xCoordinate][yCoordinate] = 0;
            maze[xCoordinate + 1][yCoordinate] = id;
            let prevTile = getTile(xCoordinate, yCoordinate);
            let newTile = getTile(xCoordinate + 1, yCoordinate);
            xCoordinate++;
            updateTileAfterMove(newTile, prevTile, id);
        }
    }

    this.pickupItem = function(x, y) {
        if (maze[x][y] === 4) {
            this.specialItems[0]++;
            let berryCount = document.querySelector('#berry-count');
            berryCount.innerHTML = this.specialItems[0];
        } else if (maze[x][y] === 5) {
            this.specialItems[1]++;
            let goldenBerryCount = document.querySelector('#gold-berry-count');
            goldenBerryCount.innerHTML = this.specialItems[1];
        }
    }
}

const p1 = new Player("name", 2, 8, 0);
const p2 = new Player("name", 3, 12, 0);

let tan = "#c4a886";
let green = "#619259";
let blue = "#67d9ff";
let gold = "#ffd630";

/**
 * stores the time of the current runs
 */
let firstPlayerTime = 0;
let secondPlayerTime = 0;

/**
 * holds all players' scores respectively 
 */
let firstPlayerScores = [];
let secondPlayerScores = [];

/**
 * contains the top scores 
 */
let leaderboard = [];

/**
 * special item array
 * there are currently 2 special items players will be able to find on the map
 */
let specialItemsArray = [0, 0];

const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,4,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,4,1,0,0,0,0,0,0,4,1,1,1],
    [1,0,1,1,0,0,0,0,0,0,0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1],
    [1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,1,1,0,1,1,1],
    [1,0,0,1,1,0,0,1,4,1,1,5,0,0,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1],
    [1,1,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,0,0,0,0,1,0,1,1,0,1,1,1],
    [1,0,0,1,4,1,0,1,1,1,1,0,0,0,0,4,1,1,0,1,0,0,0,1,1,0,1,1,1],
    [1,0,1,1,0,1,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,1,1,1,0,1,1,1],
    [2,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1,0,0,0,1,1,1],
    [1,1,0,1,1,1,1,1,5,0,0,0,1,1,1,0,0,0,0,1,1,5,1,0,1,0,0,0,6],
    [1,1,0,1,0,0,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,0,1,1,1,1,1],
    [1,1,0,1,0,1,0,1,1,1,0,1,1,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1],
    [3,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1],
    [1,0,1,1,0,1,0,1,0,1,1,4,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
    [1,4,0,0,0,1,0,1,0,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [1,1,1,0,1,1,0,0,0,0,0,4,0,0,1,0,0,5,1,1,1,4,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];
let playerXCoordinate = 8;
let playerYCoordinate = 0;

generateMaze();

function generateMaze() {
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

const timer = new Timer();

move();
/**
 * function for player movement
 * need to implement up, down, left and right movement for the player
 */
function move() {
    startTimer(timer);
    document.addEventListener('keydown', (e) => {
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
        console.log(maze);
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
    if (id === 2) {
        newTile.style.backgroundColor = blue;
    } else if (id === 3) {
        newTile.style.backgroundColor = "red";
    }

    if (newTile.childNodes.length > 0) {
        newTile.removeChild(newTile.firstChild);
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

/**
 * function for counting total items after player has completed their run
 * will be used when calculating overall score of a run
 */
function countItems() {}

/**
 * function to reset item count after player's run
 */
function resetItemCount() {}

function startTimer(timer) {
    timer.start();
    setInterval(() => {
        const time = (timer.getTime() / 1000).toFixed(1);
        document.querySelector('#timer').innerHTML = time;
    }, 100);
}
/**
 * function to reset the time after player's run
 */
function resetTime() {}

/**
 * function to calculate the winner of a run 
 * need to implement simple calculation to determine which player took the least ammount of time
 */
function calculateWinner() {}

/**
 * function to display the winner
 */
function displayWinner() {}

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
