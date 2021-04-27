const { DB } = require('./db');
let db = new DB();

class DailyBonusDBConnector {
    constructor() {
        this.setup();
    }

    setup() {
        db.run(`CREATE TABLE IF NOT EXISTS daily_bonus (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL);`);
    }

    async addUser(user) {
        let insert_promise = await db.run(`INSERT OR IGNORE INTO daily_bonus (id, name) VALUES (?,?)`, [user.id, user.name]);
    }

    async get(id) {
        let all_stats = await db.get(`Select * FROM daily_bonus WHERE id = ?`, [id]);
        return all_stats;
    }

    async deleteAllDailyBonusRecords() {
        return await db.run(`DELETE FROM daily_bonus`);
    }
}
module.exports = {
	DailyBonusDBConnector
};