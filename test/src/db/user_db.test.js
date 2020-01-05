const assert = require('chai').assert;
const expect = require('chai').expect;

const { UserDBConnector } = require('../../../src/db/user_db');
// user_id = '171782598798999552';
user_id = '171782598798999553';

let user = new UserDBConnector();
describe('UserDB', function() {
    describe('Check if User in Database', function() {
        it('Function should Return User Stats', async function()  {
            let user_id = '171782598798999552';
            let User = await user.get(user_id);
            expect(User).to.be.an('object').that.is.not.empty;
        })
    })
})