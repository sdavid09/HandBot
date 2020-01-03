
const { Event } = require('../base/event');

class LevelEvents extends Event{
    constructor() {
        super();
    }

    reachedBaseLevel() {
        // get current user
        return false;
    }
}
