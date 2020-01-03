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
		let get_db_promise = new Promise( ( resolve, reject ) => {
            this.db.get( sql, params, ( err, rows ) => {
                if ( err )
                    return reject( err );
				resolve( rows );
            } );
        } );
		this.db.close;
		return get_db_promise;
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

}

module.exports = {
	DB, UserInfo
};