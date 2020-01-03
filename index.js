/*
  Shobin David
  Hand Bot
  7/21/2019

  Description: Bot to add moderation, xp, currency, to discord
*/

// Configs and Dependencies
const Discord = require('discord.js');
const { token } = require('./conf/token.json');
const { prefix, server_id, max_lvl, message_xp, voice_xp } = require('./conf/config.json');
const { User } = require ('./src/user/base/user');
const gifMessage = require ('./src/extra/giphy');

const client = new Discord.Client();
let user = new User();
var servers = client.guilds; // get all servers

/* On Bot Startup */
client.once('ready', () => {
    console.log('The HandBot is ready to serve the kingdom!');
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
  gifMessage("welcome" ,'pg-13')
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
    else if (message.content.startsWith('!stats')) {
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
        user.addXP(100, newMember.id)

  } else if(newUserChannel === undefined){

    // User leaves a voice channel
  }
})

/* Helper Functions*/

function setupUsersTable(users, user_list, server) {
    for( let i of user_list ) {
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
    }
  }
}

client.login(token);
