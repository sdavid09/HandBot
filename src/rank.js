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

    checkForRankPromotion(id, current_xp) {
        // checks current xp with ranks if can promote
        // returns true if can promote
    }

    promoteUser(id) {
        // change user rank to higher
    }
}

module.exports = {
	Rank
};