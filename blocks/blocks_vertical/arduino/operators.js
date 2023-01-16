'use strict';

goog.provide('Blockly.Blocks.arduino.operators');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['operator_arduino_itoa'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MATH_ITOA_VALUE_MESSAGE0,
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "category": Blockly.Categories.operators,
            "extensions": ["colours_operators", "output_string"]
        });
    }
};


Blockly.Blocks['operator_arduino_map'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_OPERATOR_MAP,
            "args0": [
                {
                    "type": "input_value",
                    "name": "PARAMETER1"
                },
                {
                    "type": "input_value",
                    "name": "PARAMETER2"
                },
                {
                    "type": "input_value",
                    "name": "PARAMETER3"
                }, {
                    "type": "input_value",
                    "name": "PARAMETER4"
                },
                {
                    "type": "input_value",
                    "name": "PARAMETER5"
                }
            ],
            "category": Blockly.Categories.operators,
            "extensions": ["colours_operators", "output_number"]
        });
    }
};