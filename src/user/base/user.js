
const { Rank } = require ('../rank/rank');
const { Level, XP } = require ('../level/level');
const { Money } = require ('../../economy/money');
const { DB } = require('../../db/db');
let db = new DB();

class User {
    constructor() {
        this.id;
        this.level;
        this.xp;
        this.rank;
        this.money;
    }

    async getAllUserStats(id) {
        let all_stats = await db.get(`Select money, xp, rank, level FROM users WHERE id = ?`,[id] );
        return all_stats;
    }

    async getXP(id) {
        let xp = new XP();
        return await xp.getXP(id);
    }

    addXP(value, id) {
        let xp = new XP();
        xp.addXP(value, id);
    }

    addUserToDB(id, name, server) {
		// create record of users 
	    db.run(`INSERT OR IGNORE INTO users (id, name, server) VALUES (?,?,?)`, [id, name, server]);
    }


}

module.exports = {
	User
};