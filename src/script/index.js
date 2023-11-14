class GameState {
    constructor() {
        this.isRunning = false;
    }
}

const tan = "#c4a886";
const green = "#619259";
const red = "#FF4545";
const blue = "#4356FF";
const gold = "#ffd630";

const leaderboard = new Leaderboard();
const state = new GameState();
const timer = new Timer();

let p1;
let p2;

let names = processForm("Enter player names: ")
let maze = createMaze();
intializeGameDefaults();

function processForm(text) {
    document.querySelector("#prompt-text").innerHTML = text;
    return new Promise((resolve, reject) => {
        document.querySelector("#prompt-button").onclick = () => {
            let player1 = document.querySelector("#player1-name-input");
            let player2 = document.querySelector("#player2-name-input");
            document.querySelector("#prompt").classList.add("hidden");
            document.querySelector("#overlay").classList.add("hidden");
            p1 = new Player(player1.value, 2, 6, 0);
            p2 = new Player(player2.value, 3, 10, 0);
            triggerGameStart();
            resolve([player1.value, player2.value]);
        }
    });
}

function intializeGameDefaults() {
    loadMaze();
    move();
    names.then(value => {
        document.querySelector('#player-one-name').innerHTML = value[0];
        document.querySelector('#player-two-name').innerHTML = value[1];
    })
}

function triggerGameStart() {
    document.addEventListener('keydown', (e) => {
        if (e.key == " " && !state.isRunning) {
            resetGame();
            startCountDown();
            p1.isRunning = true;
            p2.isRunning = true;
        }
    })
}

function startCountDown() {
    if (!state.isRunning) {
        countDown();
    }
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

function startTimer(timer) {
    timer.start();
    setInterval(() => {
        const time = (timer.getTime() / 1000).toFixed(1);
        document.querySelector('#timer').innerHTML = time;
    }, 100);
}

function shouldEndGame() {
    if (p1.isDone && p2.isDone) {
        return true;
    } 
    return false;
} 

function resetGame() {
    timer.reset();
    resetScoreboard();
    state.isRunning = false;
    maze = createMaze();
    clearGameboard();
    loadMaze();
    p1.reset(6, 0);
    p2.reset(10, 0);
}

/**
 * function for player movement
 * need to implement up, down, left and right movement for the player
 */
function move() {
    document.addEventListener('keydown', (e) => {
        if (state.isRunning) {
            switch (e.key) {
                case "ArrowRight":
                    p2.right();
                    break;
                case "ArrowLeft":
                    p2.left();
                    break;
                case "ArrowUp":
                    p2.up();
                    break;
                case "ArrowDown":
                    p2.down();
                    break;
                case "d":
                    p1.right();
                    break;
                case "a":
                    p1.left();
                    break;
                case "w":
                    p1.up();
                    break;
                case "s":
                    p1.down();
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
            newTile.style.backgroundColor = red;
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
    clearGameboard();
    gameboard.style.display = "flex";
    gameboard.style.justifyContent = "center";
    gameboard.style.alignItems = "center";

    const winnerMessage = document.createElement('div');
    winnerMessage.classList.add('winner-message');

    if (parseFloat(p1.finalTime) < parseFloat(p2.finalTime)) {
        winnerMessage.innerHTML = `${p1.name} <br /> (space) to play again`
        console.log('p1 wins');
    } else if (parseFloat(p1.finalTime) > parseFloat(p2.finalTime)){
        winnerMessage.innerHTML = `${p2.name} wins! <br /> (space) to play again`
        console.log('p2 wins');
    }
    gameboard.append(winnerMessage);
    gameboard.style.backgroundColor = green;
}

function createMaze() {
    const originalMaze = [
        [7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,8],
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
        [9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,10],
    ];
    return originalMaze;
}

function loadMaze() {
    let gameboard = document.querySelector('#gameboard');
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
                    div.classList.add('player1');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    break;
                case 3: 
                    div.classList.add('player2');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    div.style.backgroundColor = red;
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
                case 7: 
                    div.classList.add('top-left-corner');
                    break;
                case 8: 
                    div.classList.add('top-right-corner');
                    break;
                case 9: 
                    div.classList.add('bottom-left-corner');
                    break;
                case 10: 
                    div.classList.add('bottom-right-corner');
                    break;
                default:
                    break;
            }
        } 
    }
}