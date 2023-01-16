'use strict';

goog.provide('Blockly.Blocks.grovezero.gestureSensor');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['event_g0_gesture_sensor_when_change'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Gesture_Sensor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "CONTROL_OPT",
                    "options": [
                        [Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT0, 'swipe_left'],
                        [Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT1, 'swipe_right'],
                        [Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT2, 'swipe_up'],
                        [Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT3, 'swipe_down'],
                        [Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT4, 'approaching'],
                        [Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT5, 'departing'],
                        [Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT6, 'circle_clockwise'],
                        [Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT7, 'circle_anticlockwise'],
                        [Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT8, 'finger_waving'],
                    ]
                },
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        })
    }
}