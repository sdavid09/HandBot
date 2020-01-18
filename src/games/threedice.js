/* Passe-dix style game where user rolls 3 dice. If the total sum of all three dice
 * is greater than 13, user get double their bet. Else they lose their bet.
 *
 */

class ThreeDice {
    constructor() {
        this.dice1;
        this.dice2;
        this.dice3;
    }
    rollDice() {
        this.dice1 = Math.floor(Math.random() * 6) + 1;
        this.dice2 = Math.floor(Math.random() * 6) + 1;
        this.dice3 = Math.floor(Math.random() * 6) + 1;

        return this.dice1 + this.dice2 + this.dice3;
    }

    play(bet=0) {
        let sum = this.rollDice();
        if(isNaN(bet) || bet <=0) {
            return false;
        }
        else if (sum >= 13) {
            return bet * 2;
        }
        else {
            return -bet;
        }
    }
}

module.exports = {
	ThreeDice
};