
const { Rank } = require ('./rank');
const { Level } = require ('./level');
const { Money } = require ('./money');
const { Stats } = require ('./stats');
const { DB } = require('./db');
let db = new DB();

class User {
    constructor() {
        this.id= 0;
        this.level;
        this.xp;
        this.rank;
        this.money;
    }

    async getAllUserStats(id) {
        let stats = new Stats();
        return await stats.getAllUserStats(id);
    }

    async getXP(id) {
        let level = new Level();
        return await level.getXP(id);
    }

    async addXP(xp, id) {
        let level = new Level();
        return await level.addXP(xp, id);
    }

    addUserToDB(id, name, server) {
		// create record of users 
	    db.run(`INSERT OR IGNORE INTO users (id, name, server) VALUES (?,?,?)`, [id, name, server]);
	}
}

module.exports = {
	User
};