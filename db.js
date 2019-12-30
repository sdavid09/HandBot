const sqlite3 = require('sqlite3').verbose();


class DB {

	constructor() {
		 this.db_file = 'data.db';
	 }

	 run(sql, params=[]) {
		this.db = new sqlite3.Database(this.db_file)
		this.db.run(sql, params);
		this.db.close;
	 }

	 get (sql, params=[]) {
		this.db = new sqlite3.Database(this.db_file)
		return new Promise( ( resolve, reject ) => {
            this.db.get( sql, params, ( err, rows ) => {
                if ( err )
                    return reject( err );
				resolve( rows );
            } );
        } );
		this.db.close;
	 }

}
class UserCommands extends DB{

	addXP(xp, id) {
		super.run(`UPDATE users SET xp=xp + ? WHERE id = ?`,[xp, id]);
	}

	getXP(id) {
		let xp = 0;
		let search_for_user_xp = super.get(`Select xp FROM users WHERE id = ?`,[id] );
		return search_for_user_xp;		 		
	}

}
class UserInfo extends DB{
	constructor() {
		super (); // need to call super before calling this
		this.setupInitialTables();
	}

	setupInitialTables() {
		super.run(`CREATE TABLE IF NOT EXISTS servers (
				id TEXT PRIMARY KEY, 
				name TEXT NOT NULL);`);

		super.run(`CREATE TABLE IF NOT EXISTS users (
				id TEXT PRIMARY KEY, 
				name TEXT NOT NULL,
				money INT DEFAULT 0,
				xp INT DEFAULT 0,
				rank TEXT,  
				level INT DEFAULT 1, 
				server TEXT,
				FOREIGN KEY (server) REFERENCES servers(id));`);
	}

	insertUser(id, name, server) {
		// create record of users 
		super.run(`INSERT OR IGNORE INTO users (id, name, server) VALUES (?,?,?)`, [id, name, server]);
	}
}

module.exports = {
	UserCommands, UserInfo
};