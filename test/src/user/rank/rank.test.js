const expect= require('chai').expect;
const { Rank } = require('../../../../src/user/rank/rank');
let test_rank = "Lord"
let rank = new Rank();

describe('Rank Config Values', function() {
    it('Make Sure Rank Values are not null', async function () {
        let all_ranks = rank.getAllRanks();
        expect(all_ranks).to.be.an('array').that.is.not.empty;
    })

    it('Check if Rank Exists', async function () {
        let all_ranks = rank.getAllRanks();
        expect(all_ranks.indexOf(test_rank)).to.not.equal(-1)
    })

    it('Get Rank XP', async function () {
        let rank_xp = rank.getRankXP(test_rank);
        expect(rank_xp).to.be.an('number');
    })

    it('Check if Can Be Promoted', async function () {
        let current_xp = 5000;
        let current_rank = 'Peasant'
        let promote = rank.checkForRankPromotion(current_rank, current_xp);
        expect(promote).to.be.true;
    })
})