/*
  Shobin David
  Hand Bot
  7/21/2019

  Description: Bot to add moderation, xp, currency, to discord
*/

// Configs and Dependencies
const Discord = require('discord.js');
const { token, giphy_token } = require('./conf/token.json');
const { prefix, server_id, max_lvl } = require('./conf/config.json');
let ranks = require('./conf/ranks.json');
const { UserCommands, UserInfo} = require ('./db');

const GiphyClient  = require('giphy-js-sdk-core')
var giphy = GiphyClient(giphy_token)

const client = new Discord.Client();
var servers = client.guilds; // get all servers
var db_user = new UserCommands();
var db_info = new UserInfo();

client.once('ready', () => {
    console.log('Ready!');
    let keys = Object.keys(ranks);
    for ( let i in keys) {
      console.log(keys[i]);
    }
    console.log(keys);
    var server = getServerInfo(server_id); 
    let users = server.members;
    user_list = users.keyArray()
    setupUsersTable(users, user_list, server_id); 
});

client.on('message', async message => {

    // console.log(message.author.username);
    // console.log(message.author.id);
    
    if (message.content.startsWith('!xp')){
        //console.log(message.channel.name);
        let xp = db_user.getXP(message.author.id, message)
        xp.then(rows=>{
          message.channel.send(`User: ${message.author.username}  XP: ${rows.xp}`);
         
        })
        let giphy_url = giphyMessage("level up")
        giphy_url.then(stuff=>{
          console.log(`STUFFEEE ${stuff.url}`);
        })
        console.log(giphy_url)
        // message.channel.send("", { files: [`${giphy_url}`] })

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

function giphyMessage(query) {
 giphy.search('gifs', { "q": `${query}`, "rating" : "pg-13", "limit" : 100 }).then((response) => {
    let totalResponses = response.data.length;
    var responseIndex = Math.floor((Math.random() * 100) + 1) % totalResponses;
    var finalResponse = response.data[responseIndex];

    url = finalResponse.images.fixed_height.url
    // console.log(url);
    }).catch(() => {
      console.log("Error Finding Gif");
  })


  console.log(`This is a test: ${test}`)

}

// function setupRanks(ranks, max_lvl) {

// }

function setupUsersTable(users, user_list, server) {
    for( let i of user_list ){
      let member = users.get(i)
      let username = member.user.username ;
      let user_id = member.user.id;
      db_info.insertUser(user_id, username, server);
    }
  };


function getServerInfo(server_id){
  return servers.get(server_id);
};

client.login(token);