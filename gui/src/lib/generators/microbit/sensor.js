export default Blockly => {

    Blockly.Microbit['sensing_microbit_sensor_buttonpressed'] = function (block) {
        var key = block.getFieldValue('KEY');
        return [`button_${key}.is_pressed()`, Blockly.Microbit.ORDER_ATOMIC];

    }

    Blockly.Microbit['sensing_microbit_sensor_gestureis'] = function (block) {
        var gesture = block.getFieldValue('GESTURE');
        return [`accelerometer.is_gesture('${gesture}')`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_sensor_acceleration'] = function (block) {
        var asix = block.getFieldValue('ASIX');
        return [`accelerometer.get_${asix}()`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_sensor_compassangle'] = function (block) {
        return [`compass.heading()`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_sensor_compassmagneticdensity'] = function (block) {
        return [`compass.get_field_strength()`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_sensor_calibratecompass'] = function (block) {
        return `compass.calibrate()\n`;
    }

    Blockly.Microbit['sensing_microbit_sensor_temperature'] = function (block) {
        return [`temperature()`, Blockly.Microbit.ORDER_ATOMIC];
    }
    
    Blockly.Microbit['sensing_microbit_sensor_runningtime'] = function (block) {
        return [`running_time()`, Blockly.Microbit.ORDER_ATOMIC];
    }

}