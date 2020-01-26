const { User } = require ('../user/base/user');
const { message_xp, prefix } = require('../../conf/config.json');
const{ server_id, bot_channel } = require('../../conf/config.json')

module.exports = async(client, message ) => {

    if (message.author.bot) return;
    let user = await new User(message.author.id).get();
    if ((message.content.startsWith(`${prefix}`)) && (message.channel.name === bot_channel)) {
        let full_command = message.content.split(" ")
        let cmd = full_command[0].replace(`${prefix}`, ""); // get the command from
        let command = client.commands.get(cmd);
        if(command) {
            // check user permissions
            let args = []
            if(full_command.length > 1) {
                full_command.shift() // remove first element which is command
                args = full_command;
            }
            if(args[0] === "--help" || args[0] === "-h") {
                command.help(client, message, args);
            }
            else {
                command.run(client, message, args);
            }
        }
    }
    else if((message.content.startsWith(`${prefix}`)) && (message.channel.name !== bot_channel)) {
        return;
    }
    else {
        user.addXP(message_xp); // gives xp to user if message sent in chat
        let promotion = await user.checkForRankPromotion();
        if(promotion) {
            client.emit('rankPromotion', client, user) // call rankPromotion event
        }
        user.save();
    }
}