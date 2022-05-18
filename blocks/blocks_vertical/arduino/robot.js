'use strict';

goog.provide('Blockly.Blocks.arduino.robot');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_arduino_mark_run'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_MARK_ROBOT_RUN,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/shield_bot.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DIR",
                    "options": [
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT1, '1'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT2, '2'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT3, '3'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT4, '4'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT5, '0']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "V",
                    "options": [
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT6, '1'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT7, '2'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT8, '3']
                    ]
                },


            ],
            "extensions": ["colours_arduino_robot_kit", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_mark_motorrun'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_MARK_ROBOT_MOTOR_RUN,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/shield_bot.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "MOTOR",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SPEED"
                }
            ],
            "extensions": ["colours_arduino_robot_kit", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_mark_servorun'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_MARK_ROBOT_SERVO_RUN,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/shield_bot.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "MOTOR",
                    "options": [
                        ['1', '0'],
                        ['2', '1'],
                        ['3', '2'],
                        ['4', '3'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "ANGLE"
                }
            ],
            "extensions": ["colours_arduino_robot_kit", "shape_statement"]
        });
    }
};

// Blockly.Blocks['motion_arduino_mark_stepper_servo_setangle'] = {
//     init: function () {
//         this.jsonInit({
//             "message0": Blockly.Msg.MAIXDUINO_ROBOT_STEPPER_SERVO_SETANGLE,
//             "args0": [
//                 {
//                     "type": "field_image",
//                     "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/shield_bot.svg",
//                     "width": 65,
//                     "height": 30
//                 },
//                 {
//                     "type": "field_vertical_separator"
//                 },
//                 {
//                     "type": "field_dropdown",
//                     "name": "ANGLE",
//                     "options": [
//                         ['1.8', '1.8'],
//                         ['3.6', '3.6'],
//                         ['0.75', '0.75'],
//                         ['1.5', '1.5'],
//                         ['3', '3']
//                     ]
//                 }
//             ],
//             "extensions": ["colours_arduino_robot_kit", "shape_statement"]
//         });
//     }
// };

// Blockly.Blocks['motion_arduino_mark_stepper_servo_setrotatespeed'] = {
//     init: function () {
//         this.jsonInit({
//             "message0": Blockly.Msg.MAIXDUINO_ROBOT_STEPPER_SERVO_SETROTATESPEED,
//             "args0": [
//                 {
//                     "type": "field_image",
//                     "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/shield_bot.svg",
//                     "width": 65,
//                     "height": 30
//                 },
//                 {
//                     "type": "field_vertical_separator"
//                 },
//                 {
//                     "type": "input_value",
//                     "name": "ROTATESPEED"
//                 }
//             ],
//             "extensions": ["colours_arduino_robot_kit", "shape_statement"]
//         });
//     }
// };

// Blockly.Blocks['motion_arduino_mark_stepper_servo_run'] = {
//     init: function () {
//         this.jsonInit({
//             "message0": Blockly.Msg.MAIXDUINO_ROBOT_STEPPER_SERVO_RUN,
//             "args0": [
//                 {
//                     "type": "field_image",
//                     "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/shield_bot.svg",
//                     "width": 65,
//                     "height": 30
//                 },
//                 {
//                     "type": "field_vertical_separator"
//                 },
//                 {
//                     "type": "input_value",
//                     "name": "STEP"
//                 }
//             ],
//             "extensions": ["colours_arduino_robot_kit", "shape_statement"]
//         });
//     }
// };

