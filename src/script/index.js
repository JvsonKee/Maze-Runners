let firstPlayerTime = 0;
let secondPlayerTime = 0;
let firstPlayerScores = [];
let secondPlayerScores = [];
let leaderboard = [];

/**
 * special item array
 * there are currently 2 special items players will be able to find on the map
 */
let specialItemsArray = new Array(2);

/**
 * maze array
 * will be used as the map
 */
const maze = [];

/**
 * function to generate the maze
 * need to generate the maze based of the defined "maze" variable
 */
function generateMaze() {}

/**
 * function for player movement
 * need to implement up, down, left and right movement for the player
 */
function move() {}

/**
 * function to update the tile the player is currently on/passed over 
 * will need to change tile appearance when play passes over the tile
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
