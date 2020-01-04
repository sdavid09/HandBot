var Events = require('events').EventEmitter;
let evt = new Events();

const { Event } = require('../base/event');

class LevelEvents extends Event{
    constructor(event) {
        super(event);
    }

    reachedBaseLevel() {
        // get current user
        return false;
    }
}
