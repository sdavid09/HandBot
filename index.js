/*
  Shobin David
  Hand Bot
  7/21/2019

  Description: Bot to add moderation and add xp, currency, to discord
*/
const { UserCommands, UserInfo} = require ('./db');
const Discord = require('discord.js');

const { prefix, token } = require('./config.json');
const client = new Discord.Client();
var servers = client.guilds; // get all servers
var db_user = new UserCommands();
var db_info = new UserInfo();
client.once('ready', () => {
    console.log('Ready!');
    server_id = "578044091292712960"
    var server = getServerInfo(server_id); // CORDES_GONE_WILD : 512092064729792512  Test_SERVER: 578044091292712960
    let users = server.members;
    user_list = users.keyArray()
    setupUsersTable(users, user_list, server_id); 
});

client.on('message', async message => {
    //getUsers();
    // console.log(message.author.username);
    // console.log(message.author.id);
    
    if (message.content.startsWith('!xp')){
        //console.log(message.channel.name);
        let xp = db_user.getXP(message.author.id, message)
        xp.then(rows=>{
          message.channel.send(`User: ${message.author.username}  XP: ${rows.xp}`);
        })

    }
    else {
      db_user.addXP(message.author.id);
    }
   
    // let msg = member.user.lastMessage.createdTimestamp;
    // let joined = member.joinedAt;
    // let joi = member.joinedTimestamp;
    // console.log(member.presence);
    // console.log(joined);
    
    let now = Date.now()

    // console.log(Date(msg));
	  // console.log(now);
    
	  
  
      });


function setupUsersTable(users, user_list, server) {
    // iterates through user list
    // let user = client.users;
    for( let i of user_list ){
      let member = users.get(i)
      let username = member.user.username ;
      let user_id = member.user.id;
      db_info.insertUser(user_id, username, server);
    }
    /* loop through user list */
   
    // Collection/Map of Users
    // console.log(server_list);

    /* loop through server list */
    

    // console.log(username + " " + user_id);
    // console.log(servers.get("512092064729792512"));
    //  user.tap(user => console.log(user.id));
  };


function getServerInfo(server_id){
  return servers.get(server_id);
};

client.login(token);