'use strict';

goog.provide('Blockly.Blocks.grovezero.ultrasonicSensor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');



Blockly.Blocks['sensing_g0_ultrasonic_sensor_get_value'] = {
    // 超声波测距传感器 距离（cm）
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_ULTRASONIC_SENSOR_GET_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Ultrasonic_Sensor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            // "checkboxInFlyout": true,
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};