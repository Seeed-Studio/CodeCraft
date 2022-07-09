export default (Blockly) => {
    function digitalWriteFor5(block) {
        Blockly.Arduino.setups_['setup_output_5'] = 'pinMode(5, OUTPUT);';
        var level = block.getFieldValue('LEVEL');
        return `digitalWrite(5, ${level});\n`;
    }
    // LED驱动板  LED driver board
    Blockly.Arduino['motion_grovejoint_led_driver_board'] = digitalWriteFor5;
    Blockly.Arduino['motion_grovejoint_buzzer'] = digitalWriteFor5;
    Blockly.Arduino['motion_grovejoint_motor'] = digitalWriteFor5;
    Blockly.Arduino['motion_grovejoint_dc_motor'] = digitalWriteFor5;


    // 迷你电机驱动板  Mini motor drive
    Blockly.Arduino['motion_grovejoint_mini_motor_drive'] = function (block) {
        Blockly.Arduino.definitions_['include_mini_i2c_motor_driver'] = '#include "Seeed_MiniI2CMotorDriver.h"';
        Blockly.Arduino.definitions_['var_mini_i2c_motor_driver_5'] = `MiniI2CMotorDriver miniI2CMotorDriver_5(5, 6);`;
        var motor = block.getFieldValue('MOTOR');
        var power = Blockly.Arduino.valueToCode(block, 'POWER', Blockly.Arduino.ORDER_ATOMIC);
        return `miniI2CMotorDriver_5.Driver(${motor}, ${power});\n`;
    }

    // 四位数码显示管  Four digit display tube
    Blockly.Arduino['motion_grovejoint_four_digit_display_tube'] = function (block) {
        Blockly.Arduino.definitions_['include_tm1637'] = '#include "TM1637.h"';
        Blockly.Arduino.definitions_['var_tm1637_5'] = `TM1637 tm1637_5;`;
        var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
        return `tm1637_5.DigitDisplayWrite(5, 6, ${value});\n`;
    }

    // 扬声器  Speaker
    Blockly.Arduino['motion_grovejoint_speaker_note_beat'] = function (block) {
        Blockly.Arduino.definitions_['include_speaker'] = '#include "Speaker.h"';
        Blockly.Arduino.definitions_['var_speaker_5'] = `grove_speaker_g speaker_5;`;
        var orvr = block.getFieldValue('ORVR');
        return `speaker_5.SpeakerWrite(5, ${orvr});\n`;
    }

    // 舵机  Servo
    Blockly.Arduino['motion_grovejoint_servo_turn_angle'] = function (block) {
        Blockly.Arduino.definitions_['include_servo'] = '#include "Servo.h"';
        Blockly.Arduino.definitions_['var_servo_5'] = `Servo servo_5;`;
        Blockly.Arduino.setups_['setup_servo_5'] = 'servo_5.attach(5);';
        var angle = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_ATOMIC);
        return `servo_5.write(${angle});\n`;
    }

    // 全彩rgb  Full color LED
    Blockly.Arduino['motion_grovejoint_full_color_led'] = function (block) {
        Blockly.Arduino.definitions_['include_chainable_led'] = '#include "ChainableLED.h"';
        Blockly.Arduino.definitions_['var_chainable_led_5'] = `ChainableLED chainable_led_5;`;
        var red = Blockly.Arduino.valueToCode(block, 'RED', Blockly.Arduino.ORDER_ATOMIC);
        var green = Blockly.Arduino.valueToCode(block, 'GREEN', Blockly.Arduino.ORDER_ATOMIC);
        var blue = Blockly.Arduino.valueToCode(block, 'BLUE', Blockly.Arduino.ORDER_ATOMIC);
        return `chainable_led_5.ChainableRGBLEDWrite(5, 6, 1, ${red}, ${green}, ${blue});\n`;
    }
}