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
        expect(promote).to.be.not.false;
    })

    it('Get Rank', async function () {
        let current_rank = 'Peasant'
        let search_rank = rank.getRank(current_rank);
        expect(search_rank).to.be.an('object').that.is.not.empty;
    })
    it('Get Default Rank', async function () {
        let search_rank = rank.getRankDefault();
        let default_rank = "Peasant";
        expect(search_rank).to.be.an('string').that.is.not.empty &&
        expect(search_rank).to.equal(default_rank);
    })
})