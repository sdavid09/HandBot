const assert = require('chai').assert;
const expect= require('chai').expect;
const { XP, ranks } = require('../../../../src/user/level/level');
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
    // describe('User Experience Points', function() {
    //     it('Check if Current XP In Range of Config Base XP', async function () {
    //         let user_xp = await xp.getXP(user)
    //         assert.isAtLeast(user_xp, 0, 'User Xp Is at least greater than 0');
    //     })
    // })

    // describe('XP Config Values', function() {
    //     it('Make Sure XP Values are not null', async function () {
    //         expect(xp.config).to.be.an('array').that.is.not.empty;
    //     })
    //     it('Make Sure XP Values are Number', async function () {
    //         for( let i = 0; i < xp.config.length; i ++) {
    //             // assert.isNumber(xp.config[i], 'Check Each Base_xp Value is Number');
    //             expect(xp.config[i]).to.be.a('number');
    //         }
    //     })
    // })
})
