
const assert = require('chai').assert;
const expect = require('chai').expect;
const { User } = require('../../../../src/user/base/user');
const { UserDBConnector  } = require('../../../../src/db/user_db');
let db = new UserDBConnector();

describe('User', function() {
    describe('Check if User in Database', function() {
        it('Function should Create User Object', async function()  {
            user_id = '171782598798999552';
            let user = await new User(user_id).get();
            expect(user.xp).to.be.an('number');
        })
    })
    describe('Check Add Xp', async function() {
        user_id = '1234567';
        let user = await new User(user_id);
        it('Test User Xp = 0', async function()  {
            expect(user.xp).to.equal(0) &&
            expect(user.level).to.equal(1);
        })
        it('Test Add Xp to User', async function()  {
            user.addXP(2500);
            expect(user.xp).to.equal(2500) &&
            expect(user.rank).to.equal("Peasant") &&
            // expect(user.level).to.equal(50) &&
            expect(user.money).to.equal(25);
        })
        it('Check For user Promotion', async function()  {
            user.addXP(2500);
            expect(user.xp).to.equal(5000) &&
            // expect(user.rank).to.equal("Merchant") &&
            expect(user.level).to.equal(1);
            // expect(user.money).to.equal(75) ;
        })
    })
})