const { DB } = require('./db');
let db = new DB();

class ServerDBConnector {
    constructor() {
        this.setup();
    }

    setup() {
        db.run(`CREATE TABLE IF NOT EXISTS servers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL);`);
    }

    save(id, name) {
        db.run(`INSERT OR IGNORE INTO servers (id, name) VALUES (?,?)`, [id, name]);
    }
}
module.exports = {
	ServerDBConnector
};