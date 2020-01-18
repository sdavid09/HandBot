const {ThreeDice} = require('../games/threedice')
const{User} = require('../user/base/user');

module.exports.run = async(client, message, args ) => {
    if(args.length !== 1 ) {
        message.channel.send('Invalid Arguments check help !gamble --help');
        return
    }
    let game = new ThreeDice()
    let user = await new User(message.author.id).get();
    if(user.money >= args[0]) {
        let gamble = game.play(args[0]);
        if(gamble) {
            if ( gamble >= 1) {
                message.channel.send(`${user.name} You Won!`);
                user.updateMoney(gamble)
                user.save();
            }
            else {
                message.channel.send(`${user.name} Sorry You Lost ${args[0]} :(`);
                user.updateMoney(gamble)
                user.save();
            }
        }
        else {
            message.channel.send(`Invalid Arguments Type !gamble --help`);
            return
        }
    }
    else if ( user.money < args[0]) {
        message.channel.send(`Your balance is too low !gamble --help`);
    }
    else {
        message.channel.send(`Invalid argument type`);
    }
}

module.exports.help = async(client, message, args ) => {
    let help = "```Gamble:\nRoll 3 dice and if sum is greater than 13 you win double your bet!  Else you lose :(\nCheck your balance before! \nOptions:\n <amount>\n\tExample: !gamble 25```"
    message.channel.send(help);
}
