'use strict';

goog.provide('Blockly.Blocks.microbit.sensor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sensing_microbit_sensor_buttonpressed'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_SENSOR_BUTTON_PRESSED,
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
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_microbit_sensor", "output_boolean"]
      });
    }
};

Blockly.Blocks['sensing_microbit_sensor_gestureis'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_SENSOR_GESTURE_STRIKE,
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
            }
        ],
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_microbit_sensor", "output_boolean"]
      });
    }
};

Blockly.Blocks['sensing_microbit_sensor_acceleration'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_SENSOR_ACCELERATION,
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
                "name": "ASIX",
                "options": [
                    [Blockly.Msg.MICROBIT_SENSOR_ACCELERATION_VALUE_OPTION0, 'x'],
                    [Blockly.Msg.MICROBIT_SENSOR_ACCELERATION_VALUE_OPTION1, 'y'],
                    [Blockly.Msg.MICROBIT_SENSOR_ACCELERATION_VALUE_OPTION2, 'z']
                ]
            }
        ],
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_microbit_sensor", "output_number"]
      });
    }
};

Blockly.Blocks['sensing_microbit_sensor_compassangle'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_SENSOR_COMPASSANGLE,
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
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_microbit_sensor", "output_number"]
      });
    }
};

Blockly.Blocks['sensing_microbit_sensor_compassmagneticdensity'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_SENSOR_COMPASS_MAGNETICDENSITY,
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
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_microbit_sensor", "output_number"]
      });
    }
};


Blockly.Blocks['sensing_microbit_sensor_calibratecompass'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_SENSOR_CALIBRATE_COMPASS,
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
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_microbit_sensor", "shape_statement"]
      });
    }
};

Blockly.Blocks['sensing_microbit_sensor_temperature'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_SENSOR_TEMPERATURE,
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
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_microbit_sensor", "output_number"]
      });
    }
};

Blockly.Blocks['sensing_microbit_sensor_runningtime'] = {
    init: function() {
      this.jsonInit({
        "message0": Blockly.Msg.MICROBIT_SENSOR_RUNNINGTIME,
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
        "category": Blockly.Categories.sensing,
        "extensions": ["colours_microbit_sensor", "output_number"]
      });
    }
};