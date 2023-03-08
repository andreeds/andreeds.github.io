'use strict';

class Storage {

    constructor() {
        this.database = localStorage;
        this.scores = {};
        if (!this.database.getItem("scores")) {
            this.scores = {};
        } else {
            this.scores = JSON.parse(this.database.getItem("scores"));
        }
    }

    saveScore(evolutionId, score) {
        if (this.scores[evolutionId]) {
            this.scores[evolutionId].push(score);
        } else {
            this.scores[evolutionId] = [score];
        }
        this.database.setItem("scores", JSON.stringify(this.scores));
    }

    getMinScore(evolutionId) {
        if (this.scores[evolutionId]) {
            return Math.min.apply(null, this.scores[evolutionId]);
        } else {
            return -1;
        }
    }

}

export default Storage;