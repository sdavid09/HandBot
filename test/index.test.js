const assert = require('chai').assert;
const app = require('../index');

describe('Voice XP Modifier', function() {
    it('Function should be in Range', function(){
        let users =  Math.floor((Math.random() * 100 ) + 1)
        assert.isAbove(app.voiceXPModifier(users), 0, 'Value is above 0');
    })
})