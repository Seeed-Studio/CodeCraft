const VehicleWheel = require('./vehiclewheel');
const Servo = require('./servo');
const Rgbled = require('./rgbled');
const Ultrasonic = require('./ultrasonic');
const Ultrasonicled = require('./ultrasonicled');

const LedMatrix = require('./ledmatrix');
const Loudspeaker = require('./loudspeaker');
const Key = require('./key');
const Light = require('./light');
const Infrared = require('./infrared');
const Linepatrol = require('./linepatrol');
const Noise = require('./noise');

module.exports = {
    vehicleWheel: new VehicleWheel(),
    servo:  new Servo(),
    rgbled: new Rgbled(),
    ultrasonic:  new Ultrasonic(),
    ultrasonicled:  new Ultrasonicled(),
    ledmatrix: new LedMatrix(),
    loudspeaker: new Loudspeaker(),
    key: new Key(),
    light: new Light(),
    infrared: new Infrared(),
    linepatrol: new Linepatrol(),
    noise: new Noise()
}