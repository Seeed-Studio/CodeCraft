'use strict';

goog.provide('Blockly.Blocks.microbit.show');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['looks_microbit_showimage'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_SHOW_IMAGE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_micbtmatrix",
                    "name": "SHAPE",
                    "default": "0101011111111110111000100"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_microbit_show", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_microbit_showimage_for'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_SHOW_IMAGEFOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_micbtmatrix",
                    "name": "SHAPE",
                    "default": "0101011111111110111000100"
                },
                {
                    "name":"SECS",
                    "type":"input_value"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_microbit_show", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_microbit_showmirroringimage'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_SHOW_MIRRORING_IMAGE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_micbtmatrix",
                    "name": "SHAPE",
                    "default": "0101011111111110111000100"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_microbit_show", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_microbit_setimage'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_SHOW_SETIMAGE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_micbtmatrix",
                    "name": "SHAPE",
                    "default": "0101011111111110111000100"
                },
                {
                    "type": "field_dropdown",
                    "name": "POSITION",
                    "options": [
                        [Blockly.Msg.MICROBIT_SHOW_POSITION_VALUE_OPTION0, 'left'],
                        [Blockly.Msg.MICROBIT_SHOW_POSITION_VALUE_OPTION1, 'right'],
                        [Blockly.Msg.MICROBIT_SHOW_POSITION_VALUE_OPTION2, 'up'],
                        [Blockly.Msg.MICROBIT_SHOW_POSITION_VALUE_OPTION3, 'down']
                    ]
                },
                {
                    "name":"VALUE",
                    "type":"input_value"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_microbit_show", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_microbit_showtext'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_SHOW_TEXT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "name":"TEXT",
                    "type":"input_value"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_microbit_show", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_microbit_showtext_until'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_SHOW_TEXTUNTIL,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "name":"TEXT",
                    "type":"input_value"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_microbit_show", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_microbit_close_matrix'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_SHOW_CLOSE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_microbit_show", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_microbit_lightuporoff'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_SHOW_LIGHT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "ACTION",
                    "options": [
                        [Blockly.Msg.MICROBIT_SHOW_LIGHT_ACTION_VALUE_OPTION0, '9'],
                        [Blockly.Msg.MICROBIT_SHOW_LIGHT_ACTION_VALUE_OPTION1, '0']
                    ]
                },
                {
                    "name":"X",
                    "type":"input_value"
                },
                {
                    "name":"Y",
                    "type":"input_value"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_microbit_show", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_microbit_lightonbrightness'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_SHOW_LIGHTON,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "name":"X",
                    "type":"input_value"
                },
                {
                    "name":"Y",
                    "type":"input_value"
                },
                {
                    "type": "field_dropdown",
                    "name": "BRIGHTNESS",
                    "options": [
                        ["0", '0'],
                        ["1", '1'],
                        ["2", '2'],
                        ["3", '3'],
                        ["4", '4'],
                        ["5", '5'],
                        ["6", '6'],
                        ["7", '7'],
                        ["8", '8'],
                        ["9", '9']
                    ]
                },
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_microbit_show", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_microbit_lightbrightness'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_SHOW_BRIGHTNESS,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "name":"X",
                    "type":"input_value"
                },
                {
                    "name":"Y",
                    "type":"input_value"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_microbit_show", "output_number"]
        });
    }
};