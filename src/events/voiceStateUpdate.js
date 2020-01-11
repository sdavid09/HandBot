const { User } = require ('../user/base/user');

module.exports = async (oldMember, newMember) => {
    let user = await new User(newMember.id).get();
    let oldUserChannel = oldMember.voiceChannel;
    let newUserChannel = newMember.voiceChannel;

    if(oldUserChannel === undefined && newUserChannel !== undefined) {
         // User Joins a voice channel
        let users_in_channel = newUserChannel.members.keyArray().length;
        // Todo: calulate how long in channel for xp modifier
        user.addXP(100);
        user.save();
    }
    else if(newUserChannel === undefined) {

        // User leaves a voice channel
    }
}
