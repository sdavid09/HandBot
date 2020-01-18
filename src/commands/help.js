

module.exports.run = async(client, message, args ) => {
    let commands = "```Commands:\n\
    !help -- displays all commands\n\
    !xp -- displays user xp\n\
    !money -- display user money\n\
    !stats -- displays all user stats\n\
    !gamble <value> -- Try your luck to gamble your money, or lose!\n\
    \n--------------------------\n\
    *Options*: <cmd> [--help][-h] ```\
    "
    message.channel.send(commands);
}
module.exports.help = async(client, message, args ) => {

}