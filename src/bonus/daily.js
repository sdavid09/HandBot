
const {daily_money_bonus, daily_xp_bonus} = require('../../conf/config.json');
const {DailyBonusDBConnector} = require('../db/daily_bonus');
const {User} = require('../user/base/user')
const cron = require('cron');
let db = new DailyBonusDBConnector();

class DailyBonus {
    runDailyTasks(server) {
        //'0 8 * * *' for Every Day at 8:00 am
        const job = cron.job('0 8 * * *', async () => {
            console.log(`${new Date()}   Running Daily Bonus Job`);
            await db.deleteAllDailyBonusRecords();
            await this.checkAllUsersForBonus(server);
        });
        job.start()
    }
    async giveDailyBonus(user) {
        let user_bonus = await this.checkIfAlreadyLoggedInForDay(user.id);
        if(user_bonus === undefined) {
            await db.addUser(user)
            let date = new Date();
            console.log(`${date}  Daily Bonus Added: ${user.name}`);
            user.addXP(daily_xp_bonus);
            user.updateMoney(daily_money_bonus);
            user.save();
        }
    }

    async checkAllUsersForBonus(server){
        let users = server.members;
        user_list = users.keyArray()
        for( let i of user_list ) {
            let member = users.get(i)
            if (!member.user.bot) {
                if(member.presence.status === "online") {
                    let user = await new User(member.user.id).get();
                    await this.giveDailyBonus(user);
                }
            }
        }
    }
    async checkIfAlreadyLoggedInForDay(id) {
        let user = await db.get(id)
        return user;
    }
}

module.exports = {
	DailyBonus
};