'use strict';

goog.provide('Blockly.Blocks.grovezero.imu9dof');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['event_g0_imu9_dof_status_when_change'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_WHEN_CHANGE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_9axis_Motion_Sensor@2x.svg",
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
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT4, 'face_up'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT5, 'face_down'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT1, 'straight_up'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT0, 'straight_down'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT2, 'tilt_left'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT3, 'tilt_right'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT6, 'shake'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT7, 'free_fail'],
                    ]
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};


Blockly.Blocks['sensing_g0_imu9_dof_status_is'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_IS,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_9axis_Motion_Sensor@2x.svg",
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
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT4, 'face_up'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT5, 'face_down'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT1, 'straight_up'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT0, 'straight_down'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT2, 'tilt_left'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT3, 'tilt_right'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT6, 'shake'],
                        [Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT7, 'free_fail'],
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};


Blockly.Blocks['sensing_g0_imu9_dof_get_value'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_IMU9_DOF_GET_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_9axis_Motion_Sensor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DIRECT",
                    "options": [
                        ['x', 'x'],
                        ['y', 'y'],
                        ['z', 'z']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};


Blockly.Blocks['sensing_g0_imu9_magnetic_get_value'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_IMU9_MAGNETIC_GET_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_9axis_Motion_Sensor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DIRECT",
                    "options": [
                        ['x', 'x'],
                        ['y', 'y'],
                        ['z', 'z'],
                        [Blockly.Msg.GROVEZERO_IMU9_MAGNETIC_GET_VALUE_OPT1, 'strength'],
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_g0_imu9_angular_rate_get_value'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_IMU9_ANGULARRATE_GET_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_9axis_Motion_Sensor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DIRECT",
                    "options": [
                        ['x', 'x'],
                        ['y', 'y'],
                        ['z', 'z']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_g0_imu9_rotation_get_value'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_IMU9_ROTATION_GET_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_9axis_Motion_Sensor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "ACTION",
                    "options": [
                        [Blockly.Msg.GROVEZERO_IMU9_ROTATION_GET_VALUE_OPT0, '0'],
                        [Blockly.Msg.GROVEZERO_IMU9_ROTATION_GET_VALUE_OPT1, '1'],
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};