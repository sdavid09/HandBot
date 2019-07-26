const sqlite3 = require('sqlite3').verbose();

 class DB {

	constructor() {
		 this.db = new sqlite3.Database('data.db');
		 this.setupInitialTables();
		 this.xp = 0;
	 }

	setupInitialTables() {
		this.db.run(`CREATE TABLE IF NOT EXISTS servers (
			id TEXT PRIMARY KEY, 
			name TEXT NOT NULL);`);

		this.db.run(`CREATE TABLE IF NOT EXISTS users (
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
		this.db.run(`INSERT OR IGNORE INTO users (id, name, server) VALUES (?,?,?)`, [id, name, server]);
		// this.db.close();
	}

	addXP(id){
		this.db.run(`UPDATE users 
		SET xp=xp + 5
		WHERE id = ?`,[id])
	}

	getXP(id ){
		
		//async
		
		this.db.get(`Select xp FROM users WHERE id = ?`, [id], (err, row)=>
		{
		
			console.log(row);

		
		});
		
		}
	


 }

module.exports = {
	DB
};