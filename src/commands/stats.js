
const {User} = require('../user/base/user');
const {getUserFromMention} = require('../utils/user_mention');
const Discord = require('discord.js');

module.exports.run = async(client, message, args ) => {
    // check user permission
    let user_to_search_id = message.author.id;
    if(args.length >= 1) {
        let match = getUserFromMention(args[0]);
        if(match) {
            user_to_search_id = match;
        }
    }
    let user = await new User(user_to_search_id).get();
    const statsEmbedMessage = new Discord.RichEmbed()
        .setColor('#ff8400')
        .setTitle(user.name)
        .setDescription(`${user.rank}`)
        .setThumbnail('https://cdn0.iconfinder.com/data/icons/rank-badge/64/rank_badge-13-512.png')
        .addBlankField()
        .addField('**Level**', `_${user.level}_`, true)
        .addField('**Xp**',  `_${user.xp}_`, true)
        .addField('**Money**', `_${user.money}_`, true)
        .setImage('https://cdn1.iconfinder.com/data/icons/profession-avatar-flat/64/Avatar-farmer-peasant-breeder-512.png')
        .setTimestamp()
        message.channel.send(statsEmbedMessage);
}
module.exports.help = async(client, message, args ) => {
    let help = "```Stats:\nDisplays all User Stats\nOptions:\n @<user>\n\tExample: !stats @FormulaLight```"
    message.channel.send(help);
}

module.exports.permission = () => {

}
