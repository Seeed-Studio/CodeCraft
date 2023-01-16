'use strict';

goog.provide('Blockly.Blocks.microbit.MuVision');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

//图像识别传感器(模块图片)识别球体？(Ball detected?)
Blockly.Blocks['motion_microbit_vision_sensor1'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR1,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        [Blockly.Msg.ARDUINO_VISION_SENSOR1_OPT1, '1'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR1_OPT2, '2'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};




Blockly.Blocks['motion_microbit_vision_sensor2'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR2,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT1, '1'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT2, '2'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT3, '3'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT4, '4'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT5, '5']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};

Blockly.Blocks['motion_microbit_vision_sensor3'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR3,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
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
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};


// 识别图形
Blockly.Blocks['motion_microbit_vision_sensor4'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR4,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT1, '1'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT2, '2'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT3, '3'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT4, '4'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT5, '5'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};


// 识别人体
Blockly.Blocks['motion_microbit_vision_sensor5'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR5,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};

// 识别颜色
Blockly.Blocks['motion_microbit_vision_sensor6'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR6,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT1, '3'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT2, '4'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT3, '5'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT4, '6'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT5, '7'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT6, '8'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT7, '1'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT8, '2']
                        // [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT9, 'CC_COLOR_OTHER'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};

// 获取颜色值
Blockly.Blocks['motion_microbit_vision_sensor7'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR7,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_number"]
        });
    }
};

Blockly.Blocks['motion_microbit_vision_sensor8'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR8,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vision_sensor.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        ['X', '1'],
                        ['Y', '2'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_number"]
        });
    }
};