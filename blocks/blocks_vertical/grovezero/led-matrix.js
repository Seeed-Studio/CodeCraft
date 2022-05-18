'use strict';

goog.provide('Blockly.Blocks.grovezero.ledMatrix');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

//%1 %2 LED 矩阵  x:%3 y:%4 是否被点亮？
Blockly.Blocks['sensing_g0_ledmatrix_xy_is_on'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_LED_MATRIX_XY_IS_ON,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "X"
                },
                {
                    "type": "input_value",
                    "name": "Y"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_looks", "output_boolean"]
        });
    }
};

Blockly.Blocks['looks_g0_ledmatrix_show_shape'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_LED_MATRIX_SHOW_SHAPE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_ledmatrix",
                    "name": "SHAPE",
                    "default": "001000011100001110011100001000"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_g0_ledmatrix_show_string'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_LED_MATRIX_SHOW_STRING,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "STRING"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_g0_ledmatrix_xy_set_on'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_LED_MATRIX_XY_SET_ON,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "X"
                },
                {
                    "type": "input_value",
                    "name": "Y"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_g0_ledmatrix_xy_set_off'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_LED_MATRIX_XY_SET_OFF,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "X"
                },
                {
                    "type": "input_value",
                    "name": "Y"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_g0_ledmatrix_clean'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_LED_MATRIX_CLEAN,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

