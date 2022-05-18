'use strict';

goog.provide('Blockly.Blocks.elfbot.patrolSensor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_elfbot_whenlinepatroldetectedcolor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LINEPATROL_WHENDETECTEDCOLORD,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/color-line-follower.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION0, '1'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION1, '2'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION2, '3'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION3, '4'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION4, '5'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION5, '6'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION6, '7'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION7, '8']
                    ]
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};

Blockly.Blocks['sensing_elfbot_linepatrol_grayscale'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LINEPATROL_GREYSCALE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/color-line-follower.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_elfbot_linepatrol_detected_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LINEPATROL_DETECTED_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/color-line-follower.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION0, '1'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION1, '2'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION2, '3'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION3, '4'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION4, '5'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION5, '6'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION6, '7'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION7, '8']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};

Blockly.Blocks['sensing_elfbot_linepatrol_detected_color_value'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LINEPATROL_DETECTED_COLOR_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/color-line-follower.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION0, '1'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION1, '2'],
                        [Blockly.Msg.ELFBOT_LINEPATROL_COLOR_VALUE_OPTION2, '3']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_elfbot_linepatrol_lightintensity'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LINEPATROL_LIGHTINTENSITY_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/color-line-follower.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_elfbot_linepatrol_detect_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LINECOLOR_DETECT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/color-line-follower.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.ELFBOT_LINECOLOR_OPT0, '1'],
                        [Blockly.Msg.ELFBOT_LINECOLOR_OPT1, '2'],
                        [Blockly.Msg.ELFBOT_LINECOLOR_OPT2, '3'],
                    ]
                },
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
}


Blockly.Blocks['sensing_elfbot_linepatrol_line_location'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_LINECOLOR_DETECT_POSITION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/color-line-follower.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "LINER",
                    "options": [
                        [Blockly.Msg.ELFBOT_LINECOLOR_DETECT_BLACK, '1'],
                        [Blockly.Msg.ELFBOT_LINECOLOR_DETECT_WRITE, '3'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        [Blockly.Msg.ELFBOT_LINECOLOR_DETECT_POSITION_OPT0, 'middle'],
                        [Blockly.Msg.ELFBOT_LINECOLOR_DETECT_POSITION_OPT1, 'right'],
                        [Blockly.Msg.ELFBOT_LINECOLOR_DETECT_POSITION_OPT2, 'right-most'],
                        [Blockly.Msg.ELFBOT_LINECOLOR_DETECT_POSITION_OPT3, 'left'],
                        [Blockly.Msg.ELFBOT_LINECOLOR_DETECT_POSITION_OPT4, 'left-most'],
                        [Blockly.Msg.ELFBOT_LINECOLOR_DETECT_POSITION_OPT5, 'lost'],
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
}

Blockly.Blocks['sensing_elfbot_linepatrol_last_line'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 %2 颜色识别传感器 上次线的位置为 %3",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/color-line-follower.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        ['左', '1'],
                        ['右', '2'],
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
}


Blockly.Blocks['sensing_elfbot_linepatrol_get_value'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 %2 颜色识别传感器 取值",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/color-line-follower.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "shape_statement"]
        });
    }
}