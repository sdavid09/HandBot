/*
  Shobin David
  Hand Bot
  7/21/2019

  Description: Bot to add moderation, xp, currency, to discord
*/

// Configs and Dependencies
const Discord = require('discord.js');
const { token, giphy_token } = require('./conf/token.json');
const { prefix, server_id, max_lvl, message_xp } = require('./conf/config.json');
const { UserCommands, UserInfo } = require ('./src/db');
const { Rank } = require ('./src/rank');
const GiphyClient  = require('giphy-js-sdk-core')
var giphy = GiphyClient(giphy_token)

const client = new Discord.Client();
var servers = client.guilds; // get all servers
var db_user = new UserCommands();
var db_info = new UserInfo();
let ranks = new Rank();

/* On Bot Startup */
client.once('ready', () => {
    console.log('The HandBot is ready to serve the kingdom!');
    ranks.getAllRanks();
    var server = getServerInfo(server_id); 
    let users = server.members;
    user_list = users.keyArray()
    setupUsersTable(users, user_list, server_id); 
});

/* When User Joins The Server*/
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the Server, ${member}!`);
  giphyMessage("welcome" ,'pg-13')
  .then(url=>{
    channel.send("", { files: [`${url}`] })
  })
  .catch ( error => {
    console.log(error);
  })
  // Add user to Database
  db_info.insertUser(member.id, member.user.username, server_id);
});

/* When User Messages on server*/
client.on('message', async message => {
    if (message.content.startsWith('!xp')){
        db_user.getXP(message.author.id, message)
        .then(rows=>{
          message.channel.send(`User: ${message.author.username}  XP: ${rows.xp}`);
        })
        .catch ( error => {
          console.log(error);
        })
    }
    // Display User Rank
    else if (message.content.startsWith('!stats')){
      db_user.getAllStats(message.author.id)
      .then(rows=>{
        const exampleEmbed = new Discord.RichEmbed()
        .setColor('#ff8400')
        .setTitle(message.author.username)
        .setDescription(`${rows.rank}`)
        .setThumbnail('https://cdn0.iconfinder.com/data/icons/rank-badge/64/rank_badge-13-512.png')
        .addBlankField()
        .addField('**Level**', `_${rows.level}_`, true)
        .addField('**Xp**',  `_${rows.xp}_`, true)
        .addField('**Money**', `_${rows.money}_`, true)
        .setImage('https://cdn1.iconfinder.com/data/icons/profession-avatar-flat/64/Avatar-farmer-peasant-breeder-512.png')
        .setTimestamp()
        message.channel.send(exampleEmbed);
      })
      .catch ( error=> {
        console.log(error);
      })
    }
    else {
      db_user.addXP(message_xp, message.author.id);
    }
});

/* User Ranks Up*/
    // New Rank
    // giphyMessage("promoted" ,'pg-13')
    // .then(url=>{
    //   message.channel.send("", { files: [`${url}`] })
    // })
    // .catch ( error => {
    //   console.log(error);
    // })


/* Helper Functions*/
function giphyMessage(query, rating) {
    return new Promise ( (resolve, reject ) => {
        giphy.search('gifs', { "q": `${query}`, "rating" : `${rating}`, "limit" : 100 }).then((response) => {
        let random_selection_index = Math.floor((Math.random() * response.data.length ) + 1)
        resolve( response.data[random_selection_index].images.fixed_height.url); 
        }).catch(() => {
          reject("Error Finding Gif");
      })
    })
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