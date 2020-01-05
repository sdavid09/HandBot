
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
})