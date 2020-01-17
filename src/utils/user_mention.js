// return user when someone mentions user in chat with @<name>
let regex = new RegExp('\<\@\!(.*)\>')
function getUserFromMention(value) {
    let match = value.match(regex)
    if (match) {
        return match[1];
    }
    else {
        return;
    }
}

module.exports = {
    getUserFromMention
}