const { DB } = require('./db');
let db = new DB();

/* DB Connector for User class
   Uses SQLite Syntax */

class UserDBConnector {
    constructor() {
        this.setup();
    }

    setup() {
        db.run(`CREATE TABLE IF NOT EXISTS servers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL);`);

        db.run(`CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            money INT DEFAULT 0,
            xp INT DEFAULT 0,
            rank TEXT,
            level INT DEFAULT 1,
            server TEXT,
            FOREIGN KEY (server) REFERENCES servers(id));`);
    }

    save(user) {
        db.run(`INSERT OR IGNORE INTO users (id, name, server) VALUES (?,?,?)`, [user.id, user.name, user.server]);
        db.run(`UPDATE users SET money = ?,xp = ?,rank = ?,level = ? WHERE id = ?;`,[user.money, user.xp, user.rank, user.level,user.id]);
    }

   async get(id) {
        let all_stats = await db.get(`Select * FROM users WHERE id = ?`,[id] );
        return all_stats;
    }
}
module.exports = {
	UserDBConnector
};