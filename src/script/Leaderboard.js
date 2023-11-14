class Leaderboard {
    constructor() {
        this.scores = [];
    }

    /**
     * Adds a time to the leaderboard
     * @param {Player} player 
     * @param {int} time 
     */
    addScore(player, time) {
        const leaderboardItem = {
            name: player,
            time: time
        }
        this.scores.push(leaderboardItem);
        this.sortLeaderboard();
    }

    /**
     * Displays the scores onto the leaderboard
     */
    displayLeaderboard() {
        let leaderboardScores = document.querySelector('#leaderboard-scores');
        leaderboardScores.replaceChildren();
        this.scores.forEach((player, index) => {
            let scoreItem = document.createElement('div');
            scoreItem.classList.add('leaderboard-score');
            let place = document.createElement('div');
            place.setAttribute('id', 'index');
            place.innerHTML = `${index + 1}`;
            let name = document.createElement('div');
            name.setAttribute('id', 'leaderboard-name');
            name.innerHTML = `${player.name}`;
            let time = document.createElement('div');
            time.setAttribute('id', 'leaderboard-time');
            time.innerHTML = `${player.time}`;
            scoreItem.append(place, name, time);
            leaderboardScores.append(scoreItem);
        });
    }

    /**
     * Sorts the leaderboard in ascending order
     */
    sortLeaderboard() {
        this.scores.sort((a, b) => a.time - b.time);
    }
}