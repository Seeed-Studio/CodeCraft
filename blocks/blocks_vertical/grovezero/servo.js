'use strict';

goog.provide('Blockly.Blocks.grovezero.servo');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['motion_g0_servo_turn_angle'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_SERVO_TURN_ANGLE,//
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Servo@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "ANGLE"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_motion", "shape_statement"]
        });
    }
};