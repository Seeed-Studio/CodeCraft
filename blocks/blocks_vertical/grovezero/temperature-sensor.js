'use strict';

goog.provide('Blockly.Blocks.grovezero.temperatureSensor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');



Blockly.Blocks['sensing_g0_temperature_sensor_get_value'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_TEMPERATURESENSOR_GET_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Temperature_Sensor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "UNIT",
                    "options": [
                        [Blockly.Msg.GROVEZERO_TEMPERATURESENSOR_GET_VALUE_OPT0, 'C'],
                        [Blockly.Msg.GROVEZERO_TEMPERATURESENSOR_GET_VALUE_OPT1, 'F'],
                    ]
                }
            ],
            // "checkboxInFlyout": true,
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};