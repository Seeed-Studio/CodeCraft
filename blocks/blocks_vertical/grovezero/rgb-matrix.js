'use strict';

goog.provide('Blockly.Blocks.grovezero.rgbMatrix');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['looks_g0_rgb_matrix_show_shape'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_SHAPE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
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
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "field_rgbmatrix",
                    "name": "SHAPE",
                    "default": ""
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};


Blockly.Blocks['looks_g0_rgb_matrix_show_string'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_STRING,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
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
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "STRING"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT1, '0x00'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT2, '0x12'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT3, '0x18'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT4, '0x52'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT5, '0x7f'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT6, '0xaa'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT7, '0xc5'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT8, '0xdc'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT9, '0xfe']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_g0_rgb_matrix_show_anima'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_ANIMA,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
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
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "ANIMA",
                    "options": [
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT1, '1'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT2, '2'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT3, '3'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT4, '4'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT5, '5'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT6, '6'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT7, '7'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT8, '8'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT9, '9']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};


Blockly.Blocks['looks_g0_rgb_matrix_show_histogram'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_HISTOGRAM,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
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
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_g0_rgb_matrix_xy_set_on'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
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
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "X"
                },
                {
                    "type": "input_value",
                    "name": "Y"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT1, '0x00'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT2, '0x12'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT3, '0x18'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT4, '0x52'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT5, '0x7f'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT6, '0xaa'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT7, '0xc5'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT8, '0xdc'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT9, '0xfe']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_g0_rgb_matrix_xy_set_off'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_OFF,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
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
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
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


Blockly.Blocks['looks_g0_rgb_matrix_xy_set_on_off'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OFF,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
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
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "X"
                },
                {
                    "type": "input_value",
                    "name": "Y"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT1, '0x00'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT2, '0x12'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT3, '0x18'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT4, '0x52'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT5, '0x7f'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT6, '0xaa'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT7, '0xc5'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT8, '0xdc'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT9, '0xfe']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_g0_rgb_matrix_xy_is_on'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_IS_ON,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
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
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
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

Blockly.Blocks['sensing_g0_rgb_matrix_clean'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_CLEAN,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
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
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_g0_rgb_matrix_xy_get_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_GET_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
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
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
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
            "extensions": ["colours_looks", "output_number"]
        });
    }
};