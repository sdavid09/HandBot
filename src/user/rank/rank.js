let ranks = require('../../../conf/ranks.json');

class Rank {
    constructor() {
        this.ranks = Object.keys(ranks).reverse(); // config must rank lowest on bottom
    }

    getAllRanks() {
        return this.ranks;
    }

    getRank(rank) {
        let index = this.ranks.indexOf(rank);
        if (index === -1) {
            // if rank not in list of ranks then return
            return;
        }
        else {
            return ranks[rank];
        }
    }

    getRankXP(rank) {
        let check_rank = this.getRank(rank);
        if (check_rank) {
            return check_rank["base_xp"];
        }
        else {
            return
        }
    }

    getNextRank(rank) {
        // function to get next rank that user can be promoted to
        let index = this.ranks.indexOf(rank);
        if (index === (this.ranks.length - 1 )) {
            // if value is equal to length of array then its at the end so exit
            return;
        }
        return this.ranks[++index];
    }

    getXPToNextRank(rank) {
        let next_rank = this.getNextRank(rank);
        if (next_rank) {
            let current_rank_xp = this.getRank(rank)["base_xp"]
            let next_rank_xp = this.getRank(next_rank)["base_xp"]
            return next_rank_xp - current_rank_xp;
        }
        return;
    }

    getRankDefault() {
        return this.ranks[0]
    }
    getRankBonus(rank) {
        return this.getRank(rank)['bonus']
    }

    checkForRankPromotion(current_rank, current_xp) {
        // checks current xp with ranks if can promote
        let rank = current_rank;
        for ( let i = 0; i < this.ranks.length; i++) {
            // look through all ranks
            let xp = this.getRankXP(this.ranks[i])
            // get rank base xp
            if ( current_xp >= xp ) {
                rank = this.ranks[i];
            }
        }
        // returns true if can promote
        if ( current_rank !== rank) {
            return rank;
        }
        else {
            return false;
        }
    }

}


module.exports = {
	Rank
};