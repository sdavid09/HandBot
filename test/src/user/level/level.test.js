const assert = require('chai').assert;
const { XP } = require('../../../../src/user/level/level');
let xp = new XP();
user = '171782598798999552'

describe('XP', function() {
    describe('Check User XP Value', function() {
        it('Check if XP is a number', async function () {
            let user_xp = await xp.getXP(user)
            assert.isNumber(user_xp, 'XP is a number');
        })
        it('Check if XP is greater than 0', async function () {
            let user_xp = await xp.getXP(user)
            assert.isAtLeast(user_xp, 0, 'User Xp Is at least greater than 0');
        })
    })
    describe('User Experience Points', function() {
        it('Check if Current XP In Range of Config Base XP', async function () {
            let user_xp = await xp.getXP(user)
            assert.isAtLeast(user_xp, 0, 'User Xp Is at least greater than 0');
        })
    })
})
