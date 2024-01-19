'use strict';

goog.provide('Blockly.Blocks.grovejoint.input');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_grovejoint_tem_hum_get_value'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_HUMITURE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        [Blockly.Msg.GROVE_JOINT_INPUT_HUMITURE_OPT01, 'T'],
                        [Blockly.Msg.GROVE_JOINT_INPUT_HUMITURE_OPT02, 'H'],
                    ]
                }
            ],
            "extensions": ["colours_grovejoint_input", "output_number"]
        });
    }
};
Blockly.Blocks['motion_grovejoint_inf_prox_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_INFRARED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_grovejoint_input", "output_boolean"]
        });
    }
};
Blockly.Blocks['motion_grovejoint_magnetic_switch'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_MAGNESWITCH,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_grovejoint_input", "output_boolean"]
        });
    }
};
Blockly.Blocks['motion_grovejoint_ult_dis_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_ULTRASONIC,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_grovejoint_input", "output_number"]
        });
    }
};
Blockly.Blocks['motion_grovejoint_light_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_LIGHT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_grovejoint_input", "output_number"]
        });
    }
};
Blockly.Blocks['motion_grovejoint_sli_pot_switch'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_SLIDESWITCH,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_grovejoint_input", "output_number"]
        });
    }
};
Blockly.Blocks['motion_grovejoint_tilt_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_INCLINE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_grovejoint_input", "output_boolean"]
        });
    }
};
Blockly.Blocks['motion_grovejoint_touch_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_TOUCH,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_grovejoint_input", "output_boolean"]
        });
    }
};
Blockly.Blocks['motion_grovejoint_noise_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_NOISE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_grovejoint_input", "output_number"]
        });
    }
};
Blockly.Blocks['motion_grovejoint_soil_moi_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_SOILHUMIDITY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_grovejoint_input", "output_number"]
        });
    }
};
Blockly.Blocks['motion_grovejoint_imu3_dof_get_value'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_SHAFTSPEED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "XYZ",
                    "options": [
                        ['x', 'X'],
                        ['y', 'Y'],
                        ['z', 'Z']
                    ]
                }
            ],
            "extensions": ["colours_grovejoint_input", "output_number"]
        });
    }
};

Blockly.Blocks['motion_grovejoint_mul_channel_touch_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVE_JOINT_INPUT_MULTICHANNEDL_TOUCH,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovejoint/icon_grove-joint.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "CHANNEL",
                    "options": [
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9'],
                        ['10', '10'],
                        ['11', '11'],

                    ]
                }
            ],
            "extensions": ["colours_grovejoint_input", "output_boolean"]
        });
    }
};