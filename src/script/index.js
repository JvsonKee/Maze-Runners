let firstPlayerScore = 0;
let secondPlayerScore = 0;

/**
 * special item array
 * there are currently 2 special items players will be able to find on the map
 */
let specialItemsArray = new Array(2);

const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1],
    [1,0,1,1,0,0,0,0,0,0,0,1,0,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1],
    [1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,1,1,0,1,1,1],
    [1,0,0,1,1,0,0,1,0,1,1,0,0,0,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1],
    [1,1,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,0,0,0,0,1,0,1,1,0,1,1,1],
    [1,0,0,1,0,1,0,1,1,1,1,0,0,0,0,0,1,1,0,1,0,0,0,1,1,0,1,1,1],
    [1,0,1,1,0,1,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,1,1,1,0,1,1,1],
    [2,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1,0,0,0,1,1,1],
    [1,1,0,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,1,1,0,1,0,1,0,0,0,3],
    [1,1,0,1,0,0,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,0,1,0,1,1,1,1,1],
    [1,1,0,1,0,1,0,1,1,1,0,1,1,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1],
    [1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,1,1,1,0,1,1,0,1,0,1,0,1,0,1],
    [1,0,1,1,0,1,0,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
    [1,0,0,0,0,1,0,1,0,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [1,1,1,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]

generateMaze();

function generateMaze() {
    gameboard.style.gridTemplateColumns = `repeat(${maze.length}, 1fr)`;
    gameboard.style.gridTemplateColumns = `repeat(${maze[0].length}, 1fr)`;

    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            const div = document.createElement('div');
            switch (maze[i][j]) {
                case 0: 
                    div.classList.add('path');
                    gameboard.append(div);
                    div.style.backgroundColor = "tan";
                    break;
                case 1:
                    div.classList.add('tree');
                    gameboard.append(div);
                    div.style.backgroundColor = "#619259";
                    break;
                case 2:
                    div.classList.add('player');
                    gameboard.append(div);
                    div.style.backgroundColor = "#67d9ff";
                    break;
                case 3: 
                    div.classList.add('finish');
                    gameboard.append(div);
                    div.style.backgroundColor = "#ffd630";
                    break;
                default:
                    break;
            }
        } 
    }
}

/**
 * function for player movement
 * need to implement up, down, left and right movement for the player
 */
function move() {}

/**
 * function to update the tile the player is currently on/passed over 
 */
function updateTile() {}

/**
 * boolean function to check if player is moving to a valid space
 */
function isPath() {}

/**
 * boolean function to check if player is on a special item spot
 */
function isSpecialItem() {}

/**
 * boolean function to check if player is running into a wall
 */
function isWall() {}

/**
 * function for picking up an item found in the maze
 */
function pickupItem() {}

/**
 * function for counting total items after player has completed their run
 * will be used to calculate total score
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
