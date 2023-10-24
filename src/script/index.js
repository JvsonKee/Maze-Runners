const gameboard = document.querySelector('#gameboard');

let firstPlayerScore = 0;
let secondPlayerScore = 0;

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
 */
function move() {}

/**
 * function to time player's runs
 */
function timer() {}

/**
 * function to calculate the winner of a run
 */
function calculateWinner() {}

/**
 * function to update the scoreboard
 */
function updateScore() {}

/**
 * function to update the leaderboard
 */
function updateLeaderboard() {}