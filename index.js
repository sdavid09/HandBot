/*
  Shobin David
  Hand Bot
  Description: Bot to add moderation, xp, currency, to discord
*/

// Configs and Dependencies
const Discord = require('discord.js');
const { token } = require('./conf/token.json');
const { prefix, server_id} = require('./conf/config.json');
const { User } = require ('./src/user/base/user');
const giphy= require ('./src/extra/giphy');
const fs = require('fs');

const client = new Discord.Client();
var servers = client.guilds; // get all servers

/* On Bot Startup */
client.once('ready', () => {
    console.log('The HandBot is ready to serve the kingdom!');
    var server = getServerInfo(server_id);
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

/* Helper Functions*/
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

function getServerInfo(server_id){
    return servers.get(server_id);
};

client.login(token);
