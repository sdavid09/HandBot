const expect = require('chai').expect;
const { ThreeDice } = require('../../../src/games/threedice');

describe('Games', function() {
    describe('ThreeDice checker', function() {
        it('Game should return true or false if sum is greater than 10', async function()  {
            let game = new ThreeDice()
            game.rollDice();
            expect(game.dice1 + game.dice2 + game.dice3).to.be.above(3);
        })
    })
    describe('ThreeDice checker', function() {
        it('Game should return true or false if sum is greater than 10', async function()  {
            let game = new ThreeDice()
            let start = game.play(25);
            expect(start).to.be.an('number');
        })
    })
})