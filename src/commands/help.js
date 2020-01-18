

module.exports.run = async(client, message, args ) => {
    let commands = "```Commands:\n\
    !xp    -- displays user xp\n\
    !money -- display user money\n\
    !stats -- displays alluser stats\
    \n--------------------------\n\
    *Options*: <cmd> --help```\
    "
    message.channel.send(commands);
}
module.exports.help = async(client, message, args ) => {

}