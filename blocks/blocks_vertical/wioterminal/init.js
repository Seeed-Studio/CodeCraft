'use strict';

goog.provide('Blockly.Blocks.wioterminal.init');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['motion_wioterminal_setup_loop'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_SETUP,
            "message1": "%1",
            "message2": Blockly.Msg.GROVE_JOINT_SETUP_LOOP,
            "message3": "%1",
            "args1": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK1"
                }
            ],
            "args3": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK2"
                }
            ],
            "extensions": ["colours_wioterminal_init", "shape_hat"]
        });
    }
};