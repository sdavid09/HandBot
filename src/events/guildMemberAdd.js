
const giphy= require ('../../src/extra/giphy');
const { User } = require ('../user/base/user');
const { server_id } = require('../../conf/config.json')

module.exports = async (client, member) => {
    console.log(`guidMemberAdd  ${member}`);
    // Send the message to a designated channel on a server:
    const channel = client.channels.find(ch => ch.name === 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the Server, ${member}!`);
    let gif_url = await giphy.gifMessage("welcome" ,'pg-13');
    channel.send(`${gif_url}`);
    let user = await new User(member.id).get();
    user.setName(member.user.username);
    await user.save();
    let servers = client.guilds;
    let server = servers.get(server_id);
    let server_role = server.roles.find(role=>role.name === user.rank);
    if (server_role) {
        member.addRole(server_role).catch(console.error);
    }
}
