const { DB } = require('../../db/db');
let ranks = require('../../../conf/ranks.json');

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
        this.config=[]
    }

    async getXP(id) {
        let rows = await db.get(`Select xp FROM users WHERE id = ?`,[id] );
        return rows.xp;

    }

    addXP(xp, id) {
        db.run(`UPDATE users SET xp=xp + ? WHERE id = ?`,[xp, id]);
    }

    voiceXPModifier(number_of_users) {
    // increase 1% xp modifier per user in same channel
        let xp = voice_xp * ( 1 + ( number_of_users / 100 ))
        return xp;
  }

    getXPValuesFromConfig() {
        // read xp values from config
        let xp_list = [];
        let keys = Object.keys(ranks);

        for ( let i in keys) {
            console.log(keys[i]);
            console.log(ranks[keys[i]]['base_xp']);
        }
    }
}

module.exports = {
	Level, XP, ranks
};