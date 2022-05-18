'use strict';

goog.provide('Blockly.Blocks.elfbot.ultrasonicSensor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

/**
 *  当检测到前方物体
 */
Blockly.Blocks['event_elfbot_whenultrasonicdetectedobjectdistance'] = {
    init: function () {
        this.jsonInit({
            "message0": '%1 %2 当检测到前方物体距离 %3 %4 毫米',
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/ultrasonic-sensor.svg",
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
                        ['小于', '<'],
                        ['大于', '>'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "NUM"
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};

/**
 *  当检测到前方物体
 */
Blockly.Blocks['event_elfbot_whenultrasonicdetectedobject'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_ULTRASONIC_WHENDETECTEDOBJECT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/ultrasonic-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};

Blockly.Blocks['event_elfbot_whenultrasonicdetectedobjectnot'] = {
    init: function () {
        this.jsonInit({
            "message0": '%1 %2 当检测到前方无物体',
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/ultrasonic-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};

Blockly.Blocks['sensing_elfbot_ultrasonic_distance'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_ULTRASONIC_DISTANCE_FROMOBJ,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/ultrasonic-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_elfbot_ultrasonic_isdetectedobject'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_ULTRASONIC_ISDETECTED_OBJECT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/ultrasonic-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};

Blockly.Blocks['looks_elfbot_ultrasonicled_show_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_ULTRASONIC_LED_SHOW_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/ultrasonic-sensor.svg",
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
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION0, 'red'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION1, 'green'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION2, 'blue'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION3, 'yellow'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION4, 'cyan'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION5, 'purple'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION6, 'black'],
                        [Blockly.Msg.ELFBOT_RGBLED_COLOR_VALUE_OPTION7, 'white']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_elfbot_light", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_elfbot_ultrasonicled_crushout'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_ULTRASONIC_LED_CRUSHOUT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/ultrasonic-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_elfbot_light", "shape_statement"]
        });
    }
};