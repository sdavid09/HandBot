const { DB } = require('./db');
let db = new DB();

class Stats {
    constructor() {
        this.stats;
    }

    getAllUserStats(id) {
        let all_stats = db.get(`Select money, xp, rank, level FROM users WHERE id = ?`,[id] );
		return all_stats;	
    }
}

module.exports = {
	Stats
};