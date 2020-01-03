var Events = require('events').EventEmitter;
let evt = new Events();

class Event {
    constructor() {
        this.event = evt;
    }

    addEvent(event, listener) {
        // add event to Event Emitter
    }

    raiseEvent(event, listener) {
        // call the event
    }

    removeEvent(event, listener) {
        // remove event
    }

    getListeners(event) {
        // return list of events in event emitter
    }

}

module.exports = {
	Event
};