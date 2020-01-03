/*
  Shobin David
  Hand Bot
  7/21/2019

  Description: Bot to add moderation, xp, currency, to discord
*/

// Configs and Dependencies
const Discord = require('discord.js');
const { token, giphy_token } = require('./conf/token.json');
const { prefix, server_id, max_lvl, message_xp, voice_xp } = require('./conf/config.json');
const { User } = require ('./src/user');
const GiphyClient  = require('giphy-js-sdk-core')
var giphy = GiphyClient(giphy_token)

const client = new Discord.Client();
let user = new User();
var servers = client.guilds; // get all servers

/* On Bot Startup */
client.once('ready', () => {
    console.log('The HandBot is ready to serve the kingdom!');
    // console.log(client.channels);
    var server = getServerInfo(server_id); 
    // const channels = server.channels.filter(ch => ch.type === 'voice');
    // getVoiceChannels(channels.array());
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
  user.addUserToDB(member.id, member.user.username, server_id);
});

/* When User Messages on server*/
client.on('message', async message => {
    if (message.content.startsWith('!xp')){
        let xp = await user.getXP(message.author.id);
        message.channel.send(`User: ${message.author.username}  XP: ${xp.xp}`);
    }
    // Display User Rank
    else if (message.content.startsWith('!stats')){
      let user_stats = await user.getAllUserStats(message.author.id)
      const statsEmbedMessage = new Discord.RichEmbed()
      .setColor('#ff8400')
      .setTitle(message.author.username)
      .setDescription(`${user_stats.rank}`)
      .setThumbnail('https://cdn0.iconfinder.com/data/icons/rank-badge/64/rank_badge-13-512.png')
      .addBlankField()
      .addField('**Level**', `_${user_stats.level}_`, true)
      .addField('**Xp**',  `_${user_stats.xp}_`, true)
      .addField('**Money**', `_${user_stats.money}_`, true)
      .setImage('https://cdn1.iconfinder.com/data/icons/profession-avatar-flat/64/Avatar-farmer-peasant-breeder-512.png')
      .setTimestamp()
      message.channel.send(statsEmbedMessage);
    }
    else {
      user.addXP(message_xp, message.author.id);
    }
});

/* When User Joins a Voice Channel */
client.on('voiceStateUpdate', (oldMember, newMember) => {

  let oldUserChannel = oldMember.voiceChannel;
  let newUserChannel = newMember.voiceChannel;
  
  if(oldUserChannel === undefined && newUserChannel !== undefined) {

     // User Joins a voice channel
     let users_in_channel = newUserChannel.members.keyArray().length;
     user.addXP(voice_xp * ( 1 + ( users_in_channel / 100 )), newMember.id)

  } else if(newUserChannel === undefined){

    // User leaves a voice channel
    console.log("Somoeone left a voice channel");
  }
})

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

function setupUsersTable(users, user_list, server) {
    for( let i of user_list ){
      let member = users.get(i)
      let username = member.user.username ;
      let user_id = member.user.id;
      user.addUserToDB(user_id, username, server);
    }
  };

function getServerInfo(server_id){
  return servers.get(server_id);
};

function getVoiceChannels(channels) {
  for( let channel of channels) {
    if (channel.members.array().length > 0) {
      let users_in_voice = channel.members.keyArray(); // keys are user id 
      // console.log(users_in_voice);
    }
  }
}

client.login(token);