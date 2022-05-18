'use strict';

goog.provide('Blockly.Blocks.elfbot.ledMatrix');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['looks_elfbot_ledmatrix_showimage'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LEDMATRIX_SHOW_IMAGE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/face.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_elfledmatrix",
                    "name": "SHAPE",
                    "default": "00000000000000000000000000000000000000000000000000111100001111000100001001000010000000000000000000000000000000000000000000000000"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_elfbot_ledmatrix_showimage_duration'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LEDMATRIX_SHOW_IMAGE_DURATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/face.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_elfledmatrix",
                    "name": "SHAPE",
                    "default": "00000000000000000000000000000000000000000000000000111100001111000100001001000010000000000000000000000000000000000000000000000000"
                },
                {
                    "type": "input_value",
                    "name": "SECS"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_elfbot_ledmatrix_plot'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LEDMATRIX_PLOT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/face.svg",
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

Blockly.Blocks['looks_elfbot_ledmatrix_unplot'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LEDMATRIX_UNPLOT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/face.svg",
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

Blockly.Blocks['looks_elfbot_ledmatrix_plotorunplot'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LEDMATRIX_PLOT_OR_UNPLOT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/face.svg",
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

Blockly.Blocks['looks_elfbot_ledmatrix_isplot'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LEDMATRIX_ISPLOT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/face.svg",
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

Blockly.Blocks['looks_elfbot_ledmatrix_showtext'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LEDMATRIX_SHOW_TEXT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/face.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
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

Blockly.Blocks['looks_elfbot_ledmatrix_showtext_untildone'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LEDMATRIX_SHOW_TEXT_UNTILDONE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/face.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
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

Blockly.Blocks['looks_elfbot_ledmatrix_showemoticon'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LEDMATRIX_SHOW_EMOTICON,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/face.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "EMOTICON",
                    "options": [
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION1, '1'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION2, '2'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION3, '3'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION4, '4'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION5, '5'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION6, '6'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION7, '7'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION8, '8'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION9, '9'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION10, '0A'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION11, '0B'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION12, '0C'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION13, '0D'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION14, '0E'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION15, '0F'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION16, '10'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION17, '11'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION18, '12'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION19, '13'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION20, '14'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION21, '15'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION22, '16'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION23, '17'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION24, '18'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION25, '19'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION26, '1A'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION27, '1B'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION28, '1C'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION29, '1D'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION30, '1E'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION31, '1F'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION32, '20'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION33, '21'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION34, '22'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION35, '23'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION36, '24'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION37, '25'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION38, '26'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION39, '27'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION40, '28'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION41, '29'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION42, '2A'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION43, '2B'],
                        // [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION44, '2C'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION45, '2D'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION46, '2E']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_elfbot_ledmatrix_showemoticon_duration'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LEDMATRIX_SHOW_EMOTICON_FORDURATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/face.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "EMOTICON",
                    "options": [
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION1, '1'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION2, '2'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION3, '3'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION4, '4'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION5, '5'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION6, '6'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION7, '7'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION8, '8'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION9, '9'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION10, '0A'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION11, '0B'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION12, '0C'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION13, '0D'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION14, '0E'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION15, '0F'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION16, '10'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION17, '11'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION18, '12'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION19, '13'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION20, '14'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION21, '15'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION22, '16'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION23, '17'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION24, '18'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION25, '19'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION26, '1A'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION27, '1B'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION28, '1C'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION29, '1D'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION30, '1E'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION31, '1F'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION32, '20'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION33, '21'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION34, '22'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION35, '23'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION36, '24'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION37, '25'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION38, '26'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION39, '27'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION40, '28'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION41, '29'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION42, '2A'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION43, '2B'],
                        // [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION44, '2C'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION45, '2D'],
                        [Blockly.Msg.ELFBOT_LEDMATRIX_EMOTICON_VALUE_OPTION46, '2E']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "TIMER"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_elfbot_ledmatrix_crushoutscreen'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LEDMATRIX_SCREEN_CRUSHOUT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/face.svg",
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


