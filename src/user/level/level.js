const { DB } = require('../../db/db');
let db = new DB();

class Level {
    constructor() {
        this.level = 0;
    }

    getLevel(id) {
        // return user level
    }

    levelUp(id) {
        // increase level
    }


}

class XP {
    constructor () {
        this.xp;
    }

    getXP(id) {
        let search_for_user_xp = db.get(`Select xp FROM users WHERE id = ?`,[id] );
		return search_for_user_xp;		 		
    }
    
    addXP(xp, id) {
        db.run(`UPDATE users SET xp=xp + ? WHERE id = ?`,[xp, id]);
    }
    
    voiceXPModifier(number_of_users) {
    // increase 1% xp modifier per user in same channel
    let xp = voice_xp * ( 1 + ( number_of_users / 100 ))
    return xp;
  }
}

module.exports = {
	Level, XP
};