// const Cast = require('../util/cast');

class ArduinoBlocks {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getHats() {
        return {
            // event_g0_twin_button_when_click: {
            //     restartExistingThreads: true
            // },
            
        }
    }

    getPrimitives() {
        return {
            sensing_arduino_get_value: this.arduinoGetValue,
        };
    }

    
    arduinoGetValue(args) {
        let BROADCAST_OPTION = args.BROADCAST_OPTION;
        return this.runtime.ioDevices.arduino.getValue(BROADCAST_OPTION.id);
    }

}

module.exports = ArduinoBlocks;
