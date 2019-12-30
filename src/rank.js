let ranks = require('../conf/ranks.json');

class Rank {
    constructor() {
        this.ranks = ranks;
    }

    getAllRanks() {
        let keys = Object.keys(ranks);
        for ( let i in keys) {
            console.log(keys[i]);
            console.log(ranks[keys[i]]);
        }
    }
}

module.exports = {
	Rank
};