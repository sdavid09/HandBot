const GiphyClient  = require('giphy-js-sdk-core')
const { giphy_token } = require('../../conf/token.json');
var giphy = GiphyClient(giphy_token)

function gifMessage(query, rating) {
    return new Promise ( (resolve, reject ) => {
        giphy.search('gifs', { "q": `${query}`, "rating" : `${rating}`, "limit" : 100 }).then((response) => {
        let random_selection_index = Math.floor((Math.random() * response.data.length ) + 1)
        resolve( response.data[random_selection_index].images.fixed_height.url); 
        }).catch(() => {
          reject("Error Finding Gif");
      })
    })
}


module.exports = {
	gifMessage
};