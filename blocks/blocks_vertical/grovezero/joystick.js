'use strict';

goog.provide('Blockly.Blocks.grovezero.joystick');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sensing_g0_joystick_is_pushed_to'] = {
    // 摇杆推向【左上】?
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_JOYSTICK_IS_PUSHED_TO,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Joystick_pin@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0x31'],
                        ['2', '0x3a'],
                        ['3', '0x3b'],
                        ['4', '0x3c'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "DIRECT",
                    "options": [
                        ['↖'+Blockly.Msg.GROVEZERO_JOYSTICK_IS_PUSHED_TO_OPT0, '1'],
                        ['↑'+Blockly.Msg.GROVEZERO_JOYSTICK_IS_PUSHED_TO_OPT1, '2'],
                        ['↗'+Blockly.Msg.GROVEZERO_JOYSTICK_IS_PUSHED_TO_OPT2, '3'],
                        ['←'+Blockly.Msg.GROVEZERO_JOYSTICK_IS_PUSHED_TO_OPT3, '4'],
                        ['⊙'+Blockly.Msg.GROVEZERO_JOYSTICK_IS_PUSHED_TO_OPT4, '5'],
                        ['→'+Blockly.Msg.GROVEZERO_JOYSTICK_IS_PUSHED_TO_OPT5, '6'],
                        ['↙'+Blockly.Msg.GROVEZERO_JOYSTICK_IS_PUSHED_TO_OPT6, '7'],
                        ['↓'+Blockly.Msg.GROVEZERO_JOYSTICK_IS_PUSHED_TO_OPT7, '8'],
                        ['↘'+Blockly.Msg.GROVEZERO_JOYSTICK_IS_PUSHED_TO_OPT8, '9'],
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};

Blockly.Blocks['sensing_g0_joystick_get_position'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_JOYSTICK_GET_POSITION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Joystick_pin@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0x31'],
                        ['2', '0x3a'],
                        ['3', '0x3b'],
                        ['4', '0x3c'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "DIRECT",
                    "options": [
                        ['x', 'x'],
                        ['y', 'y'],
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};