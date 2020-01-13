
const {User} = require('../user/base/user');
const {getUserFromMention} = require('../utils/user_mention');
module.exports.run = async(client, message, args ) => {
    let user_to_search_id = message.author.id;
    if(args.length >= 1) {
        let match = getUserFromMention(args[0]);
        if(match) {
            user_to_search_id = match;
        }
    }
    let user = await new User(user_to_search_id).get();
    message.channel.send(`User: ${user.name }  XP: ${user.xp}`);
}
module.exports.help = async(client, message, args ) => {
    let help = "```XP:\nCommand Displays User XP\nOptions:\n @<user>\n\tExample: !xp @FormulaLight```"
    message.channel.send(help);
}