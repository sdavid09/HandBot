
const { Rank } = require ('./rank');
const { Level } = require ('./level');
const { Money } = require ('./money');
const { DB } = require('./db');
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
        let level = new Level();
        return await level.getXP(id);
    }

    addXP(xp, id) {
        let level = new Level();
        level.addXP(xp, id);
    }

    addUserToDB(id, name, server) {
		// create record of users 
	    db.run(`INSERT OR IGNORE INTO users (id, name, server) VALUES (?,?,?)`, [id, name, server]);
    }
    
}

module.exports = {
	User
};