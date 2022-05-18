'use strict';

goog.provide('Blockly.Blocks.microbit.event');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_microbit_whenstartup'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_WHEN_START,
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
            "category": Blockly.Categories.event,
            "extensions": ["colours_microbit_events", "shape_hat"]
        });
    }
};

Blockly.Blocks['event_microbit_whenbuttonpressed'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_WHEN_BUTTONPRESSED,
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
                    "name": "KEY",
                    "options": [
                        [Blockly.Msg.MICROBIT_BUTTON_VALUE_OPTION0, 'a'],
                        [Blockly.Msg.MICROBIT_BUTTON_VALUE_OPTION1, 'b']
                    ]
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_microbit_events", "shape_hat"]
        });
    }
};

Blockly.Blocks['event_microbit_whenpinsconnected'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_WHEN_PINSTOUCHED,
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
                    "name": "PIN",
                    "options": [
                        [Blockly.Msg.MICROBIT_PINS_VALUE_OPTION0, '0'],
                        [Blockly.Msg.MICROBIT_PINS_VALUE_OPTION1, '1'],
                        [Blockly.Msg.MICROBIT_PINS_VALUE_OPTION2, '2']
                    ]
                },
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_microbit_events", "shape_hat"]
        });
    }
};

Blockly.Blocks['event_microbit_whengesture'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_WHEN_GESTURESTRIKE,
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
                    "name": "GESTURE",
                    "options": [
                        [Blockly.Msg.MICROBIT_GESTURE_VALUE_OPTION0, 'shake'],
                        [Blockly.Msg.MICROBIT_GESTURE_VALUE_OPTION1, 'up'],
                        [Blockly.Msg.MICROBIT_GESTURE_VALUE_OPTION2, 'down'],
                        [Blockly.Msg.MICROBIT_GESTURE_VALUE_OPTION3, 'left'],
                        [Blockly.Msg.MICROBIT_GESTURE_VALUE_OPTION4, 'right'],
                        [Blockly.Msg.MICROBIT_GESTURE_VALUE_OPTION5, 'face up'],
                        [Blockly.Msg.MICROBIT_GESTURE_VALUE_OPTION6, 'face down'],
                        [Blockly.Msg.MICROBIT_GESTURE_VALUE_OPTION7, 'freefall'],
                        [Blockly.Msg.MICROBIT_GESTURE_VALUE_OPTION8, '3g'],
                        [Blockly.Msg.MICROBIT_GESTURE_VALUE_OPTION9, '6g'],
                        [Blockly.Msg.MICROBIT_GESTURE_VALUE_OPTION10, '8g']
                    ]
                },
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_microbit_events", "shape_hat"]
        });
    }
};
