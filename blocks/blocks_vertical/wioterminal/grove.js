'use strict';

goog.provide('Blockly.Blocks.wioterminal.grove');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

//舵机
Blockly.Blocks['grove_wioterminal_seeed_servo_move'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SEEED_SERVO_MOVE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/servo.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "DEGREES"
                },
                {
                    "type": "input_value",
                    "name": "DELAY_TIME"
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"],
        });
    }
}

//rgb彩灯
Blockly.Blocks['grove_wioterminal_seeed_rgb_led'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SEEED_RGB_LED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/rgb_led.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
                {
                    "type": "field_dropdown",
                    "name": "NUM",
                    "options": [
                        ['1', '0'],
                        ['2', '1'],
                        ['3', '2'],
                        ['4', '3'],
                        ['5', '4'],
                        ['6', '5'],
                        ['7', '6'],
                        ['8', '7'],
                        ['9', '8'],
                        ['10', '9'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"],
        });
    }
}

//迷你风扇  （Mini Fan）
Blockly.Blocks['grove_wioterminal_seeed_mini_fan'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SEEED_MINI_FAN,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/mini_fan.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "STAT",
                    "options": [
                        ['ON', 'HIGH'],
                        ['OFF', 'LOW']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"],
        });
    }
}

//红外接近传感器（Line Finder）
Blockly.Blocks['grove_wioterminal_seeed_line_finder'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SEEED_LINE_FINDER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/line_finder.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

//超声波测距传感器（Ultrasonic Ranger）
Blockly.Blocks['grove_wioterminal_seeed_ult'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SEEED_ULT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/ult.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_arduino_grove_igure", "output_number"],
        });
    }
}

//人体红外传感器（PIR Motion Sensor）
Blockly.Blocks['grove_wioterminal_seeed_pir_motion'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SEEED_PIR_MOTION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/pir_motion.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

//温湿度传感器 dht11
Blockly.Blocks['grove_wioterminal_seeed_temperature_humidity'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SEEED_TEMPERATURE_HUMIDITY_DHT11,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/temperature_humidity.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "TH",
                    "options": [
                        [Blockly.Msg.WIO_TERMINAL_SEEED_TEMPERATURE_HUMIDITY_OPT1, '0'],
                        [Blockly.Msg.WIO_TERMINAL_SEEED_TEMPERATURE_HUMIDITY_OPT2, '1']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_number"]
        });
    }
}

//温湿度传感器 dht20
Blockly.Blocks['grove_wioterminal_seeed_temperature_humidity_dht20'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SEEED_TEMPERATURE_HUMIDITY_DHT20,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/temperature_humidity.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "TH",
                    "options": [
                        [Blockly.Msg.WIO_TERMINAL_SEEED_TEMPERATURE_HUMIDITY_OPT1, '0'],
                        [Blockly.Msg.WIO_TERMINAL_SEEED_TEMPERATURE_HUMIDITY_OPT2, '1']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_number"]
        });
    }
}

//"水分子检测传感器（模块图片）管脚【A0】 (Water level PIN#[A0] )"
Blockly.Blocks['grove_wioterminal_seeed_water_analog'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SEEED_WATER_ANALOG,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/water.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
            ],
            "extensions": ["colours_arduino_grove_analog", "output_number"],
        });
    }
}

Blockly.Blocks['grove_wioterminal_rtc_setdatetime'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_RTC_SETDATETIME,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_rtc_time.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "YEAR"
                },
                {
                    "type": "input_value",
                    "name": "MONTH"
                },
                {
                    "type": "input_value",
                    "name": "DAY"
                },
                {
                    "type": "input_value",
                    "name": "HOUR"
                },
                {
                    "type": "input_value",
                    "name": "MINUTE"
                },
                {
                    "type": "input_value",
                    "name": "SECOND"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
}

Blockly.Blocks['grove_wioterminal_rtc_getdate'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_RTC_GETDATE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_rtc_time.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_string"]
        });
    }
}

Blockly.Blocks['grove_wioterminal_rtc_gettime'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_RTC_GETTIME,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_rtc_time.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_string"]
        });
    }
}