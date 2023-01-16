export default Blockly => {

    Blockly.Powering['sensing_haloboad_facing_up'] = function (block) {
        return [`ring.is_facing_up()`, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['sensing_haloboad_facing_down'] = function (block) {
        return [`ring.is_facing_down()`, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['sensing_haloboad_facing_left'] = function (block) {
        return [`ring.is_facing_left()`, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['sensing_haloboad_facing_right'] = function (block) {
        return [`ring.is_facing_right()`, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['sensing_haloboad_facing_forward'] = function (block) {
        return [`ring.is_facing_forward()`, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['sensing_haloboad_facing_backward'] = function (block) {
        return [`ring.is_facing_backward()`, Blockly.Powering.ORDER_ATOMIC];
    }

    Blockly.Powering['sensing_haloboad_acceleration'] = function (block) {
        var xyz = block.getFieldValue('XYZ');
        var code = `ring.imu.xyz[${xyz}] * 1000`;
        return [xyz == '2' ? `-${code}` : code, Blockly.Powering.ORDER_ATOMIC];
    }
}