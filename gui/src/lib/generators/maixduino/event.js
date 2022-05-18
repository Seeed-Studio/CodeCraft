export default Blockly => {

    Blockly.Maixduino['event_maixduino_whenstartup'] = function (block) {
        var funcName = Blockly.Maixduino.variableDB_.getDistinctName('start_handler_0', Blockly.Variables.NAME_TYPE);
        Blockly.Maixduino.initfuncs_[`@event.${funcName}`] = `${funcName}()`;
        var code = [
            `def ${funcName}():`,
            `    pass`
        ]
        return code.join('\n') + '\n';
    }

    Blockly.Maixduino['event_maixduino_delay'] = function (block) {
        Blockly.Maixduino.definitions_['import_utime'] = 'import utime';
        var unit = block.getFieldValue('UNIT');
        var time = Blockly.Maixduino.valueToCode(block, 'DELAY_TIME', Blockly.Maixduino.ORDER_ATOMIC);
        return `utime.sleep_${unit}s(${time});\n`;
    }

    Blockly.Maixduino['event_maixduino_runtime'] = function (block) {
        Blockly.Maixduino.definitions_['import_utime'] = 'import utime';
        var unit = block.getFieldValue('UNIT');
        return [`utime.ticks_${unit}s()`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['event_maixduino_figure_input'] = function (block) {
        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        var pin = block.getFieldValue('PIN');
        return [`get_gpio_input(${pin})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['event_maixduino_figure_output'] = function (block) {
        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        var pin = block.getFieldValue('PIN');
        var dropdownStat = block.getFieldValue('STAT');
        return `set_gpio_output(${pin}, ${dropdownStat})\n`;
    }

    Blockly.Maixduino['event_maixduino_analog_input'] = function (block) {
        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        Blockly.Maixduino.definitions_['var_ADC'] = 'ADC = Analog_ADC()';
        var pin = block.getFieldValue('PIN');
        return [`ADC.getAnalogAvg(${pin})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['event_maixduino_analog_output'] = function (block) {
        // Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        // var pin = block.getFieldValue('PIN');
        // var num = Blockly.Maixduino.valueToCode(block, 'NUM', Blockly.Maixduino.ORDER_ATOMIC);
        // return `MaixAnalogWrite(${pin}, ${num})\n`;
        return '';
    }

    Blockly.Maixduino['motion_maixduino_camera_take_a_picture'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var fileName = Blockly.Maixduino.valueToCode(block, 'PHOTOFILE', Blockly.Maixduino.ORDER_ATOMIC) || 'image_1';
        return `snapshot(${fileName})\n`;
    }

    Blockly.Maixduino['motion_maixduino_camera_video'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var time = Blockly.Maixduino.valueToCode(block, 'TIME', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var fileName = Blockly.Maixduino.valueToCode(block, 'VIDEOFILE', Blockly.Maixduino.ORDER_ATOMIC) || 'video_1';
        return `take_video(${time}, ${fileName})\n`;
    }


}