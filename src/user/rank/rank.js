let ranks = require('../../../conf/ranks.json');

class Rank {
    constructor() {
        this.ranks = Object.keys(ranks).reverse(); // config must rank lowest on bottom
    }

    getAllRanks() {
        return this.ranks;
    }

    getRankXP(rank) {
        let index = this.ranks.indexOf(rank);
        if (index === -1) {
            // if rank not in list of ranks then return
            return;
        }
        else {
            return ranks[rank]['base_xp'];
        }
    }

    // getRankFromIndex(index) {
    //     return new Promise((resolve, reject)=> {
    //         let rank = this.ranks[index];
    //         if (rank) {
    //             return resolve(rank);
    //         }
    //         else {
    //             reject()
    //         }
    //         } );
    // }

    checkForRankPromotion(current_rank, current_xp) {
        // checks current xp with ranks if can promote
        let rank = current_rank;
        for ( let i = 0; i < this.ranks.length; i++) {
            let xp = this.getRankXP(this.ranks[i])
            if ( current_xp >= xp ) {
                rank = this.ranks[i];
            }
        }
        // returns true if can promote
        if ( current_rank !== rank) {
            return true;
        }
        else {
            return false;
        }
    }

    promoteUser(id) {
        // change user rank to higher
    }
}


module.exports = {
	Rank
};