'use strict';

goog.provide('Blockly.Blocks.grovezero.temHumSensor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sensing_g0_temhum_sensor_get_tem_value'] = {
    // 温湿度传感器 温度值【选择控件】
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_TEMHUM_SENSOR_GET_TEM_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Temperature_Humidity_Sensor@2x.svg",
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

Blockly.Blocks['sensing_g0_temhum_sensor_get_hum_value'] = {
    // 温湿度传感器 湿度值（%）
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_TEMHUM_SENSOR_GET_HUM_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Temperature_Humidity_Sensor@2x.svg",
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