'use strict';

goog.provide('Blockly.Blocks.grovezero.rgbLed');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['looks_g0_rgb_led_show_style_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_LED_SHOW_STYLE_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "BRIGHTNESS",
                    "options": [
                        [Blockly.Msg.GROVEZERO_RGB_LED_OPT1, 'light'],
                        [Blockly.Msg.GROVEZERO_RGB_LED_OPT2, 'blink'],
                        [Blockly.Msg.GROVEZERO_RGB_LED_OPT3, 'breath']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_g0_rgb_led_show_style'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_LED_SHOW_STYLE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "STYLE",
                    "options": [
                        [Blockly.Msg.GROVEZERO_RGB_LED_OPT4, 'rainbow'],
                        [Blockly.Msg.GROVEZERO_RGB_LED_OPT5, 'random_color']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_g0_rgb_led_fade_from_color1_to_color2'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_LED_FADE_FROM_COLOR1_TO_COLOR2,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "COLOR1"
                },
                {
                    "type": "input_value",
                    "name": "COLOR2"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_g0_rgb_led_set_brightness'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_LED_SET_BRIGHTNESS,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "BRIGHTNESS"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_g0_rgb_led_light_off'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_LED_LIGHT_OFF,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED@2x.svg",
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


Blockly.Blocks['sensing_g0_rgb_to_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_TO_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "RED"
                },
                {
                    "type": "input_value",
                    "name": "GREEN"
                },
                {
                    "type": "input_value",
                    "name": "BLUE"
                }
            ],
            "extensions": ["colours_looks", "output_string"]
        });
    }
};

Blockly.Blocks['sensing_g0_hsl_to_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_HSL_TO_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
                {
                    "type": "input_value",
                    "name": "STATURATION"
                },
                {
                    "type": "input_value",
                    "name": "BRIGHTNESS"
                }
            ],
            "extensions": ["colours_looks", "output_string"]
        });
    }
};
