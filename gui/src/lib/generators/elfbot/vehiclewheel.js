
export default Blockly => {

    Blockly.Elfbot['motion_elfbot_vehiclewheel_run_direction_power'] = function (block) {
        var direction = block.getFieldValue('DIRECTION');
        var power = Blockly.Elfbot.valueToCode(block, 'POWER', Blockly.Elfbot.ORDER_NONE);
        var code = '';
        if ('forward' === direction) {
            code = `elfbot.forward(${power}, 655)`;
        }
        if ('back' === direction) {
            code = `elfbot.backward(${power}, 655)`;
        }
        if ('left' === direction) {
            code = `elfbot.turn_left(${power}, 655)`;
        }
        if ('right' === direction) {
            code = `elfbot.turn_right(${power}, 655)`;
        }
        return `${code}\n`;
    }

    Blockly.Elfbot['motion_elfbot_vehiclewheel_runforword_power_duartion'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var power = Blockly.Elfbot.valueToCode(block, 'POWER', Blockly.Elfbot.ORDER_NONE);
        var duration = Blockly.Elfbot.valueToCode(block, 'DURATION', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.forward(${power}, ${duration})\ntime.sleep(${duration})\n`;
    }

    Blockly.Elfbot['motion_elfbot_vehiclewheel_runbackword_power_duartion'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var power = Blockly.Elfbot.valueToCode(block, 'POWER', Blockly.Elfbot.ORDER_NONE);
        var duration = Blockly.Elfbot.valueToCode(block, 'DURATION', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.backward(${power}, ${duration})\ntime.sleep(${duration})\n`;
    }

    Blockly.Elfbot['motion_elfbot_vehiclewheel_runleft_power_duartion'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var power = Blockly.Elfbot.valueToCode(block, 'POWER', Blockly.Elfbot.ORDER_NONE);
        var duration = Blockly.Elfbot.valueToCode(block, 'DURATION', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.turn_left(${power}, ${duration})\ntime.sleep(${duration})\n`;
    }

    Blockly.Elfbot['motion_elfbot_vehiclewheel_runright_power_duartion'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var power = Blockly.Elfbot.valueToCode(block, 'POWER', Blockly.Elfbot.ORDER_NONE);
        var duration = Blockly.Elfbot.valueToCode(block, 'DURATION', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.turn_right(${power}, ${duration})\ntime.sleep(${duration})\n`;
    }

    Blockly.Elfbot['motion_elfbot_vehiclewheel_run_power'] = function (block) {
        var left = Blockly.Elfbot.valueToCode(block, 'LEFTPOWER', Blockly.Elfbot.ORDER_NONE);
        var right = Blockly.Elfbot.valueToCode(block, 'RIGHTPOWER', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.run(${left}, ${right})\n`;
    }

    Blockly.Elfbot['motion_elfbot_vehiclewheel_run_power'] = function (block) {
        var left = Blockly.Elfbot.valueToCode(block, 'LEFTPOWER', Blockly.Elfbot.ORDER_NONE);
        var right = Blockly.Elfbot.valueToCode(block, 'RIGHTPOWER', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.run(${left}, ${right}, 655)\n`;
    }

    Blockly.Elfbot['motion_elfbot_vehiclewheel_runforword_duration'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var duration = Blockly.Elfbot.valueToCode(block, 'DURATION', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.go_forward(${duration})\ntime.sleep(${duration})\n`;
    }

    Blockly.Elfbot['motion_elfbot_vehiclewheel_runbackword_duration'] = function (block) {
        Blockly.Elfbot.definitions_['import_time'] = 'import time';
        var duration = Blockly.Elfbot.valueToCode(block, 'DURATION', Blockly.Elfbot.ORDER_NONE);
        return `elfbot.go_backward(${duration})\ntime.sleep(${duration})\n`;
    }

    Blockly.Elfbot['motion_elfbot_vehiclewheel_run_stop'] = function (block) {
        return `elfbot.stop()\n`;
    }

}

