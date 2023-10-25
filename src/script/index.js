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
    [1,1,0,1,1,1,1,1,5,0,0,0,1,1,1,0,0,0,0,1,1,5,1,0,1,0,0,0,3],
    [1,1,0,1,0,0,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,0,1,1,1,1,1],
    [1,1,0,1,0,1,0,1,1,1,0,1,1,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1],
    [1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1],
    [1,0,1,1,0,1,0,1,0,1,1,4,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
    [1,4,0,0,0,1,0,1,0,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [1,1,1,0,1,1,0,0,0,0,0,4,0,0,1,0,0,5,1,1,1,4,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];
let playerXCoordinate = 8;
let playerYCoordinate = 0;


function Player(name, items) {
    this.name = name;
    this.items = items;
}

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
                    div.style.backgroundColor = tan;
                    break;
                case 1:
                    div.classList.add('wall');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    div.style.backgroundColor = green;
                    break;
                case 2:
                    div.classList.add('player');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    div.style.backgroundColor = blue;
                    break;
                case 3: 
                    div.classList.add('finish');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    div.style.backgroundColor = gold;
                    break;
                case 4: 
                    div.classList.add('special-item-container');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    div.style.backgroundColor = tan;
                    let berryImg = document.createElement('img');
                    berryImg.src = "../../images/berry.png";
                    div.append(berryImg);
                    break;
                case 5:
                    div.classList.add('special-item-container');
                    div.dataset.xCoordinate = i;
                    div.dataset.yCoordinate = j;
                    div.style.backgroundColor = tan;
                    let goldBerryImg = document.createElement('img');
                    goldBerryImg.src = "../../images/golden-berry.png";
                    div.append(goldBerryImg);
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
        if (e.key === "ArrowRight") {
            moveRight();
        }
        if (e.key === "ArrowLeft") {
            moveLeft();
        }
        if (e.key === "ArrowUp") {
            moveUp();
        }
        if (e.key === "ArrowDown") {
            moveDown();
        }
        console.log(specialItemsArray);
    })
}

function moveRight() {
    if (!isWall(playerXCoordinate, playerYCoordinate + 1)) {
        if (isSpecialItemTile(playerXCoordinate, playerYCoordinate + 1)) {
            pickupItem(playerXCoordinate, playerYCoordinate + 1);
        }
        maze[playerXCoordinate][playerYCoordinate] = 0;
        maze[playerXCoordinate][playerYCoordinate + 1] = 2;
        let prevTile = getTile(playerXCoordinate, playerYCoordinate);
        let newTile = getTile(playerXCoordinate, playerYCoordinate + 1);
        playerYCoordinate++;
        updateTileAfterMove(newTile, prevTile);

    }
}
function moveLeft() {
    if (!isWall(playerXCoordinate, playerYCoordinate - 1) || playerYCoordinate - 1 < 0) {
        if (isSpecialItemTile(playerXCoordinate, playerYCoordinate - 1)) {
            pickupItem(playerXCoordinate, playerYCoordinate - 1);
        }
        maze[playerXCoordinate][playerYCoordinate] = 0;
        maze[playerXCoordinate][playerYCoordinate - 1] = 2;
        let prevTile = getTile(playerXCoordinate, playerYCoordinate);
        let newTile = getTile(playerXCoordinate, playerYCoordinate - 1);
        playerYCoordinate--;
        updateTileAfterMove(newTile, prevTile);
    }
}

function moveUp() {
    if (!isWall(playerXCoordinate - 1, playerYCoordinate) || playerXCoordinate - 1 < 0) {
        if (isSpecialItemTile(playerXCoordinate - 1, playerYCoordinate)) {
            pickupItem(playerXCoordinate - 1, playerYCoordinate);
        }
        maze[playerXCoordinate][playerYCoordinate] = 0;
        maze[playerXCoordinate - 1][playerYCoordinate] = 2;
        let prevTile = getTile(playerXCoordinate, playerYCoordinate);
        let newTile = getTile(playerXCoordinate - 1, playerYCoordinate);
        playerXCoordinate--;
        updateTileAfterMove(newTile, prevTile);
    }
}

function moveDown() {
    if (!isWall(playerXCoordinate + 1, playerYCoordinate) || playerXCoordinate - 1 < 0) {
        if (isSpecialItemTile(playerXCoordinate + 1, playerYCoordinate)) {
            pickupItem(playerXCoordinate + 1, playerYCoordinate);
        }
        maze[playerXCoordinate][playerYCoordinate] = 0;
        maze[playerXCoordinate + 1][playerYCoordinate] = 2;
        let prevTile = getTile(playerXCoordinate, playerYCoordinate);
        let newTile = getTile(playerXCoordinate + 1, playerYCoordinate);
        playerXCoordinate++;
        updateTileAfterMove(newTile, prevTile);
    }
}

function getTile(x, y) {
    let tile = document.querySelector(`[data-x-coordinate="${x}"][data-y-coordinate="${y}"]`);
    return tile;
}

/**
 * function to update the tile the player is currently on/passed over 
 * will need to change tile appearance when play passes over the tile
 */
function updateTileAfterMove(newTile, prevTile) {
    newTile.style.backgroundColor = blue;
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

/**
 * function for picking up an item found in the maze
 */
function pickupItem(x, y) {
    if (maze[x][y] === 4) {
        specialItemsArray[0]++;
    } else if (maze[x][y] === 5) {
        specialItemsArray[1]++;
    }
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

/**
 * function to time player's runs
 */
function timer() {}

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
