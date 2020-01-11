
const { Rank } = require ('../rank/rank');
const { Level, XPModifiers } = require ('../level/level');
const { Money } = require ('../../economy/money');
const { UserDBConnector } = require('../../db/user_db');
let db = new UserDBConnector();

class User {
    constructor(id) {
        this.id = id;
        this.name = '';
        this.xp = 0;
        this.rank = new Rank().getRankDefault();
        this.level = 1;
        this.money = new Rank().getRankBonus(this.rank);
        this.server = 0;
    }

    setName(name) {
        this.name = name;
    }

    checkLevel() {
        let rank = new Rank()
        let next_rank = rank.getNextRank(this.rank)
        let level = new Level(this.xp, rank.getRankXP(next_rank), rank.getXPToNextRank(this.rank))
        return level.getLevel();
    }

    checkForRankPromotion() {
        let rankclass= new Rank();
        let user_rank = rankclass.checkForRankPromotion(this.rank, this.xp)
        this.level = this.checkLevel();

        if (user_rank) {
            this.rank = user_rank;
            this.money += rankclass.getRankBonus(user_rank);
            this.level = 1;
            // this.save();
        }
    }

    addXP(xp) {
        this.xp += xp;
        // maybe add event instead of calling function
        this.checkForRankPromotion();
    }

    save() {
        db.save(this)
    }

    async get() {
        let user = await db.get(this.id);
        if (user) { // if user already in db get data and create user object
            this.name = user.name;
            this.xp = user.xp;
            this.level = user.level;
            this.rank = user.rank;
            this.money = user.money;
            this.server = user.server;
        }
        return this;
    }
}

module.exports = {
	User
};