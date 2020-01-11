
const {server_id} = require('../../conf/config.json')
const {User} = require('../../src/user/base/user')
// const Discord = require('discord.js');
// const client = new Discord.Client();
// var servers = client.guilds; // get all servers

module.exports = (client)=> {
    console.log('The HandBot is ready to serve the kingdom!');
    let servers = client.guilds
    let server = getServerInfo(servers, server_id);
    let users = server.members;
    user_list = users.keyArray()
    setupUsersTable(users, user_list, server_id);
}

function getServerInfo(servers, server_id){
    return servers.get(server_id);
};

async function setupUsersTable(users, user_list, server) {
    for( let i of user_list ) {
        let member = users.get(i)
        let username = member.user.username ;
        let user_id = member.user.id;
        let user = await new User(user_id).get();
        user.setName(username);
        user.save();
    }
};