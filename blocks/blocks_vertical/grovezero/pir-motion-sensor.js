'use strict';

goog.provide('Blockly.Blocks.grovezero.pirMotion');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_g0_pir_motion_sensor_detect_someone'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_PIR_MOTION_SENSOR_DETECT_SOMEONE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_PIR_Sensor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        })
    }
}