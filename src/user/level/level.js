const { DB } = require('../../db/db');
let db = new DB();

class Level {
    constructor() {
        this.xp = 0;
        this.level = 0;
    }

    getXP(id) {
        let search_for_user_xp = db.get(`Select xp FROM users WHERE id = ?`,[id] );
		return search_for_user_xp;		 		
    }
    
    addXP(xp, id) {
        db.run(`UPDATE users SET xp=xp + ? WHERE id = ?`,[xp, id]);
    }

    levelUp(id) {
        // increase level
    }
}

module.exports = {
	Level
};