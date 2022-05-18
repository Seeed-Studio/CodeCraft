// GPIO 字典映射
const GPIO_DICT = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3]];

/**
 * Convert a hex color (e.g., F00, #03F, #0033FF) to an RGB color object.
 * CC-BY-SA Tim Down:
 * https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 * @param {!string} hex Hex representation of the color.
 * @return {RGBObject} null on failure, or rgb: {r: red [0,255], g: green [0,255], b: blue [0,255]}.
 */
const hexToRgb = (hex) => {
    hex = hex.replace(/\"/g, '');
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

export default Blockly => {

    Blockly.Maixduino['motion_maixduino_mark_run'] = function (block) {
        Blockly.Maixduino.definitions_['import_maix_motor'] = 'from maix_motor import Maix_motor ';
        var action = block.getFieldValue('DIR');
        var scale = block.getFieldValue('V');
        return `Maix_motor.motor_motion(${scale}, ${action}, 0)\n`;
    }

    Blockly.Maixduino['motion_maixduino_mark_stop'] = function (block) {
        Blockly.Maixduino.definitions_['import_maix_motor'] = 'from maix_motor import Maix_motor ';
        return `Maix_motor.motor_run(0, 0, 0)\n`;
    }

    Blockly.Maixduino['motion_maixduino_mark_motorrun'] = function (block) {
        Blockly.Maixduino.definitions_['import_maix_motor'] = 'from maix_motor import Maix_motor ';
        var motor = block.getFieldValue('MOTOR');
        var speed = Blockly.Maixduino.valueToCode(block, 'SPEED', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        if (motor == '1') {
            return `Maix_motor.motor_left(${speed}, 0)\n`;
        } else if (motor == '2') {
            return `Maix_motor.motor_right(${speed}, 0)\n`;
        } else {
            return `Maix_motor.motor_run(0, 0, 0)\n`;
        }
    }

    Blockly.Maixduino['motion_maixduino_mark_servorun'] = function (block) {
        Blockly.Maixduino.definitions_['import_maix_motor'] = 'from maix_motor import Maix_motor ';
        var motor = block.getFieldValue('MOTOR');
        var angle = Blockly.Maixduino.valueToCode(block, 'ANGLE', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `Maix_motor.servo_angle(${motor}, ${angle})\n`;
    }

    Blockly.Maixduino['motion_maixduino_mark_stepper_servo_setangle'] = function (block) {
        Blockly.Maixduino.definitions_['import_maix_motor'] = 'from maix_motor import Maix_motor ';
        var angle = block.getFieldValue('ANGLE');
        return `Maix_motor.drive_set_step(${angle})\n`;
    }

    Blockly.Maixduino['motion_maixduino_mark_stepper_servo_setrotatespeed'] = function (block) {
        Blockly.Maixduino.definitions_['import_maix_motor'] = 'from maix_motor import Maix_motor ';
        var rotatespeed = Blockly.Maixduino.valueToCode(block, 'ROTATESPEED', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `Maix_motor.drive_set_rpm(${rotatespeed})\n`;
    }

    Blockly.Maixduino['motion_maixduino_mark_stepper_servo_run'] = function (block) {
        Blockly.Maixduino.definitions_['import_maix_motor'] = 'from maix_motor import Maix_motor ';
        var step = Blockly.Maixduino.valueToCode(block, 'STEP', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `Maix_motor.drive_run(${step})\n`;
    }

    Blockly.Maixduino['motion_maixduino_mark_stepper_servo_turn'] = function (block) {
        Blockly.Maixduino.definitions_['import_maix_motor'] = 'from maix_motor import Maix_motor ';
        var angle = Blockly.Maixduino.valueToCode(block, 'ANGLE', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var speed = Blockly.Maixduino.valueToCode(block, 'SPEED', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var sensitivity = Blockly.Maixduino.valueToCode(block, 'SENSITIVITY', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `Maix_motor.motor_angle(${angle}, ${speed}, ${sensitivity})\n`;
    }

    Blockly.Maixduino['motion_maixduino_mark_speaker_playnote'] = function (block) {
        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        var note = block.getFieldValue('NOTE');
        var beat = block.getFieldValue('BEAT');
        return `speaker(3, ${note}, ${beat})\n`;
    }

    Blockly.Maixduino['motion_maixduino_mark_speaker_pause'] = function (block) {
        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        var beat = block.getFieldValue('BEAT');
        return `speaker(3, 0, ${beat})\n`;
    }


    Blockly.Maixduino['motion_maixduino_mark_headlights_show'] = function (block) {

        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        Blockly.Maixduino.definitions_['import_ws2812'] = 'from modules import ws2812';
        Blockly.Maixduino.definitions_[`var_led_strip1_13`] = `ws2812_13 = ws2812(3,5,${GPIO_DICT[11][0]},${GPIO_DICT[11][1]})`;

        var light = block.getFieldValue('LIGHT');
        var color = Blockly.Maixduino.valueToCode(block, 'COLOR', Blockly.Maixduino.ORDER_NONE) || "#FFFFFF";
        var {
            r,
            g,
            b
        } = hexToRgb(color);

        if(light=='all'){
            var code =
            `ws2812_13.set_led(1, (${r}, ${g}, ${b}))\n` +
            `ws2812_13.display()\n` +
            `ws2812_13.set_led(0, (${r}, ${g}, ${b}))\n` +
            `ws2812_13.display()\n`;
            return code;
        } else {
            var code =
                `ws2812_13.set_led(${light},(${r}, ${g}, ${b}))\n` +
                `ws2812_13.display()\n`;
            return code;
        }
        
    }

    Blockly.Maixduino['motion_maixduino_mark_taillights_show'] = function (block) {

        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        Blockly.Maixduino.definitions_['import_ws2812'] = 'from modules import ws2812';
        Blockly.Maixduino.definitions_[`var_led_strip1_12`] = `ws2812_12 = ws2812(board_info[12],5,${GPIO_DICT[10][0]},${GPIO_DICT[10][1]})`;

        var light = block.getFieldValue('LIGHT');

        var r = Blockly.Maixduino.valueToCode(block, 'R', Blockly.Maixduino.ORDER_NONE);
        var g = Blockly.Maixduino.valueToCode(block, 'G', Blockly.Maixduino.ORDER_NONE);
        var b = Blockly.Maixduino.valueToCode(block, 'B', Blockly.Maixduino.ORDER_NONE);

        var code =
            `ws2812_12.set_led(${light},(${r}, ${g}, ${b}))\n` +
            `ws2812_12.display()\n`

        return code;
        
    }

    Blockly.Maixduino['motion_maixduino_mark_lights_crushout'] = function (block) {

        Blockly.Maixduino.definitions_['import_gpio'] = 'from gpio import * ';
        Blockly.Maixduino.definitions_['import_ws2812'] = 'from modules import ws2812';
        Blockly.Maixduino.definitions_[`var_led_strip1_13`] = `ws2812_13 = ws2812(3,5,${GPIO_DICT[11][0]},${GPIO_DICT[11][1]})`;

        var light = block.getFieldValue('LIGHT') || '0';

        // 全部熄灭
        if (light == 'all') {
            var code =
                `ws2812_13.set_led(1, (0, 0, 0))\n` +
                `ws2812_13.display()\n` +
                `ws2812_13.set_led(0, (0, 0, 0))\n` +
                `ws2812_13.display()\n`;
            // // 定义led数据
            // Blockly.Maixduino.definitions_[`var_led_strip1_12`] = `ws2812_12 = ws2812(board_info[12],5,${GPIO_DICT[12 - 2][0]},${GPIO_DICT[12 - 2][1]})`;
            // Blockly.Maixduino.definitions_[`var_led_strip1_13`] = `ws2812_13 = ws2812(board_info[13],5,${GPIO_DICT[13 - 2][0]},${GPIO_DICT[13 - 2][1]})`;
            // // 定义生成代码
            // var code =
            //     `for a in range(0,2):\n` +
            //     `    ws2812_12.set_led(a,(0, 0, 0))\n` +
            //     `    ws2812_12.display()\n` +
            //     `for a in range(0,2):\n` +
            //     `    ws2812_13.set_led(a,(0, 0, 0))\n` +
            //     `    ws2812_13.display()\n`
            return code;
        }
        // 局部熄灭
        else {
            // // 数据转化
            // light = parseInt(light);
            // // 定义led数据
            // Blockly.Maixduino.definitions_[`var_led_strip1_${light}`] = `ws2812_${light} = ws2812(board_info[${light}],5,${GPIO_DICT[light - 2][0]},${GPIO_DICT[light - 2][1]})`;
            // // 定义生成代码
            // var code =
            //     `for a in range(0,2):\n` +
            //     `    ws2812_${light}.set_led(a,(0, 0, 0))\n` +
            //     `    ws2812_${light}.display()\n`
            // return code;
            var code =
                `ws2812_13.set_led(${light},(0, 0, 0))\n` +
                `ws2812_13.display()\n`;
            return code;
        }
    }

}