
const { Rank } = require ('../rank/rank');
const { Level, XP } = require ('../level/level');
const { Money } = require ('../../economy/money');
const { UserDBConnector } = require('../../db/user_db');
let db = new UserDBConnector();

class User {
    constructor(id) {
        this.id = id;
        this.name = '';
        this.level = 0;
        this.xp = 0;
        this.rank = '';
        this.money = 0;
        this.server = 0;
    }

    setName(name) {
        this.name = name;
    }

    addXP(xp) {
        this.xp += xp;
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