const { voice_xp, max_lvl } = require('../../../conf/config.json');

class XPModifiers {

    static voiceXPModifier(number_of_users) {
    // increase 1% xp modifier per user in same channel
        let xp = voice_xp * ( 1 + ( number_of_users / 100 ))
        return xp;
  }

}

class Level {
    constructor(xp=0, next_rank_xp=0, xp_to_next_rank=0) {
        this.xp = xp;
        this.level = 1;
        this.increment = 0; // amount of xp per level
        this.xp_to_next_rank = xp_to_next_rank;
        this.next_rank_xp = next_rank_xp;
        // if values passed in setup level
        if (this.xp_to_next_rank && this.xp) {
            this.calculateLevel();
        }
    }

    getLevel() {
        return this.level;
        // return user level
    }

    calculateLevel(){
        // setup user level calcuate based on xp to next rank
        this.increment = Math.round((this.xp_to_next_rank / max_lvl)) //
        if (this.increment && this.xp) {
            // calculate level
            this.level = Math.abs(Math.floor(((this.next_rank_xp - this.xp) / (this.increment)) - ((max_lvl))))
        }
    }

    levelUp(id) {
        // increase level
    }
}

module.exports = {
	Level, XPModifiers
};