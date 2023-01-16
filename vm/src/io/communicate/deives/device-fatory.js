/*------------Arduino 系列设备-------------*/
const ArdunioUno = require('./arduino/arduino-uno');
const ArdunioLotusv = require('./arduino/arduino-lotusv');
const ArduinoMega = require('./arduino/arduino-mega');
const ArdunioGroveJoint = require('./arduino/arduino-grovejoint');
const ArdunioOpenCat = require('./arduino/arduino-opencat');
const ArdunioWioTerminal = require('./arduino/arduino-wioterminal');

/*------------Arduino 系列设备-------------*/

/*------------Dongle 系列设备-------------*/
const Dongle = require('./dongles/dongle');

/*------------普通设备-------------*/
const Device = require('./device');

const {
    CMC_DEVICE_UNKNOWN,
    CMC_DEVICE_ARDUINO,
    CMC_DEVICE_ARDUINO_MEGA,
    CMC_DEVICE_ARDUINO_LOTUSV,
    CMC_DEVICE_GROVE_JOINS,
    CMC_DEVICE_OPENCAT,
    CMC_DEVICE_WIO_TERMINAL,
    CMC_DEVICE_DONGLE,
    CMC_DEVICE_GROVEZERO,
    CMC_DEVICE_MPYTHON,
    CMC_DEVICE_MAIXDUINO,
    CMC_DEVICE_POWERING
} = require('./device-filter');
const {
    buildPythonDevice
} = require('../deives/micropython/chMicroPythonBuilder');

/**
 * createDevice
 * @param {*} context 
 * @param {*} type 
 */
const createDevice = (context, type = CMC_DEVICE_UNKNOWN) => {
    switch (type) {
        case CMC_DEVICE_ARDUINO:
            return new ArdunioUno(context);
        case CMC_DEVICE_ARDUINO_LOTUSV:
            return new ArdunioLotusv(context);
        case CMC_DEVICE_ARDUINO_MEGA:
            return new ArduinoMega(context);
        case CMC_DEVICE_GROVE_JOINS:
            return new ArdunioGroveJoint(context);
        case CMC_DEVICE_OPENCAT:
            return new ArdunioOpenCat(context);
        case CMC_DEVICE_WIO_TERMINAL:
            return new ArdunioWioTerminal(context);
        case CMC_DEVICE_GROVEZERO:
        case CMC_DEVICE_DONGLE:
            return new Dongle(context);
        case CMC_DEVICE_MPYTHON:
        case CMC_DEVICE_MAIXDUINO:
        case CMC_DEVICE_POWERING:
            return buildPythonDevice(context, type);
        case CMC_DEVICE_UNKNOWN:
            return new Device(context);
    }
}

module.exports = {
    createDevice
};



