'use strict';

goog.provide('Blockly.Blocks.elfbot.infraredSensor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


/**
 *  当检测到前方不悬空 
 */
Blockly.Blocks['event_elfbot_wheninfrareddetectedoverheadnot'] = {
    init: function () {
        this.jsonInit({
            "message0": '%1 %2 当检测到前方不悬空',
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/pir-sensor.svg",
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

/**
 *  当检测到前方悬空 
 */
Blockly.Blocks['event_elfbot_wheninfrareddetectedoverhead'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_INFRARED_WHENOVERHEAD,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/pir-sensor.svg",
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

/**
 *  精灵 红外反射光强度
 */
Blockly.Blocks['sensing_elfbot_infrared_lightintensity'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_INFRARED_LIGHTINTENSITY_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/pir-sensor.svg",
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

/**
 *   精灵 检测到前方悬空？
 */
Blockly.Blocks['sensing_elfbot_infrared_detected_ishead'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_INFRARED_DETECTED_ISHEAD,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/pir-sensor.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};

