

module.exports.run = async(client, message, args ) => {
let commands = "```Commands:\n!xp -- displays user xp\n!stats -- displays user stats:\n\tOptions: <cmd> --help```"
    message.channel.send(commands);
}
module.exports.help = async(client, message, args ) => {

}