export default Blockly => {

    Blockly.Microbit['sensing_microbit_pin_connected'] = function (block) {
        var pin = block.getFieldValue('PIN');
        return [`pin${pin}.is_touched()`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_pin_analogquantity'] = function (block) {
        var pin = block.getFieldValue('PIN');
        return [`pin${pin}.read_analog()`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_pin_set_analogquantity'] = function (block) {
        var pin = block.getFieldValue('PIN');
        var analogquantity = Blockly.Microbit.valueToCode(block, 'ANALOGQUANTITY', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `pin${pin}.write_analog(${analogquantity})\n`;
    }

    Blockly.Microbit['sensing_microbit_pin_number_input'] = function (block) {
        var pin = block.getFieldValue('PIN');
        return [`pin${pin}.read_digital()`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_pin_analog_read'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitMaker.py');
        var pin = block.getFieldValue('PIN');
        return [`read_Ain(${pin})`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_pin_analog_map_to'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitMaker.py');
        var pin = block.getFieldValue('PIN');
        var low = Blockly.Microbit.valueToCode(block, 'LOW', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var high = Blockly.Microbit.valueToCode(block, 'HIGH', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return [`convert_Ain(${pin},${low},${high})`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_pin_analog_write'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitMaker.py');
        var pin = block.getFieldValue('PIN');
        var num = Blockly.Microbit.valueToCode(block, 'NUM', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `write_analog(${pin},${num})\n`
    }

    Blockly.Microbit['sensing_microbit_pin_analog_set_period'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitMaker.py');
        var pin = block.getFieldValue('PIN');
        var us = Blockly.Microbit.valueToCode(block, 'US', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `config_PWM(${pin},${us})\n`
    }

    Blockly.Microbit['sensing_microbit_pin_digital_read'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitMaker.py');
        var pin = block.getFieldValue('PIN');
        return [`read_Din_value(${pin})`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_pin_digital_is'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitMaker.py');
        var pin = block.getFieldValue('PIN');
        var opt = block.getFieldValue('OPT');
        return [`read_Din(${pin},${opt})`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_pin_digital_set_to'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitMaker.py');
        var pin = block.getFieldValue('PIN');
        var opt = block.getFieldValue('OPT');
        return `set_Dout(${pin},${opt})\n`
    }

    Blockly.Microbit['sensing_microbit_pin_i2c_read'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitMaker.py');
        var format = block.getFieldValue('FORMAT');
        var repeat = block.getFieldValue('REPEAT');
        var i2c = Blockly.Microbit.valueToCode(block, 'I2C', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return [`read_i2c(${i2c},${format},${repeat})`, Blockly.Microbit.ORDER_ATOMIC];
    }

    Blockly.Microbit['sensing_microbit_pin_i2c_write'] = function (block) {
        Blockly.Microbit.definitions_['import_microbit'] = 'import microbit';
        Blockly.Microbit.definitions_['import_neopixel'] = 'import neopixel';
        Blockly.Microbit.importFile('BitMaker.py');
        var format = block.getFieldValue('FORMAT');
        var repeat = block.getFieldValue('REPEAT');
        var value = Blockly.Microbit.valueToCode(block, 'VALUE', Blockly.Microbit.ORDER_ATOMIC) || 0;
        var i2c = Blockly.Microbit.valueToCode(block, 'I2C', Blockly.Microbit.ORDER_ATOMIC) || 0;
        return `wirte_i2c(${i2c},${value},${format},${repeat})\n`
    }


}