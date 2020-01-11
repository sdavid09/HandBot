const { User } = require ('../user/base/user');
const { message_xp } = require('../../conf/config.json');
const Discord = require('discord.js');

module.exports = async(client, message ) => {

        let user = await new User(message.author.id).get();
        if (message.content.startsWith('!xp')){
            message.channel.send(`User: ${message.author.username}  XP: ${user.xp}`);
        }
        // Display User Rank
        else if (message.content.startsWith('!stats')) {
            const statsEmbedMessage = new Discord.RichEmbed()
            .setColor('#ff8400')
            .setTitle(message.author.username)
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
        else {
            user.addXP(message_xp);
        }
        user.save();

}