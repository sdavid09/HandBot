/*
  Shobin David
  Hand Bot
  Description: Bot to add moderation, xp, currency, to discord
*/

// Configs and Dependencies
const Discord = require('discord.js');
const { token } = require('./conf/token.json');
const {server_id} = require('./conf/config.json');
const { User } = require ('./src/user/base/user');
const { Rank } = require ('./src/user/rank/rank');
const giphy= require ('./src/extra/giphy');
const fs = require('fs');

const client = new Discord.Client();
var servers = client.guilds; // get all servers

/* On Bot Startup */
client.once('ready', () => {
    console.log('The HandBot is ready to serve the kingdom!');
    let server = getServerInfo(server_id); // returns guild
    let users = server.members;
    user_list = users.keyArray()
    setupUsersTable(users, user_list, server_id);

});

// Load all Additional Events in events folder
fs.readdir('./src/events/' , (err, files)=>{
    if(err) {
        return console.log(err)
    }

    files.forEach(file=>{
        let event = require(`./src/events/${file}`);
        let event_name = file.split('.')[0];
        client.on(event_name, event.bind(null, client));
    });
});

client.commands = new Map();
// Load Commands
fs.readdir('./src/commands/' , (err, files)=>{
    if(err) {
        return console.log(err)
    }

    files.forEach(file=>{
        let command = require(`./src/commands/${file}`);
        let command_name = file.split('.')[0];
        client.commands.set(command_name, command)
    });
});

/* Helper Functions*/
function addUserToRole(member, user) {
    // takes a guild member and gives default role
    let server = getServerInfo(server_id); // returns guild
    let user_role = user.rank;
    let server_role = server.roles.find(role=>role.name === user.rank);
    if(server_role) {
        member.addRole(server_role).catch(console.error);
    }
    else {
        console.log(`${server_role} Role not setup on server!`);
    }
}

async function setupUsersTable(users, user_list, server) {
    for( let i of user_list ) {
        let member = users.get(i)
        let username = member.user.username ;
        let user_id = member.user.id;
        let user = await new User(user_id).get();
        addUserToRole(member, user);
    }
  };

function getServerInfo(server_id){
    return servers.get(server_id);
};


client.login(token);
