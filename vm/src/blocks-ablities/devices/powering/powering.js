

const Event = require('./event');
const Lights = require('./lights');
const Pose = require('./pose');
const Radio = require('./radio');
const Timer = require('./timer');

module.exports = {
    event: new Event(),
    lights: new Lights(),
    pose: new Pose(),
    radio: new Radio(),
    timer: new Timer()
}