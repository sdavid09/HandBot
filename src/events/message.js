const { User } = require ('../user/base/user');
const { message_xp, prefix } = require('../../conf/config.json');
const{server_id} = require('../../conf/config.json')

module.exports = async(client, message ) => {

    if (message.author.bot) return;
    let user = await new User(message.author.id).get();
    if (message.content.startsWith(`${prefix}`)) {
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
    else {
        user.addXP(message_xp); // gives xp to user if message sent in chat
        let promotion = user.checkForRankPromotion();
        if(promotion) {
            let servers = client.guilds;
            let server = servers.get(server_id);
            let server_role = server.roles.find(role=>role.name === user.rank);
            if(server_role) {
                message.member.addRole(server_role).catch(console.error);
                client.emit('rankPromotion', client, message) // call rankPromotion event
            }
        }
        user.save();
    }
}