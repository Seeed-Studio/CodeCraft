'use strict';

goog.provide('Blockly.Blocks.wioterminal.json');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['json_wioterminal_json_menu'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "BROADCAST_OPTION",
                    "variableTypes": [Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE],
                    "variable": "Object"
                }
            ],
            "extensions": ["colours_wioterminal_json", "output_string"]
        });
    }
};

Blockly.Blocks['json_wioterminal_json_setvalue'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_JSON_SET_VALUE,
            "args0": [
                {
                    "type": "input_value",
                    "name": "KEY"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                },
                {
                    "type": "input_value",
                    "name": "BROADCAST_OPTION"
                },
            ],
            "extensions": ["colours_wioterminal_json", "shape_statement"]
        });
    }
};

Blockly.Blocks['json_wioterminal_json_getvalue'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_JSON_GET_VALUE,
            "args0": [
                {
                    "type": "input_value",
                    "name": "BROADCAST_OPTION"
                },
                {
                    "type": "input_value",
                    "name": "KEY"
                }
            ],
            "extensions": ["colours_wioterminal_json", "output_string"]
        });
    }
};

Blockly.Blocks['json_wioterminal_json_object'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_JSON_STRING,
            "args0": [
                {
                    "type": "input_value",
                    "name": "BROADCAST_OPTION"
                },
            ],
            "extensions": ["colours_wioterminal_json", "output_string"]
        });
    }
};
