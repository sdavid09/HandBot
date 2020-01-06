
const expect= require('chai').expect;
const { XPModifiers, Level} = require('../../../../src/user/level/level');


describe('XP', function() {
    describe('Check User XP Value', function() {
        it('Check if XP is a number', async function () {
            let number_of_users = 5;
            expect(XPModifiers.voiceXPModifier(number_of_users)).to.be.an('number');
        })
        // it('Check if XP is greater than 0', async function () {
        //     let user_xp = await xp.getXP(user)
        //     assert.isAtLeast(user_xp, 0, 'User Xp Is at least greater than 0');
        // })
    })
})

describe('Level', function() {
    describe('Check User Level', function() {
        it('Check if User Level Calculated Correctly 1', async function () {
            // assuming max_level from config is 100
            let level = new Level(231, 5000);
            expect(level.level).to.be.an('number') &&
            expect(level.level).to.equal(4);
        })

        it('Check if User Level Calculated Correctly 2', async function () {
            // assuming max_level from config is 100
            let level = new Level(4999.9, 5000);
            expect(level.level).to.be.an('number') &&
            expect(level.level).to.equal(99);
        })
        it('Check if User Level Calculated Correctly 3', async function () {
            // assuming max_level from config is 100
            let level = new Level(45000, 67000);
            expect(level.level).to.be.an('number') &&
            expect(level.level).to.equal(67);
        })
        // it('Check if XP is greater than 0', async function () {
        //     let user_xp = await xp.getXP(user)
        //     assert.isAtLeast(user_xp, 0, 'User Xp Is at least greater than 0');
        // })
    })
})
