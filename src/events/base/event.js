var Events = require('events').EventEmitter;
let evt = new Events();

class Event {
    constructor(event) {
        this.event = event;
    }

    addEvent(name, listener) {
        // add event to Event Emitter
        this.event.on(name, data => {
            // listener();
            console.log(`Added Event: ${this.event}`);
        });
    }

    raiseEvent(name) {
        
        // call the event
        this.event.emit(name);
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