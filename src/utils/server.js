const {server_id} = require('../../conf/config.json');

function getServer(client) {
    let servers = client.guilds; // get all servers
    return servers.get(server_id);
}
