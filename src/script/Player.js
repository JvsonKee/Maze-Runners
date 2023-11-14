class Player {
    constructor(name, id, xCoordinate, yCoordinate) {
        this.name = name;
        this.id = id;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.isDone = false;
        this.specialItems = [0,0];
        this.runTime = 0;
        this.finalTime = 0; 
        this.scoreHistory = [];
    }

    right() {
        if (isValidMove(this.xCoordinate, this.yCoordinate + 1)) {
            let prevTile = getTile(this.xCoordinate, this.yCoordinate);
            let newTile = getTile(this.xCoordinate, this.yCoordinate + 1);
            if (!this.isDone) {
                if (isFinished(this.xCoordinate, this.yCoordinate + 1)) {
                    this.runTime = (timer.getTime() / 1000).toFixed(1);
                    this.isDone = true;
                    this.calculateScore();
                    updatePlayerTimeOnScoreboard(this.finalTime, this.id);
                    leaderboard.addScore(this.name, this.finalTime);
                    if (shouldEndGame()) {
                        timer.stop();
                        state.isRunning = false;
                        leaderboard.displayLeaderboard();
                        displayWinner();
                    }
                    maze[this.xCoordinate][this.yCoordinate] = 0;
                    maze[this.xCoordinate][this.yCoordinate + 1] = 6;
    
                } else {
                    if (isSpecialItemTile(this.xCoordinate, this.yCoordinate + 1)) {
                        this.pickupItem(this.xCoordinate, this.yCoordinate + 1);
                    }
                    maze[this.xCoordinate][this.yCoordinate] = 0;
                    maze[this.xCoordinate][this.yCoordinate + 1] = this.id;
                }
                this.yCoordinate++;
                updateTileAfterMove(newTile, prevTile, this.id);
            }
        }
    }

    left() {
        if (!this.isDone) {
            if (isValidMove(this.xCoordinate, this.yCoordinate - 1)) {
                if (isSpecialItemTile(this.xCoordinate, this.yCoordinate - 1)) {
                    this.pickupItem(this.xCoordinate, this.yCoordinate - 1);
                }
                maze[this.xCoordinate][this.yCoordinate] = 0;
                maze[this.xCoordinate][this.yCoordinate - 1] = this.id;
                let prevTile = getTile(this.xCoordinate, this.yCoordinate);
                let newTile = getTile(this.xCoordinate, this.yCoordinate - 1);
                this.yCoordinate--;
                updateTileAfterMove(newTile, prevTile, this.id);
            }
        }
    }

    up() {
        if (!this.isDone) {
            if (isValidMove(this.xCoordinate - 1, this.yCoordinate)) {
                if (isSpecialItemTile(this.xCoordinate - 1, this.yCoordinate)) {
                    this.pickupItem(this.xCoordinate - 1, this.yCoordinate);
                }
                maze[this.xCoordinate][this.yCoordinate] = 0;
                maze[this.xCoordinate - 1][this.yCoordinate] = this.id;
                let prevTile = getTile(this.xCoordinate, this.yCoordinate);
                let newTile = getTile(this.xCoordinate - 1, this.yCoordinate);
                this.xCoordinate--;
                updateTileAfterMove(newTile, prevTile, this.id);
            }
        }
    }

    down() {
        if (!this.isDone) {
            if (isValidMove(this.xCoordinate + 1, this.yCoordinate)) {
                if (isSpecialItemTile(this.xCoordinate + 1, this.yCoordinate)) {
                    this.pickupItem(this.xCoordinate + 1, this.yCoordinate);
                }
                maze[this.xCoordinate][this.yCoordinate] = 0;
                maze[this.xCoordinate + 1][this.yCoordinate] = this.id;
                let prevTile = getTile(this.xCoordinate, this.yCoordinate);
                let newTile = getTile(this.xCoordinate + 1, this.yCoordinate);
                this.xCoordinate++;
                updateTileAfterMove(newTile, prevTile, this.id);
            }
        }
    }

    pickupItem(x, y) {
        if (maze[x][y] === 4) {
            this.specialItems[0]++;
            updateItemCount(this.id, this.specialItems, 4);
        } else if (maze[x][y] === 5) {
            this.specialItems[1]++;
            updateItemCount(this.id, this.specialItems, 5);
        }
    }

    calculateScore() {
        let playerOneTimeReduction = this.convertBerryCountToTime();
        let score = (this.runTime - playerOneTimeReduction).toFixed(1);
        
        this.scoreHistory.push(score);
        this.finalTime = score;
    }   

    convertBerryCountToTime() {
        let berryTime = 0;
        berryTime += this.specialItems[0];
        berryTime += this.specialItems[1] * 3;
        return berryTime;
    }

    reset(startX, startY) {
        this.finalTime = 0;
        this.runTime = 0;
        this.xCoordinate = startX; 
        this.yCoordinate = startY;
        this.isDone = false;
        this.specialItems = [0,0];
    }
}