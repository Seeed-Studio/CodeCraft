'use strict';

goog.provide('Blockly.Blocks.mpython.pin');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_mpython_get_pin_value'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_GET_VALUE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT0, '0'],
            [Blockly.Msg.MPYTHON_PIN_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_OPT2, '2'],
            [Blockly.Msg.MPYTHON_PIN_OPT3, '3'],
            [Blockly.Msg.MPYTHON_PIN_OPT4, '4'],
            [Blockly.Msg.MPYTHON_PIN_OPT6, '6'],
            [Blockly.Msg.MPYTHON_PIN_OPT7, '7'],
            [Blockly.Msg.MPYTHON_PIN_OPT8, '8'],
            [Blockly.Msg.MPYTHON_PIN_OPT9, '9'],
            [Blockly.Msg.MPYTHON_PIN_OPT10, '10'],
            [Blockly.Msg.MPYTHON_PIN_OPT13, '13'],
            [Blockly.Msg.MPYTHON_PIN_OPT14, '14'],
            [Blockly.Msg.MPYTHON_PIN_OPT15, '15'],
            [Blockly.Msg.MPYTHON_PIN_OPT16, '16'],
            [Blockly.Msg.MPYTHON_PIN_OPT19, '19'],
            [Blockly.Msg.MPYTHON_PIN_OPT20, '20'],
          ]
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_set_pin_value'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_SET_VALUE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT0, '0'],
            [Blockly.Msg.MPYTHON_PIN_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_OPT6, '6'],
            [Blockly.Msg.MPYTHON_PIN_OPT7, '7'],
            [Blockly.Msg.MPYTHON_PIN_OPT8, '8'],
            [Blockly.Msg.MPYTHON_PIN_OPT9, '9'],
            [Blockly.Msg.MPYTHON_PIN_OPT13, '13'],
            [Blockly.Msg.MPYTHON_PIN_OPT14, '14'],
            [Blockly.Msg.MPYTHON_PIN_OPT15, '15'],
            [Blockly.Msg.MPYTHON_PIN_OPT16, '16'],
            [Blockly.Msg.MPYTHON_PIN_OPT19, '19'],
            [Blockly.Msg.MPYTHON_PIN_OPT20, '20'],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "VALUE",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_VOLTAGE_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_VOLTAGE_OPT2, '0']
          ]
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_get_pin_analog_value'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_GET_ANALOG_VALUE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT0, '0'],
            [Blockly.Msg.MPYTHON_PIN_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_OPT2, '2'],
            [Blockly.Msg.MPYTHON_PIN_OPT3, '3'],
            [Blockly.Msg.MPYTHON_PIN_OPT4, '4'],
            [Blockly.Msg.MPYTHON_PIN_OPT10, '10']
          ]
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_set_pin_analog_value'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_SET_ANALOG_VALUE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT0, '0'],
            [Blockly.Msg.MPYTHON_PIN_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_OPT6, '6'],
            [Blockly.Msg.MPYTHON_PIN_OPT7, '7'],
            [Blockly.Msg.MPYTHON_PIN_OPT8, '8'],
            [Blockly.Msg.MPYTHON_PIN_OPT9, '9'],
            [Blockly.Msg.MPYTHON_PIN_OPT13, '13'],
            [Blockly.Msg.MPYTHON_PIN_OPT14, '14'],
            [Blockly.Msg.MPYTHON_PIN_OPT15, '15'],
            [Blockly.Msg.MPYTHON_PIN_OPT16, '16'],
            [Blockly.Msg.MPYTHON_PIN_OPT19, '19'],
            [Blockly.Msg.MPYTHON_PIN_OPT20, '20'],
          ]
        },
        {
          "type": "input_value",
          "name": "PWM",
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_set_servo_angle'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_SET_SERVO_ANGLE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT0, '0'],
            [Blockly.Msg.MPYTHON_PIN_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_OPT6, '6'],
            [Blockly.Msg.MPYTHON_PIN_OPT7, '7'],
            [Blockly.Msg.MPYTHON_PIN_OPT8, '8'],
            [Blockly.Msg.MPYTHON_PIN_OPT9, '9'],
            [Blockly.Msg.MPYTHON_PIN_OPT13, '13'],
            [Blockly.Msg.MPYTHON_PIN_OPT14, '14'],
            [Blockly.Msg.MPYTHON_PIN_OPT15, '15'],
            [Blockly.Msg.MPYTHON_PIN_OPT16, '16'],
            [Blockly.Msg.MPYTHON_PIN_OPT19, '19'],
            [Blockly.Msg.MPYTHON_PIN_OPT20, '20'],
          ]
        },
        {
          "type": "input_value",
          "name": "ANGLE",
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_set_servo_pwm_maxangle'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_SET_SERVO_PWM_MAXANGLE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT0, '0'],
            [Blockly.Msg.MPYTHON_PIN_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_OPT6, '6'],
            [Blockly.Msg.MPYTHON_PIN_OPT7, '7'],
            [Blockly.Msg.MPYTHON_PIN_OPT8, '8'],
            [Blockly.Msg.MPYTHON_PIN_OPT9, '9'],
            [Blockly.Msg.MPYTHON_PIN_OPT13, '13'],
            [Blockly.Msg.MPYTHON_PIN_OPT14, '14'],
            [Blockly.Msg.MPYTHON_PIN_OPT15, '15'],
            [Blockly.Msg.MPYTHON_PIN_OPT16, '16'],
            [Blockly.Msg.MPYTHON_PIN_OPT19, '19'],
            [Blockly.Msg.MPYTHON_PIN_OPT20, '20'],
          ]
        },
        {
          "type": "input_value",
          "name": "ANGLE",
        },
        {
          "type": "input_value",
          "name": "PWMSTART",
        },
        {
          "type": "input_value",
          "name": "PWMEND",
        },
        {
          "type": "input_value",
          "name": "MAXANGLE",
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_set_pin_mode'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_SET_PIN_MODE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT0, '0'],
            [Blockly.Msg.MPYTHON_PIN_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_OPT2, '2'],
            [Blockly.Msg.MPYTHON_PIN_OPT3, '3'],
            [Blockly.Msg.MPYTHON_PIN_OPT4, '4'],
            [Blockly.Msg.MPYTHON_PIN_OPT6, '6'],
            [Blockly.Msg.MPYTHON_PIN_OPT7, '7'],
            [Blockly.Msg.MPYTHON_PIN_OPT8, '8'],
            [Blockly.Msg.MPYTHON_PIN_OPT9, '9'],
            [Blockly.Msg.MPYTHON_PIN_OPT10, '10'],
            [Blockly.Msg.MPYTHON_PIN_OPT13, '13'],
            [Blockly.Msg.MPYTHON_PIN_OPT14, '14'],
            [Blockly.Msg.MPYTHON_PIN_OPT15, '15'],
            [Blockly.Msg.MPYTHON_PIN_OPT16, '16'],
            [Blockly.Msg.MPYTHON_PIN_OPT19, '19'],
            [Blockly.Msg.MPYTHON_PIN_OPT20, '20'],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "STATUS",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_STATYS_OPT1, 'IN'],
            [Blockly.Msg.MPYTHON_PIN_STATYS_OPT2, 'OUT'],
            [Blockly.Msg.MPYTHON_PIN_STATYS_OPT3, 'OPEN_DRAIN']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "MODE",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_MODE_OPT1, 'None'],
            [Blockly.Msg.MPYTHON_PIN_MODE_OPT2, 'Pin.PULL_DOWN'],
            [Blockly.Msg.MPYTHON_PIN_MODE_OPT3, 'Pin_PULL_UP']
          ]
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_external_level_duration'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_EXTERNAL_LEVEL_DURATION,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT0, '0'],
            [Blockly.Msg.MPYTHON_PIN_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_OPT2, '2'],
            [Blockly.Msg.MPYTHON_PIN_OPT3, '3'],
            [Blockly.Msg.MPYTHON_PIN_OPT4, '4'],
            [Blockly.Msg.MPYTHON_PIN_OPT6, '6'],
            [Blockly.Msg.MPYTHON_PIN_OPT7, '7'],
            [Blockly.Msg.MPYTHON_PIN_OPT8, '8'],
            [Blockly.Msg.MPYTHON_PIN_OPT9, '9'],
            [Blockly.Msg.MPYTHON_PIN_OPT10, '10'],
            [Blockly.Msg.MPYTHON_PIN_OPT13, '13'],
            [Blockly.Msg.MPYTHON_PIN_OPT14, '14'],
            [Blockly.Msg.MPYTHON_PIN_OPT15, '15'],
            [Blockly.Msg.MPYTHON_PIN_OPT16, '16'],
            [Blockly.Msg.MPYTHON_PIN_OPT19, '19'],
            [Blockly.Msg.MPYTHON_PIN_OPT20, '20'],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "VALUE",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_VOLTAGE_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_VOLTAGE_OPT2, '0']
          ]
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_dht11_value'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_DHT11_VALUE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT6, '6'],
            [Blockly.Msg.MPYTHON_PIN_OPT7, '7'],
            [Blockly.Msg.MPYTHON_PIN_OPT8, '8'],
            [Blockly.Msg.MPYTHON_PIN_OPT9, '9'],
            [Blockly.Msg.MPYTHON_PIN_OPT13, '13'],
            [Blockly.Msg.MPYTHON_PIN_OPT14, '14'],
            [Blockly.Msg.MPYTHON_PIN_OPT15, '15'],
            [Blockly.Msg.MPYTHON_PIN_OPT16, '16'],
            [Blockly.Msg.MPYTHON_PIN_OPT19, '19'],
            [Blockly.Msg.MPYTHON_PIN_OPT20, '20'],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "VALUE",
          "options": [
            [Blockly.Msg.MPYTHON_SYSRESOURES_BME280_OPT1, 'temperature'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_BME280_OPT2, 'humidity']
          ]
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_dht22_value'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_DHT22_VALUE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "PIN",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT6, '6'],
            [Blockly.Msg.MPYTHON_PIN_OPT7, '7'],
            [Blockly.Msg.MPYTHON_PIN_OPT8, '8'],
            [Blockly.Msg.MPYTHON_PIN_OPT9, '9'],
            [Blockly.Msg.MPYTHON_PIN_OPT13, '13'],
            [Blockly.Msg.MPYTHON_PIN_OPT14, '14'],
            [Blockly.Msg.MPYTHON_PIN_OPT15, '15'],
            [Blockly.Msg.MPYTHON_PIN_OPT16, '16'],
            [Blockly.Msg.MPYTHON_PIN_OPT19, '19'],
            [Blockly.Msg.MPYTHON_PIN_OPT20, '20'],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "VALUE",
          "options": [
            [Blockly.Msg.MPYTHON_SYSRESOURES_BME280_OPT1, 'temperature'],
            [Blockly.Msg.MPYTHON_SYSRESOURES_BME280_OPT2, 'humidity']
          ]
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_init_i2c_baud_rate'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_INIT_I2C_BAUD_RATE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "RATE",
          "options": [
            ['115200', '115200'],
            ['57600', '57600'],
            ['56000', '56000'],
            ['43000', '43000'],
            ['38400', '38400'],
            ['31250', '31250'],
            ['28800', '28800'],
            ['19200', '19200'],
            ['14400', '14400'],
            ['9600', '9600'],
            ['4800', '4800'],
            ['2400', '2400'],
            ['1200', '1200'],
            ['600', '600'],
            ['300', '300']
          ]
        }
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_init_i2c_scl_sda_baud'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_INIT_I2C_SCL_SDA_BAUD,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SCL",
          "options": [
            ['P6', '6'],
            ['P7', '7'],
            ['P8', '8'],
            ['P9', '9'],
            ['P13', '13'],
            ['P14', '14'],
            ['P15', '15'],
            ['P16', '16'],
            ['P19', '19'],
            ['P20', '20']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "SDA",
          "options": [
            ['P6', '6'],
            ['P7', '7'],
            ['P8', '8'],
            ['P9', '9'],
            ['P13', '13'],
            ['P14', '14'],
            ['P15', '15'],
            ['P16', '16'],
            ['P19', '19'],
            ['P20', '20']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "RATE",
          "options": [
            ['115200', '115200'],
            ['57600', '57600'],
            ['56000', '56000'],
            ['43000', '43000'],
            ['38400', '38400'],
            ['31250', '31250'],
            ['28800', '28800'],
            ['19200', '19200'],
            ['14400', '14400'],
            ['9600', '9600'],
            ['4800', '4800'],
            ['2400', '2400'],
            ['1200', '1200'],
            ['600', '600'],
            ['300', '300']
          ]
        }
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_i2c_address_write'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_I2C_ADDRESS_WRITE,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "ADDRESS",
        },
        {
          "type": "input_value",
          "name": "VALUE",
        }
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_i2c_address_get_bytes_num'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_I2C_ADDRESS_GET_BYTES_NUM,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "ADDRESS",
        },
        {
          "type": "input_value",
          "name": "NUM",
        }
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "output_number"]
    });
  }
};

Blockly.Blocks['motion_mpython_hcsr04_ultrasonic_init'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_HSCR04_ULTRASONIC_INIT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NAME",
        },
        {
          "type": "field_dropdown",
          "name": "TRIGGER",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT0, '0'],
            [Blockly.Msg.MPYTHON_PIN_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_OPT6, '6'],
            [Blockly.Msg.MPYTHON_PIN_OPT7, '7'],
            [Blockly.Msg.MPYTHON_PIN_OPT8, '8'],
            [Blockly.Msg.MPYTHON_PIN_OPT9, '9'],
            [Blockly.Msg.MPYTHON_PIN_OPT13, '13'],
            [Blockly.Msg.MPYTHON_PIN_OPT14, '14'],
            [Blockly.Msg.MPYTHON_PIN_OPT15, '15'],
            [Blockly.Msg.MPYTHON_PIN_OPT16, '16'],
            [Blockly.Msg.MPYTHON_PIN_OPT19, '19'],
            [Blockly.Msg.MPYTHON_PIN_OPT20, '20'],
          ]
        },
        {
          "type": "field_dropdown",
          "name": "ECHO",
          "options": [
            [Blockly.Msg.MPYTHON_PIN_OPT0, '0'],
            [Blockly.Msg.MPYTHON_PIN_OPT1, '1'],
            [Blockly.Msg.MPYTHON_PIN_OPT6, '6'],
            [Blockly.Msg.MPYTHON_PIN_OPT7, '7'],
            [Blockly.Msg.MPYTHON_PIN_OPT8, '8'],
            [Blockly.Msg.MPYTHON_PIN_OPT9, '9'],
            [Blockly.Msg.MPYTHON_PIN_OPT13, '13'],
            [Blockly.Msg.MPYTHON_PIN_OPT14, '14'],
            [Blockly.Msg.MPYTHON_PIN_OPT15, '15'],
            [Blockly.Msg.MPYTHON_PIN_OPT16, '16'],
            [Blockly.Msg.MPYTHON_PIN_OPT19, '19'],
            [Blockly.Msg.MPYTHON_PIN_OPT20, '20'],
          ]
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_mpython_hcsr04_ultrasonic_distance_unit'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_PIN_HSCR04_ULTRASONIC_DISTANCE_UNIT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/mpython/icon_Mpython.svg",
          "width": 40,
          "height": 30
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "NAME",
        },
        {
          "type": "field_dropdown",
          "name": "UNIT",
          "options": [
            ['mm', 'mm'],
            ['cm', 'cm']
          ]
        },
      ],
      "category": Blockly.Categories.pin,
      "extensions": ["colours_mpython_pin", "output_number"]
    });
  }
};