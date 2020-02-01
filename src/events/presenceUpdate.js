const {DailyBonus} = require('../bonus/daily');
const {User} = require('../user/base/user');

module.exports = async (client, oldMember, newMember) => {
    if(oldMember.presence.status !== newMember.presence.status){
        if(newMember.presence.status === "online") {
            let user = await new User(newMember.id).get();
            let daily_bonus = await new DailyBonus().giveDailyBonus(user);
        }
    }
}
