
const expect= require('chai').expect;
const { XPModifiers, Level} = require('../../../../src/user/level/level');


describe('XP', function() {
    describe('Check User XP Value', function() {
        it('Check if XP is a number', async function () {
            let number_of_users = 5;
            expect(XPModifiers.voiceXPModifier(number_of_users)).to.be.an('number');
        })
    })
})

describe('Level', function() {
    describe('Check User Level', function() {
        it('Check if User Level Calculated Correctly 1', async function () {
            // assuming max_level from config is 100
            let level = new Level(231, 5000, 5000);
            expect(level.level).to.be.an('number') &&
            expect(level.level).to.equal(5);
        })

        it('Check if User Level Calculated Correctly 2', async function () {
            // assuming max_level from config is 100
            let level = new Level(4999.9, 5000, 5000);
            expect(level.level).to.be.an('number') &&
            expect(level.level).to.equal(100);
        })
        it('Check if User Level Calculated Correctly 3', async function () {
            // assuming max_level from config is 100
            let level = new Level(45000, 50000, 25000);
            expect(level.level).to.be.an('number') &&
            expect(level.level).to.equal(80);
        })

    })
})
