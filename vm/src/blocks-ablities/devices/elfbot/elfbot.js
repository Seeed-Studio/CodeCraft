const VehicleWheel = require('./vehiclewheel');
const Servo = require('./servo');
const Rgbled = require('./rgbled');
const Ultrasonic = require('./ultrasonic');
const Ultrasonicled = require('./ultrasonicled');
const LedMatrix = require('./ledmatrix');
const Loudspeaker = require('./loudspeaker');
const Key = require('./key');
const Light = require('./light');
const Infrared = require('./infrared')
const Noise = require('./noise')
const Linepatrol = require('./linepatrol')


module.exports = {
    vehicleWheel: new VehicleWheel(),
    servo: new Servo(),
    rgbled: new Rgbled(),
    ultrasonic: new Ultrasonic(),
    ultrasonicled: new Ultrasonicled(),
    ledmatrix: new LedMatrix(),
    loudspeaker: new Loudspeaker(),
    key: new Key(),
    light: new Light(),
    infrared: new Infrared(),
    noise: new Noise(),
    linepatrol: new Linepatrol()
}