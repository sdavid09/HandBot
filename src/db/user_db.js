const { DB } = require('./db');
let db = new DB();

/* DB Connector for User class
   Uses SQLite Syntax */

class UserDBConnector {

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