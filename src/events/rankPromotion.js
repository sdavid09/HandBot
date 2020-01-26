
const{ server_id } = require('../../conf/config.json')
module.exports = async (empty, client, user) => {
    let servers = client.guilds;
    let server = servers.get(server_id);
    let member = server.members.get(user.id)
    let server_role = server.roles.find(role=>role.name === user.rank);
    if(server_role) {
        member.addRole(server_role).catch(console.error);
    }
}
