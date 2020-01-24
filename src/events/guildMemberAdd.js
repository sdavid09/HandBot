
const giphy= require ('../../src/extra/giphy');
const { User } = require ('../user/base/user');

module.exports = async (client, member) => {
    // Send the message to a designated channel on a server:
    const channel = client.channels.find(ch => ch.name === 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the Server, ${member}!`);
    let gif_url = await giphy.gifMessage("welcome" ,'pg-13');
    channel.send("", { files: [`${gif_url}`] })
    let user = await new User(member.id).get();
    user.setName(member.user.username);
    user.save();
}
