'use strict';

goog.provide('Blockly.Blocks.mpython.grovezero');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_mpython_g0_miniwheel_run_velocity_azimuth'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.GROVEZERO_MINIWHEEL_RUN_VELOCITY_AZIMUTH,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Chassis@2x.svg",
                  "width": 40,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "field_dropdown",
                  "name": "VELOCITY",
                  "options": [
                      [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT1, 'low'],
                      [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT2, 'medium'],
                      [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT3, 'high']
                  ]
              },
              {
                  "type": "field_dropdown",
                  "name": "AZIMUTH",
                  "options": [
                      [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT4, 'forward'],
                      [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT5, 'backward'],
                      [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT6, 'left'],
                      [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT7, 'right'],
                      [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT8, 'clockwise'],
                      [Blockly.Msg.GROVEZERO_MINIWHEEL_OPT9, 'counterclockwise']
                  ]
              }
          ],
          "category": Blockly.Categories.motion,
          "extensions": ["colours_mpython_grovezero", "shape_statement"]
      });
  }
};

Blockly.Blocks['motion_mpython_g0_miniwheel_stop'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.GROVEZERO_MINIWHEEL_STOP,//,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Chassis@2x.svg",
                  "width": 40,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              }
          ],
          "category": Blockly.Categories.motion,
          "extensions": ["colours_mpython_grovezero", "shape_statement"]
      });
  }
};

Blockly.Blocks['motion_mpython_g0_miniwheel_set_power'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.GROVEZERO_MINIWHEEL_SET_POWER,//,
          "args0": [
              {
                  "type": "field_image",
                  "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Chassis@2x.svg",
                  "width": 40,
                  "height": 30
              },
              {
                  "type": "field_vertical_separator"
              },
              {
                  "type": "input_value",
                  "name": "LEFT_POWER"
              },
              {
                  "type": "input_value",
                  "name": "RIGHT_POWER"
              }
          ],
          "category": Blockly.Categories.motion,
          "extensions": ["colours_mpython_grovezero", "shape_statement"]
      });
  }
};

Blockly.Blocks['motion_mpython_g0_color_line_follower_position'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MPYTHON_G0_COLOR_LINE_FOLLOWER_POSITION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Color_Line_Follower@2x.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "POSITION",
                    "options": [
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT1, '1'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT2, '3'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT3, '4'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT4, '5'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT5, '6'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT6, '2']
                    ]
                }
            ],
            "extensions": ["colours_mpython_grovezero", "output_boolean"]
        });
    }
};

Blockly.Blocks['motion_mpython_g0_color_line_follower_seeing'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MPYTHON_G0_COLOR_LINE_FOLLOWER_SEEING,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Color_Line_Follower@2x.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT3, '1'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT0, '2'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT1, '3'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT2, '4'],
                        [Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT4, '5'],
                    ]
                }
            ],
            "extensions": ["colours_mpython_grovezero", "output_boolean"]
        });
    }
};

Blockly.Blocks['motion_mpython_g0_color_line_follower_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MPYTHON_G0_COLOR_LINE_FOLLOWER_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Color_Line_Follower@2x.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_mpython_grovezero", "output_number"]
        });
    }
};

Blockly.Blocks['motion_mpython_g0_servo_turn_angle'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_SERVO_TURN_ANGLE,//
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Servo@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "ANGLE"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_mpython_g0_dc_motor_trun_power'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_DC_MOTOR_TRUN_POWER,//,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_DC_Motor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "MOTOR_NO",
                    "options": [
                        ['M1', '1'],
                        ['M2', '2'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "POWER"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_mpython_g0_dc_motor_stop'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MOTOR_STOP,//,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_DC_Motor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "MOTOR_NO",
                    "options": [
                        ['M1', '1'],
                        ['M2', '2'],
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_twin_button_is_pressed'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_TWIN_BUTTON_IS_PRESSED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Twin_Button@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0'],
                        ['2', '1'],
                        ['3', '2'],
                        ['4', '3']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "KEY",
                    "options": [
                        ['A', '1'],
                        ['B', '4'],
                        ['A+B', '7']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "output_boolean"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_mech_key_is_pressed'] = {
    // 机械按钮开关正在被按下
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MECH_KEY_IS_PRESSED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Mech_Key@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0'],
                        ['2', '1'],
                        ['3', '2'],
                        ['4', '3']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "output_boolean"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_mech_key_set_rgb'] = {
    // 机械按钮开关 设置RGB灯【颜色选择控件】
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MECH_KEY_SET_RGB,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Mech_Key@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0x00'],
                        ['2', '0x10'],
                        ['3', '0x20'],
                        ['4', '0x30']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_mech_key_close'] = {
    // 机械按钮开关 RGB灯熄灭
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MECH_KEY_CLOSE_RGB,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Mech_Key@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0x00'],
                        ['2', '0x10'],
                        ['3', '0x20'],
                        ['4', '0x30']
                    ]
                },
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_touchpad_is_pressed'] = {
    // 多触摸开关【数字输入选择控件】的【数字输入选择控件】被按下？
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_TOUCHPAD_IS_PRESSED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Touchpad_pin@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0'],
                        ['2', '1'],
                        ['3', '2'],
                        ['4', '3'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "NUM_OPT",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '4'],
                        ['4', '8'],
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "output_boolean"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_light_sensor_get_value'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_LIGHT_SENSOR_GET_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Light_Sensor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            // "checkboxInFlyout": true,
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_sound_sensor_get_value'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_SOUND_SENSOR_GET_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Sound_Sensor@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            // "checkboxInFlyout": true,
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_temperature_sensor_get_value'] = {
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
                        [Blockly.Msg.GROVEZERO_TEMPERATURESENSOR_GET_VALUE_OPT0, '0x01'],
                        [Blockly.Msg.GROVEZERO_TEMPERATURESENSOR_GET_VALUE_OPT1, '0x02'],
                    ]
                }
            ],
            // "checkboxInFlyout": true,
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_imu9_dof_get_value'] = {
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
                        ['x', '2'],
                        ['y', '3'],
                        ['z', '4']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_slider_get_value'] = {
    // 滑动变阻器【数字输入选择控件】读数
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_SLIDER_GET_VALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Slide@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_ultrasonic_sensor_get_value'] = {
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
            "extensions": ["colours_mpython_grovezero", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_temhum_sensor_get_tem_value'] = {
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
                        [Blockly.Msg.GROVEZERO_TEMPERATURESENSOR_GET_VALUE_OPT0, '0x01'],
                        [Blockly.Msg.GROVEZERO_TEMPERATURESENSOR_GET_VALUE_OPT1, '0x02'],
                    ]
                }
            ],
            // "checkboxInFlyout": true,
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_temhum_sensor_get_hum_value'] = {
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
            "extensions": ["colours_mpython_grovezero", "output_number"]
        });
    }
};

Blockly.Blocks['looks_mpython_g0_rgb_matrix_show_shape'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_SHAPE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "field_mpythonmatrix",
                    "name": "SHAPE",
                    "default": ""
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_mpython_g0_rgb_matrix_show_string'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_STRING,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "STRING"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT1, '0x00'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT2, '0x12'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT3, '0x18'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT4, '0x52'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT5, '0x7f'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT6, '0xaa'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT7, '0xc5'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT8, '0xdc'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT9, '0xfe']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_mpython_g0_rgb_matrix_show_anima'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_ANIMA,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "ANIMA",
                    "options": [
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT1, '0x0A7f00'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT2, '0x0B0101'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT3, '0x0B0100'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT4, '0x0B0001'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT5, '0x0B0000'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT6, '0x0cffff'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT7, '0x0cfefe'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT8, '0x0c2a2b'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT9, '0x0c2c34']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_mpython_g0_rgb_matrix_show_histogram'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_HISTOGRAM,            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_mpython_g0_rgb_matrix_xy_set_on'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "X"
                },
                {
                    "type": "input_value",
                    "name": "Y"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT1, '0x00'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT2, '0x12'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT3, '0x18'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT4, '0x52'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT5, '0x7f'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT6, '0xaa'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT7, '0xc5'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT8, '0xdc'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT9, '0xfe']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_mpython_g0_rgb_matrix_xy_set_off'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_OFF,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "X"
                },
                {
                    "type": "input_value",
                    "name": "Y"
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['looks_mpython_g0_rgb_matrix_xy_set_on_off'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OFF,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "X"
                },
                {
                    "type": "input_value",
                    "name": "Y"
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT1, '0x00'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT2, '0x12'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT3, '0x18'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT4, '0x52'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT5, '0x7f'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT6, '0xaa'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT7, '0xc5'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT8, '0xdc'],
                        [Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT9, '0xfe']
                    ]
                }
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_rgb_matrix_xy_is_on'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_IS_ON,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "X"
                },
                {
                    "type": "input_value",
                    "name": "Y"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "output_boolean"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_rgb_matrix_clean'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_CLEAN,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_mpython_g0_rgb_matrix_xy_get_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_GET_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_RGB_LED_Matrix@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "X"
                },
                {
                    "type": "input_value",
                    "name": "Y"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_mpython_grovezero", "output_number"]
        });
    }
};

Blockly.Blocks['event_mpython_g0_twin_button_when_click'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_TWIN_BUTTON_WHEN_CLICK,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Twin_Button@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0x1A'],
                        ['2', '0x0A'],
                        ['3', '0x12'],
                        ['4', '0x02']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "KEY",
                    "options": [
                        ['A', 'A'],
                        ['B', 'B'],
                        ['A+B', 'AB']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        [Blockly.Msg.GROVEZERO_TWIN_BUTTON_WHEN_CLICK_OPT3, 'click'],
                        [Blockly.Msg.GROVEZERO_TWIN_BUTTON_WHEN_CLICK_OPT5, 'hold']
                    ]
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_mpython_grovezero", "shape_hat"]
        });
    }
};

Blockly.Blocks['event_mpython_g0_mech_key_when_click'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MECH_KEY_WHENCLICK,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Mech_Key@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0x0F'],
                        ['2', '0x1F'],
                        ['3', '0x2F'],
                        ['4', '0x3F']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        [Blockly.Msg.GROVEZERO_MECH_KEY_WHENCLICK_OPT0, 'click'],
                        [Blockly.Msg.GROVEZERO_MECH_KEY_WHENCLICK_OPT1, 'hold'],
                    ]
                },
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_mpython_grovezero", "shape_hat"]
        })
    }
}

Blockly.Blocks['event_mpython_g0_touchpad_when_click'] = {
    // 当touchpad按下
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_TOUCHPAD_WHEN_CLICK,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Touchpad_pin@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0x34'],
                        ['2', '0x35'],
                        ['3', '0x36'],
                        ['4', '0x37'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "NUM_OPT",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                    ]
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_mpython_grovezero", "shape_hat"]
        });
    }
};

Blockly.Blocks['event_mpython_g0_pir_motion_sensor_detect_someone'] = {
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
            "extensions": ["colours_mpython_grovezero", "shape_hat"]
        })
    }
}

Blockly.Blocks['event_mpython_g0_knob_when_change'] = {
    // 当旋钮调节器被 **
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/icon_Knob@2x.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "I2C",
                    "options": [
                        ['1', '0x10'],
                        ['2', '0x18'],
                        ['3', '0x30'],
                        ['4', '0x38'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "CONTROL_OPT",
                    "options": [
                        [Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE_OPT0, 'clockwise'],
                        [Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE_OPT1, 'anticlockwise'],
                        [Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE_OPT2, 'click'],
                    ]
                },
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_mpython_grovezero", "shape_hat"]
        })
    }
}

Blockly.Blocks['event_mpython_g0_gesture_sensor_when_change'] = {
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
            "extensions": ["colours_mpython_grovezero", "shape_hat"]
        })
    }
}
