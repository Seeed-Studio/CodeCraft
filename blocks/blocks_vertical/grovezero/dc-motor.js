'use strict';

goog.provide('Blockly.Blocks.grovezero.dcMotor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['motion_g0_dc_motor_trun_power'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_DC_MOTOR_TRUN_POWER,//,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_DC_Motor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "MOTOR_NO",
                    "options": [
                        ['M1', '0x03'],
                        ['M2', '0x02'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "POWER"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_g0_dc_motor_stop'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MOTOR_STOP,//,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_DC_Motor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "MOTOR_NO",
                    "options": [
                        ['M1', '0x03'],
                        ['M2', '0x02'],
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};