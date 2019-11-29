class Event {
    constructor(_date, _time, _desc) {
        this.date = _date;
        this.time = _time;
        this.desc = _desc;
        this.eventID = -1;
    }
}

module.exports = Event;
