# Explanation

### 1. Traversing

- One of the more complex parts of this game was figuring out how to implement player movement within the maze. Using a two-dimensional array of integers I was able to differenciate paths, walls and items from each other.
  - 0 - Representing the path
  - 1 - Representing a wall
  - 2 - Representing player 1
  - 3 - Representing player 2
  - 4 - Representing a berry item
  - 5 - Representing a golden berry item
- From here I wrote methods for up, down, left and right movements and the protocols to follow when a player comes in contact with one of these obstacles. The protocols handled what happens if a player runs into a wall, whether they are making a valid move, and picking up items.
- To reflect the player movement on the gameboard, I did not want to generate the two-dimensional after every move so I added data-attributes to each tile. These attributes contained the current coordinates of the player and I would be able to easily access the tile and restyle it if necessary.

### 2. Player class

- The player class is another complex part of this game and is a crucial element of how Maze Runners works. The Player class contains basic information about a player such as, their name, x-coordinate, y-coordinate, run times, berry count, etc. Additionally, this class contains functions for up, down, left and right movement, picking up items and counting items and computing run times. When the user launches the game, two Player objects are created and are utilized to store and display information about the game. This includes run times on the scoreboard, berry count, and top scores on the leaderboard.

### 3. Timer

- The timer is another complex and central function for this game and works using the built-in Date object in javascript. The Timer class has functions for starting, stopping, getting and resetting the time. Implementing the timer to work correctly within the game was tough because I needed to ensure that the timer was accurate. When a player triggers the game to start, an initial countdown of 3 seconds begins. Following this count down the timer begins ticking, and will only stop when both players complete the maze. Furthermore, the timer resets if the players choose to keep playing and the previous times will be saved in an array to be displayed on the leaderboard.
