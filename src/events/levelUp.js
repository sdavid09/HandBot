
module.exports = (client) => {
    client.on('levelUp', () => {
        console.log("User Level Up");
    })
}
