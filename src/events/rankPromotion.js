
module.exports = (client) => {
    client.on('rankPromotion', () => {
        console.log("Rank Promoted");
    })
}
