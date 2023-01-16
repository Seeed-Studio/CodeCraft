'use strict';

goog.provide('Blockly.Blocks.arduino');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

var D2D13 = [
    ['D2', '2'],
    ['D3', '3'],
    ['D4', '4'],
    ['D5', '5'],
    ['D6', '6'],
    ['D7', '7'],
    ['D8', '8'],
    ['D9', '9'],
    ['D10', '10'],
    ['D11', '11'],
    ['D12', '12'],
    ['D13', '13'],
    ['D14', '14'],
    ['D15', '15'],

    ['D46', '46'],
    ['D47', '47'],
    ['D48', '48'],
    ['D49', '49'],
];

var P0P13 = [
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
    ['12', '12'],
    ['13', '13'],
    ['14', '14'],
    ['15', '15'],

    ['46', '46'],
    ['47', '47'],
    ['48', '48'],
    ['49', '49'],
];


var A0A7 = [
    ['A0', 'A0'],
    ['A1', 'A1'],
    ['A2', 'A2'],
    ['A3', 'A3'],
    ['A4', 'A4'],
    ['A5', 'A5'],
    ['A6', 'A6'],
    ['A7', 'A7']
];

var extensions = {
    "INPUT_NUMBER": ["colours_sensing", "output_number"],
    "INPUT_BOOL": ["colours_sensing", "output_boolean"],
    "OUTPUT": ["colours_looks", "shape_statement"]
}
//创建代码块
function createBlock(img, extensions, msgKey, args = []) {
    if (img) return {
        init: function () {
            this.jsonInit({
                "message0": Blockly.Msg[msgKey],
                "args0": [
                    {
                        "type": "field_image",
                        "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/" + img.name,
                        "width": img.width || 40,
                        "height": img.height || 30
                    },
                    {
                        "type": "field_vertical_separator"
                    }
                ].concat(args),
                "extensions": extensions
            });
        }
    };
    else return {
        init: function () {
            this.jsonInit({
                "message0": Blockly.Msg[msgKey],
                "args0": args,
                "extensions": extensions
            });
        }
    };
}

/** 输入 ----------------------------- */

//数字输入
Blockly.Blocks['motion_arduino_figure_input'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_FIGURE_INPUT,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN",
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
                        ['12', '12'],
                        ['13', '13'],
                        ['14', '14'],
                        ['15', '15'],

                        ['46', '46'],
                        ['47', '47'],
                        ['48', '48'],
                        ['49', '49'],
                    ].concat([
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ])
                }
            ],
            "extensions": ["colours_arduino_input", "output_number"]
        });
    }
}

// createBlock(null, ["colours_arduino_input", "output_number"],
//     'ARDUINO_FIGURE_INPUT',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "PIN",
//             "options": P0P13.concat(A0A7)
//         }
//     ]
// );

// 模拟输入
Blockly.Blocks['motion_arduino_analog_input'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_ANALOG_INPUT,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ]
                }
            ],
            "extensions": ["colours_arduino_input", "output_number"]
        });
    }
}

//   createBlock(null, ["colours_arduino_input", "output_number"],
//     'ARDUINO_ANALOG_INPUT',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "PIN",
//             "options": A0A7
//         }
//     ]
// );


//系统运行时间
Blockly.Blocks['motion_arduino_sys_time'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SYS_TIME,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        ['ms', 'ms'],
                        ['us', 'us']
                    ]
                }
            ],
            "extensions": ["colours_arduino_input", "output_number"]
        });
    }
}


// createBlock(null, ["colours_arduino_input", "output_number"],
//     'ARDUINO_SYS_TIME',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "TYPE",
//             "options": [
//                 ['ms', 'ms'],
//                 ['us', 'us']
//             ]
//         }
//     ]
// );
//脉冲长度 
Blockly.Blocks['motion_arduino_pulse_len'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_PULSE_LEN,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN",
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
                        ['12', '12'],
                        ['13', '13'],
                        ['14', '14'],
                        ['15', '15'],

                        ['46', '46'],
                        ['47', '47'],
                        ['48', '48'],
                        ['49', '49'],
                    ].concat([
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ])
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
            "extensions": ["colours_arduino_input", "output_number"]
        });
    }
}


//   createBlock(null, ["colours_arduino_input", "output_number"],
//     'ARDUINO_PULSE_LEN',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "PIN",
//             "options": P0P13.concat(A0A7)
//         },
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         }
//     ]
// );

//脉冲长度超时
Blockly.Blocks['motion_arduino_pulse_len_us'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_PULSE_LEN_US,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN",
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
                        ['12', '12'],
                        ['13', '13'],
                        ['14', '14'],
                        ['15', '15'],

                        ['46', '46'],
                        ['47', '47'],
                        ['48', '48'],
                        ['49', '49'],
                    ].concat([
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ])
                },
                {
                    "type": "field_dropdown",
                    "name": "STAT",
                    "options": [
                        ['ON', 'HIGH'],
                        ['OFF', 'LOW']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "TIME"
                }
            ],
            "extensions": ["colours_arduino_input", "output_number"]
        });
    }
}


//   createBlock(null, ["colours_arduino_input", "output_number"],
//     'ARDUINO_PULSE_LEN_US',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "PIN",
//             "options": P0P13.concat(A0A7)
//         },
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         },
//         {
//             "type": "input_value",
//             "name": "TIME"
//         }
//     ]
// );






/** 输出 ----------------------------- */

//数字输出
Blockly.Blocks['motion_arduino_figure_output'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_FIGURE_OUTPUT,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN",
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
                        ['12', '12'],
                        ['13', '13'],
                        ['14', '14'],
                        ['15', '15'],

                        ['46', '46'],
                        ['47', '47'],
                        ['48', '48'],
                        ['49', '49'],
                    ].concat([
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ])
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
            "extensions": ["colours_arduino_output", "shape_statement"],
        });
    }
}


//   createBlock(null, ["colours_arduino_output", "shape_statement"],
//     'ARDUINO_FIGURE_OUTPUT',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "PIN",
//             "options": P0P13.concat(A0A7)
//         },
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         }
//     ]
// );

//模拟输出
Blockly.Blocks['motion_arduino_analog_output'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_ANALOG_OUTPUT,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['3', '3'],
                        ['5', '5'],
                        ['6', '6'],
                        ['9', '9'],
                        ['10', '10'],
                        ['11', '11'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "NUM"
                }
            ],
            "extensions": ["colours_arduino_output", "shape_statement"],
        });
    }
}

// createBlock(null, ["colours_arduino_output", "shape_statement"],
//     'ARDUINO_ANALOG_OUTPUT',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "PIN",
//             "options": [
//                 ['3', '3'],
//                 ['5', '5'],
//                 ['6', '6'],
//                 ['9', '9'],
//                 ['10', '10'],
//                 ['11', '11'],
//             ]
//         },
//         {
//             "type": "input_value",
//             "name": "NUM"
//         }
//     ]
// );





/** 串口 ----------------------------- */

//串口 波特率 300，1200，2400，4800，9600，14400，19200，28800，38400，57600，115200
Blockly.Blocks['motion_arduino_serial_baud_rate'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SERIAL_BAUD_RATE,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "BR",
                    "options": [
                        ['9600', '9600'],
                        ['300', '300'],
                        ['1200', '1200'],
                        ['4800', '4800'],
                        ['14400', '14400'],
                        ['19200', '19200'],
                        ['28800', '28800'],
                        ['38400', '38400'],
                        ['57600', '57600'],
                        ['115200', '115200']
                    ]
                }
            ],
            "extensions": ["colours_arduino_serial", "shape_statement"],
        });
    }
}

//   createBlock(null, ["colours_arduino_serial", "shape_statement"],
//     'ARDUINO_SERIAL_BAUD_RATE',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "BR",
//             "options": [
//                 ['9600', '9600'],
//                 ['300', '300'],
//                 ['1200', '1200'],
//                 ['4800', '4800'],
//                 ['14400', '14400'],
//                 ['19200', '19200'],
//                 ['28800', '28800'],
//                 ['38400', '38400'],
//                 ['57600', '57600'],
//                 ['115200', '115200']
//             ]
//         }
//     ]
// );

//串口 写入文本
Blockly.Blocks['motion_arduino_serial_print'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SERIAL_PRINT,
            "args0": [
                {
                    "type": "input_value",
                    "name": "TEXT"
                }
            ],
            "extensions": ["colours_arduino_serial", "shape_statement"],
        });
    }
}

//   createBlock(null, ["colours_arduino_serial", "shape_statement"],
//     'ARDUINO_SERIAL_PRINT',
//     [
//         {
//             "type": "input_value",
//             "name": "TEXT"
//         }
//     ]
// );

// 串口 是否有字符
Blockly.Blocks['motion_arduino_serial_is_readable'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SERIAL_IS_READABLE,
            "extensions": ["colours_arduino_serial", "output_boolean"]
        });
    }
}
//   createBlock(null, ["colours_arduino_serial", "output_boolean"],
//     'ARDUINO_SERIAL_IS_READABLE'
// );

//串口 读取字符串
Blockly.Blocks['motion_arduino_serial_read'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SERIAL_READ,
            "extensions": ["colours_arduino_serial", "output_number"],
        });
    }
}

//   createBlock(null, ["colours_arduino_serial", "output_number"],
//     'ARDUINO_SERIAL_READ'
// );

//串口 字符串转数值
Blockly.Blocks['motion_arduino_serial_strtonumber'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SERIAL_STR_TONUMBER,
            "args0": [
                {
                    "type": "input_value",
                    "name": "TEXT"
                }
            ],
            "extensions": ["colours_arduino_serial", "output_number"],
        });
    }
}


Blockly.Blocks['motion_arduino_serial_chart_print'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.FIGURE_PLOTTER_PRINT,
            "args0": [
                {
                    "type": "input_value",
                    "name": "ARGS_0"
                },
                {
                    "type": "input_value",
                    "name": "ARGS_1"
                },
                {
                    "type": "input_value",
                    "name": "ARGS_2"
                },
                {
                    "type": "input_value",
                    "name": "ARGS_3"
                },
                {
                    "type": "input_value",
                    "name": "ARGS_4"
                }
            ],
            "extensions": ["colours_arduino_serial", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_broadcast_menu'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "BROADCAST_OPTION",
                    "variableTypes": [Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE],
                    "variable": Blockly.Msg.DEFAULT_BROADCAST_MESSAGE_NAME
                }
            ],
            // "colour": Blockly.Colours.event.secondary,
            // "colourSecondary": Blockly.Colours.event.secondary,
            // "colourTertiary": Blockly.Colours.event.tertiary,
            "extensions": ["colours_arduino_serial", "output_string"]
        });
    }
};

Blockly.Blocks['motion_arduino_broadcast'] = {
    init: function () {
        this.jsonInit({
            // "id": "event_broadcast",
            "message0": Blockly.Msg.ARDUINO_BROADCAST,
            "args0": [
                {
                    "type": "input_value",
                    "name": "BROADCAST_INPUT"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            // "category": Blockly.Categories.event,
            "extensions": ["colours_arduino_serial", "shape_statement"]
        });
    }
};


//    createBlock(null, ["colours_arduino_serial", "output_number"],
//     'ARDUINO_SERIAL_STR_TONUMBER',
//     [
//         {
//             "type": "input_value",
//             "name": "TEXT"
//         }
//     ]
// );


/** control ----------------------------- */

//延时 毫秒
Blockly.Blocks['motion_arduino_delay_ms'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_DELAY_MS,
            "args0": [
                {
                    "type": "input_value",
                    "name": "TIME"
                }
            ],
            "extensions": ["colours_control", "shape_statement"],
        });
    }
}

//   createBlock(null, ["colours_control", "shape_statement"],
//     'ARDUINO_DELAY_MS',
//     [
//         {
//             "type": "input_value",
//             "name": "TIME"
//         }
//     ]
// );

//延时 微秒
Blockly.Blocks['motion_arduino_delay_us'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_DELAY_US,
            "args0": [
                {
                    "type": "input_value",
                    "name": "TIME"
                }
            ],
            "extensions": ["colours_control", "shape_statement"],
        });
    }
}

// createBlock(null, ["colours_control", "shape_statement"],
//     'ARDUINO_DELAY_US',
//     [
//         {
//             "type": "input_value",
//             "name": "TIME"
//         }
//     ]
// );

Blockly.Blocks['motion_arduino_for'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_FOR1,
            "message1": Blockly.Msg.ARDUINO_FOR2,
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VARIABLE"
                },
                {
                    "type": "input_value",
                    "name": "A",
                },
                {
                    "type": "input_value",
                    "name": "B",
                },
                {
                    "type": "input_value",
                    "name": "C",
                }
            ],
            "args1": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK"
                }
            ],
            "extensions": ["colours_control", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_break'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_BREAK,
            "extensions": ["colours_control", "shape_statement"]
        });
    }
};

Blockly.Blocks['operator_lt_equals'] = {
    init: function () {
        this.jsonInit({
            "message0": '%1 <= %2',
            "args0": [
                {
                    "type": "input_value",
                    "name": "OPERAND1"
                },
                {
                    "type": "input_value",
                    "name": "OPERAND2"
                }
            ],
            "category": Blockly.Categories.operators,
            "extensions": ["colours_operators", "output_boolean"]
        });
    }
};


Blockly.Blocks['operator_gt_equals'] = {
    init: function () {
        this.jsonInit({
            "message0": '%1 >= %2',
            "args0": [
                {
                    "type": "input_value",
                    "name": "OPERAND1"
                },
                {
                    "type": "input_value",
                    "name": "OPERAND2"
                }
            ],
            "category": Blockly.Categories.operators,
            "extensions": ["colours_operators", "output_boolean"]
        });
    }
};

Blockly.Blocks['operator_not_equals'] = {
    init: function () {
        this.jsonInit({
            "message0": '%1 != %2',
            "args0": [
                {
                    "type": "input_value",
                    "name": "OPERAND1"
                },
                {
                    "type": "input_value",
                    "name": "OPERAND2"
                }
            ],
            "category": Blockly.Categories.operators,
            "extensions": ["colours_operators", "output_boolean"]
        });
    }
};


Blockly.Blocks['motion_arduino_setup_loop'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SETUP_LOOP0,
            "message1": "%1",
            "message2": Blockly.Msg.ARDUINO_SETUP_LOOP2,
            "message3": "%1",
            "args1": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK1"
                }
            ],
            "args3": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK2"
                }
            ],
            "extensions": ["colours_event", "shape_hat"]
            // , "shape_end"
        });
    }
};

Blockly.Blocks['motion_arduino_repeat'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_REPEAT,
            "message1": "%1",
            "message2": "%1",
            "lastDummyAlign2": "RIGHT",
            "args0": [
                {
                    "type": "input_value",
                    "name": "CONDITION",
                    "check": "Boolean"
                }
            ],
            "args1": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK"
                }
            ],
            "args2": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
                    "width": 24,
                    "height": 24,
                    "alt": "*",
                    "flip_rtl": true
                }
            ],
            "extensions": ["colours_control", "shape_statement"]
        });
    }
};

// 一直等待
Blockly.Blocks['motion_arduino_keep_wait'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_KEEP_WAIT,
            "extensions": ['shape_end', 'colours_control'],
        });
    }
}

//   createBlock(null, ['shape_end', 'colours_control'],
//     'ARDUINO_KEEP_WAIT'
// );







/** grove数字 ----------------------------- */

var figureBlockArgs = [
    {
        "type": "field_dropdown",
        "name": "PIN",
        "options": [
            ['D2', '2'],
            ['D3', '3'],
            ['D4', '4'],
            ['D5', '5'],
            ['D6', '6'],
            ['D7', '7'],
            ['D8', '8'],
            ['D9', '9'],
            ['D10', '10'],
            ['D11', '11'],
            ['D12', '12'],
            ['D13', '13'],
            ['D14', '14'],
            ['D15', '15'],

            ['D46', '46'],
            ['D47', '47'],
            ['D48', '48'],
            ['D49', '49'],
        ]
    }
];

//水分子检测传感器（Water Sensor）
Blockly.Blocks['motion_arduino_seeed_water'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_WATER,
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
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

//   createBlock({ name: 'water.svg', width: 65 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_WATER', figureBlockArgs);

// 倾斜传感器
Blockly.Blocks['motion_arduino_seeed_tilt'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_TILT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/tilt.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

//   createBlock({ name: 'tilt.svg', width: 48 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_TILT', figureBlockArgs);

//红外接近传感器（Line Finder）
Blockly.Blocks['motion_arduino_seeed_line_finder'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_LINE_FINDER,
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
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}


//   createBlock({ name: 'line_finder.svg', width: 48 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_LINE_FINDER', figureBlockArgs);

//红外接近传感器（Line Finder）
Blockly.Blocks['motion_arduino_seeed_line_finder_r'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_LINE_FINDER_R,
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
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

Blockly.Blocks['motion_arduino_seeed_line_finder_rcolor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_LINE_FINDER_R_COLOR,
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
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },  {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        [Blockly.Msg.ARDUINO_SEEED_LINE_FINDER_R_COLOR_OPT1, '0'],
                        [Blockly.Msg.ARDUINO_SEEED_LINE_FINDER_R_COLOR_OPT2, '1'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

//   createBlock({ name: 'line_finder.svg', width: 48 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_LINE_FINDER_R', figureBlockArgs);

//超声波测距传感器（Ultrasonic Ranger）
Blockly.Blocks['motion_arduino_seeed_ult'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_ULT,
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
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_number"],
        });
    }
}

//   createBlock({ name: 'ult.svg', width: 65 }, ["colours_arduino_grove_igure", "output_number"],
//     'ARDUINO_SEEED_ULT', figureBlockArgs);

// 按钮按键
Blockly.Blocks['motion_arduino_seeed_btn'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_BTN,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/btn.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

//   createBlock({ name: 'btn.svg', width: 48 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_BTN', figureBlockArgs);

//舵机
Blockly.Blocks['motion_arduino_seeed_servo_read_degrees'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_SERVO_READ_DEGREES,
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
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}


//   createBlock({ name: 'servo.svg', width: 48 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_SERVO_READ_DEGREES', figureBlockArgs);

// 磁力开关（Magnetic Switch）
Blockly.Blocks['motion_arduino_seeed_magnetic_switch'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_MAGNETIC_SWITCH,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/magnetic_switch.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

//   createBlock({ name: 'magnetic_switch.svg', width: 48 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_MAGNETIC_SWITCH', figureBlockArgs);

//人体红外传感器（PIR Motion Sensor）
Blockly.Blocks['motion_arduino_seeed_pir_motion'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_PIR_MOTION,
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
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

//   createBlock({ name: 'pir_motion.svg', width: 65 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_PIR_MOTION', figureBlockArgs);

//火焰传感器（Flame Sensor）
Blockly.Blocks['motion_arduino_seeed_flame'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_FLAME,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/flame.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

//   createBlock({ name: 'flame.svg', width: 48 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_FLAME', figureBlockArgs);

//碰撞传感器（Collision Sensor）
Blockly.Blocks['motion_arduino_seeed_collision'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_COLLISION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/collision.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

// createBlock({ name: 'collision.svg', width: 48 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_COLLISION', figureBlockArgs);

// 霍尔电磁开关（Hall Sensor）
Blockly.Blocks['motion_arduino_seeed_hall'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_HALL,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/hall.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

//   createBlock({ name: 'hall.svg', width: 48 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_HALL', figureBlockArgs);

//触摸传感器
Blockly.Blocks['motion_arduino_seeed_touch'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_TOUCH,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/seeed_touch.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

Blockly.Blocks['motion_arduino_seeed_read_gesture'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg.ARDUINO_SEEED_READ_GESTURE,
        "args0": [
          {
            "type": "field_image",
            "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/gesture.svg",
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

//   createBlock({ name: 'seeed_touch.svg', width: 48 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_TOUCH', figureBlockArgs);

//手势识别传感器 (Gesture)  向上；向下 ； 向左  ；向右 ； 向前 ；向后 ； 顺时针 ； 逆时针 ；挥手
Blockly.Blocks['motion_arduino_seeed_gesture'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_GESTURE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/gesture.svg",
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
                        [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT0, 'GES_UP_FLAG'],
                        [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT1, 'GES_DOWN_FLAG'],
                        [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT2, 'GES_LEFT_FLAG'],
                        [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT3, 'GES_RIGHT_FLAG'],
                        [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT4, 'GES_FORWARD_FLAG'],
                        [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT5, 'GES_BACKWARD_FLAG'],
                        [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT6, 'GES_CLOCKWISE_FLAG'],
                        [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT7, 'GES_COUNT_CLOCKWISE_FLAG'],
                        [Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT8, 'GES_WAVE_FLAG']
                    ]
                }

            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};


//语音识别传感器 (Speech_Recognizer) Turn on the light；Turn off the light；Play music ；Pause； Next ；Previous； Up； Down ；
//Turn on the TV；Turn off the TV；Increase temperature；Decrease temperature；What’s the time；Open the door；Close the door；Left；Right；Stop；Start；Mode 1；Mode 2；Go
Blockly.Blocks['motion_arduino_seeed_speech_recognizer'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_SPEECH_RECOGNIZER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/speech_recognizer.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        ['Turn on the light', '0'],
                        ['Turn off the light', '1'],
                        ['Play music', '2'],
                        ['Pause', '3'],
                        ['Next', '4'],
                        ['Previous', '5'],
                        ['Up', '6'],
                        ['Down', '7'],
                        ['Turn on the TV', '8'],
                        ['Turn off the TV', '9'],
                        ['Increase temperature', '10'],
                        ['Decrease temperature', '11'],
                        ['What’s the time', '12'],
                        ['Open the door', '13'],
                        ['Close the door', '14'],
                        ['Left', '15'],
                        ['Right', '16'],
                        ['Stop', '17'],
                        ['Start', '18'],
                        ['Mode 1', '19'],
                        ['Mode 2', '20'],
                        ['Go', '21']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

//   createBlock({ name: 'speech_recognizer.svg', width: 65 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_SPEECH_RECOGNIZER',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "OPT",
//             "options": [
//                 ['Turn on the light', '0'],
//                 ['Turn off the light', '1'],
//                 ['Play music', '2'],
//                 ['Pause', '3'],
//                 ['Next', '4'],
//                 ['Previous', '5'],
//                 ['Up', '6'],
//                 ['Down', '7'],
//                 ['Turn on the TV', '8'],
//                 ['Turn off the TV', '9'],
//                 ['Increase temperature', '10'],
//                 ['Decrease temperature', '11'],
//                 ['What’s the time', '12'],
//                 ['Open the door', '13'],
//                 ['Close the door', '14'],
//                 ['Left', '15'],
//                 ['Right', '16'],
//                 ['Stop', '17'],
//                 ['Start', '18'],
//                 ['Mode 1', '19'],
//                 ['Mode 2', '20'],
//                 ['Go', '21']
//             ]
//         }
//     ]
// );


Blockly.Blocks['motion_arduino_seeed_speech_recognizer_getvalue'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_SPEECH_RECOGNIZER_GETVALUE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/speech_recognizer.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_number"],
        });
    }
}

//   createBlock({ name: 'speech_recognizer.svg', width: 65 }, ["colours_arduino_grove_igure", "output_number"],
//     'ARDUINO_SEEED_SPEECH_RECOGNIZER_GETVALUE',
//     [
//         figureBlockArgs[0]
//     ]
// );


//舵机
Blockly.Blocks['motion_arduino_seeed_servo_move'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_SERVO_MOVE,
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
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
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

//   createBlock({ name: 'servo.svg', width: 48 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_SERVO_MOVE',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "input_value",
//             "name": "DEGREES"
//         },
//         {
//             "type": "input_value",
//             "name": "DELAY_TIME"
//         }
//     ]
// );

// //LED灯
Blockly.Blocks['motion_arduino_seeed_led'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_LED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/LED.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
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

//   createBlock({ name: 'LED.svg', width: 48 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_LED',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         }
//     ]
// );

// //蜂鸣器 buzzer
Blockly.Blocks['motion_arduino_seeed_buzzer'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_BUZZER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/buzzer.svg",
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
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "STAT",
                    "options": [
                        ['ON', '100'],
                        ['OFF', '0']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"],
        });
    }
}

//   createBlock({ name: 'buzzer.svg', width: 48 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_BUZZER',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         }
//     ]
// );

//继电器
Blockly.Blocks['motion_arduino_seeed_relay'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_RELAY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/relay.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
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

//   createBlock({ name: 'relay.svg', width: 65 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_RELAY',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         }
//     ]
// );

//4位数码显示管 （4 Digit Display）
Blockly.Blocks['motion_arduino_seeed_4digit_display'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_4DIGIT_DISPLAY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/4digit_display.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "NUM"
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"],
        });
    }
}

//   createBlock({ name: '4digit_display.svg', width: 65 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_4DIGIT_DISPLAY',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "input_value",
//             "name": "NUM"
//         }
//     ]
// );

//全彩RGB LED灯  （Chainable RGB LED）
Blockly.Blocks['motion_arduino_seeed_rgb_led'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_RGB_LED,
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
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
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


// createBlock({ name: 'rgb_led.svg', width: 65 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_RGB_LED',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "input_value",
//             "name": "COLOR"
//         },
//         {
//             "type": "field_dropdown",
//             "name": "NUM",
//             "options": [
//                 ['1', '0'],
//                 ['2', '1'],
//                 ['3', '2'],
//                 ['4', '3'],
//                 ['5', '4'],
//                 ['6', '5'],
//                 ['7', '6'],
//                 ['8', '7'],
//                 ['9', '8'],
//                 ['10', '9'],
//             ]
//         }
//     ]
// );

Blockly.Blocks['motion_arduino_seeed_rgb_led1'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_RGB_LED1,
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
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "R"
                },
                {
                    "type": "input_value",
                    "name": "G"
                },
                {
                    "type": "input_value",
                    "name": "B"
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


//   createBlock({ name: 'rgb_led.svg', width: 65 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_RGB_LED1',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "input_value",
//             "name": "R"
//         },
//         {
//             "type": "input_value",
//             "name": "G"
//         },
//         {
//             "type": "input_value",
//             "name": "B"
//         },
//         {
//             "type": "field_dropdown",
//             "name": "NUM",
//             "options": [
//                 ['1', '0'],
//                 ['2', '1'],
//                 ['3', '2'],
//                 ['4', '3'],
//                 ['5', '4'],
//                 ['6', '5'],
//                 ['7', '6'],
//                 ['8', '7'],
//                 ['9', '8'],
//                 ['10', '9'],
//             ]
//         }
//     ]
// );

//扬声器 （Speaker）
// C3,D3,E3,F3,G3,A3,B3,C4,D4,E4,F4,G4,A4,B4,C5,D5,E5,F5,G5,A5,B5,结束声音
// 1，1/2, 1/4, 1/8, 1/16, 2, 4, 8
Blockly.Blocks['motion_arduino_seeed_speaker'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_SPEAKER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/speaker.svg",
                    "width": 70,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "NOTE",
                    "options": [
                        ['C3', '0'], ['D3', '1'], ['E3', '2'], ['F3', '3'], ['G3', '4'], ['A3', '5'], ['B3', '6'],
                        ['C4', '7'], ['D4', '8'], ['E4', '9'], ['F4', '10'], ['G4', '11'], ['A4', '12'], ['B4', '13'],
                        ['C5', '14'], ['D5', '15'], ['E5', '16'], ['F5', '17'], ['G5', '18'], ['A5', '19'], ['B5', '20'],
                        ['结束声音', '21']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "BEAT",
                    "options": [
                        ['1', '1'],
                        ['1/2', '1/2'],
                        ['1/4', '1/4'],
                        ['1/8', '1/8'],
                        ['2', '2'],
                        ['4', '4'],
                        ['8', '8']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "shape_statement"],
        });
    }
}


Blockly.Blocks['motion_arduino_buzzer_speaker'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_BUZZER_SPEAKER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/buzzer.svg",
                    "width": 70,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "NOTE",
                    "options": [
                        ['C3', '131'], ['D3', '147'], ['E3', '165'], ['F3', '175'], ['G3', '196'], ['A3', '220'], ['B3', '247'],
                        ['C4', '262'], ['D4', '294'], ['E4', '330'], ['F4', '349'], ['G4', '392'], ['A4', '440'], ['B4', '494'],
                        ['C5', '523'], ['D5', '587'], ['E5', '659'], ['F5', '698'], ['G5', '784'], ['A5', '880'], ['B5', '988'],
                        ['结束声音', '21']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "BEAT",
                    "options": [
                        ['1', '1'],
                        ['1/2', '1/2'],
                        ['1/4', '1/4'],
                        ['1/8', '1/8'],
                        ['2', '2'],
                        ['4', '4'],
                        ['8', '8']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "shape_statement"],
        });
    }
}


// createBlock({ name: 'speaker.svg', width: 70 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_SPEAKER',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "NOTE",
//             "options": [
//                 ['C3', '0'], ['D3', '1'], ['E3', '2'], ['F3', '3'], ['G3', '4'], ['A3', '5'], ['B3', '6'],
//                 ['C4', '7'], ['D4', '8'], ['E4', '9'], ['F4', '10'], ['G4', '11'], ['A4', '12'], ['B4', '13'],
//                 ['C5', '14'], ['D5', '15'], ['E5', '16'], ['F5', '17'], ['G5', '18'], ['A5', '19'], ['B5', '20'],
//                 ['结束声音', '21']
//             ]
//         },
//         {
//             "type": "field_dropdown",
//             "name": "BEAT",
//             "options": [
//                 ['1', '1'],
//                 ['1/2', '1/2'],
//                 ['1/4', '1/4'],
//                 ['1/8', '1/8'],
//                 ['2', '2'],
//                 ['4', '4'],
//                 ['8', '8']
//             ]
//         }
//     ]
// );

//录音播放模块 （Recorder)
Blockly.Blocks['motion_arduino_seeed_recorder'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_RECORDER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/recorder.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
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

//   createBlock({ name: 'recorder.svg', width: 65 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_RECORDER',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         }
//     ]
// );

//冷光条驱动 （EL Driver）
Blockly.Blocks['motion_arduino_seeed_el_driver'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_EL_DRIVER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/el_driver.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
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

// createBlock({ name: 'el_driver.svg', width: 65 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_EL_DRIVER',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         }
//     ]
// );


// 震动马达 Vibration Motor）
Blockly.Blocks['motion_arduino_seeed_vibration_motor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_EL_VIBRATION_MOTOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vibration_motor.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
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

// createBlock({ name: 'vibration_motor.svg', width: 48 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_EL_VIBRATION_MOTOR',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         }
//     ]
// );

//电磁铁模块 （Electromagnet）
Blockly.Blocks['motion_arduino_seeed_electromagnet'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_ELECTROMAGNET,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/electromagnet.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
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

// createBlock({ name: 'electromagnet.svg', width: 65 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_ELECTROMAGNET',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         }
//     ]
// );



//迷你风扇  （Mini Fan）
Blockly.Blocks['motion_arduino_seeed_mini_fan'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_MINI_FAN,
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
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
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

// createBlock({ name: 'mini_fan.svg', width: 48 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_MINI_FAN',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         }
//     ]
// );


function createNnmList(l) {
    var a = [];
    for (var i = 0; i < l; i++) {
        a.push([i.toString(), i.toString()]);
    }
    return a;
}

//LED 灯条 （LED String Light）LED灯条
Blockly.Blocks['motion_arduino_seeed_led_string_light'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_LED_STRING_LIGHT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/led_string_light.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "STAT",
                    "options": function () {
                        var a = [];
                        for (var i = 0; i < 50; i++) {
                            a.push([i.toString(), i.toString()]);
                        }
                        return a;
                    }
                },
                {
                    "type": "input_value",
                    "name": "R"
                },
                {
                    "type": "input_value",
                    "name": "G"
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"],
        });
    }
}


// createBlock({ name: 'led_string_light.svg', width: 48 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_LED_STRING_LIGHT',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": createNnmList(50)
//         },
//         {
//             "type": "input_value",
//             "name": "R"
//         },
//         {
//             "type": "input_value",
//             "name": "G"
//         },
//         {
//             "type": "input_value",
//             "name": "B"
//         }
//     ]
// );

//柱状发光二极管 LED Bar）
Blockly.Blocks['motion_arduino_seeed_led_bar'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_LED_BAR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/led_bar.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        [Blockly.Msg.ARDUINO_SEEED_LED_BAR_OPT1, '1'],
                        [Blockly.Msg.ARDUINO_SEEED_LED_BAR_OPT2, '0']
                    ]

                },
                {
                    "type": "field_dropdown",
                    "name": "STAT",
                    "options": function () {
                        var a = [];
                        for (var i = 0; i < 10; i++) {
                            a.push([i.toString(), i.toString()]);
                        }
                        return a;
                    }
                }

            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"]
        });
    }
};

//环形发光二极管 （Circular LED）
Blockly.Blocks['motion_arduino_seeed_circular_led'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_LED_CIRCULAR_LED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/circular_led.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "STAT",
                    "options": function () {
                        var a = [];
                        for (var i = 0; i < 24; i++) {
                            a.push([i.toString(), i.toString()]);
                        }
                        return a;
                    }
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"],
        });
    }
}


// createBlock({ name: 'circular_led.svg', width: 48 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_LED_CIRCULAR_LED',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": createNnmList(24)
//         }
//     ]
// );







var analogInputBlockArgs = [
    {
        "type": "field_dropdown",
        "name": "PIN",
        "options": [
            ['A0', 'A0'],
            ['A1', 'A1'],
            ['A2', 'A2'],
            ['A3', 'A3'],
            ['A4', 'A4'],
            ['A5', 'A5'],
            ['A6', 'A6'],
            ['A7', 'A7']
        ]
    }
];


//滑动电位开关 Slide Potentionmeter
Blockly.Blocks['motion_arduino_seeed_slide_pot'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_SLIDE_POT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/slide_pot.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "output_number"],
        });
    }
}

// createBlock({ name: 'slide_pot.svg', width: 65 }, ["colours_arduino_grove_analog", "output_number"],
//     'ARDUINO_SEEED_SLIDE_POT', analogInputBlockArgs);

//土壤湿度传感器（Moisture Sensor）
Blockly.Blocks['motion_arduino_seeed_moisture'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_MOISTURE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/moisture.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "output_number"],
        });
    }
}

//   createBlock({ name: 'moisture.svg', width: 65 }, ["colours_arduino_grove_analog", "output_number"],
//     'ARDUINO_SEEED_MOISTURE', analogInputBlockArgs);

//旋转电位计（模拟）
Blockly.Blocks['motion_arduino_seeed_rotation'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_ROTATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/rotation.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "output_number"],
        });
    }
}

//   createBlock({ name: 'rotation.svg', width: 48 }, ["colours_arduino_grove_analog", "output_number"],
//     'ARDUINO_SEEED_ROTATION', analogInputBlockArgs);

// 噪声传感器
Blockly.Blocks['motion_arduino_seeed_sound'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_SOUND,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/sound.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "output_number"],
        });
    }
}

//   createBlock({ name: 'sound.svg', width: 48 }, ["colours_arduino_grove_analog", "output_number"],
//     'ARDUINO_SEEED_SOUND', analogInputBlockArgs);

//光线传感器

Blockly.Blocks['motion_arduino_seeed_light'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_LIGHT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/light.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "output_number"],
        });
    }
}

//   createBlock({ name: 'light.svg', width: 48 }, ["colours_arduino_grove_analog", "output_number"],
//     'ARDUINO_SEEED_LIGHT', analogInputBlockArgs);

//温度传感器
Blockly.Blocks['motion_arduino_seeed_temperature'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_TEMPERATURE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/temperature.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "output_number"],
        });
    }
}

// createBlock({ name: 'temperature.svg', width: 48 }, ["colours_arduino_grove_analog", "output_number"],
//     'ARDUINO_SEEED_TEMPERATURE', analogInputBlockArgs);

//温湿度传感器
// Blockly.Blocks['motion_arduino_seeed_temperature_humidity'] = createBlock({ name: 'temperature_humidity.svg', width: 65 }, ["colours_arduino_grove_igure", "output_number"],
//     'ARDUINO_SEEED_TEMPERATURE_HUMIDITY',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "TH",
//             "options": [
//                 [Blockly.Msg.ARDUINO_SEEED_TEMPERATURE_HUMIDITY_OPT1, '0'],
//                 [Blockly.Msg.ARDUINO_SEEED_TEMPERATURE_HUMIDITY_OPT2, '1']
//             ]
//         }
//     ]
// );
Blockly.Blocks['motion_arduino_seeed_temperature_humidity'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_TEMPERATURE_HUMIDITY,
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
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "TH",
                    "options": [
                        [Blockly.Msg.ARDUINO_SEEED_TEMPERATURE_HUMIDITY_OPT1, '0'],
                        [Blockly.Msg.ARDUINO_SEEED_TEMPERATURE_HUMIDITY_OPT2, '1']
                    ]
                }

            ],
            "extensions": ["colours_arduino_grove_igure", "output_number"]
        });
    }
}

//拇指摇杆(Thumb Joystick)
Blockly.Blocks['motion_arduino_seeed_thumb_joystick'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_THUMB_JOYSTICK,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/thumb_joystick.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "XY",
                    "options": [
                        [Blockly.Msg.ARDUINO_VISION_SENSOR1_EXT_OPT1, '0'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR1_EXT_OPT2, '1']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "output_number"],
        });
    }
}

// createBlock({ name: 'thumb_joystick.svg', width: 65 }, ["colours_arduino_grove_analog", "output_number"],
//     'ARDUINO_SEEED_THUMB_JOYSTICK',
//     [
//         analogInputBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "XY",
//             "options": [
//                 ['X', '0'],
//                 ['Y', '1']
//             ]
//         }
//     ]
// );





//i2c输入
//全彩背光LCD屏 （LCD RGB Backlight）
Blockly.Blocks['motion_arduino_grove_serial_lcd_print'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_PRINT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/serial_lcd_print.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "TEXT1"
                },
                {
                    "type": "input_value",
                    "name": "TEXT2"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"],
        });
    }
}

// createBlock({ name: 'serial_lcd_print.svg', width: 65 }, ["colours_arduino_grove_i2c", "shape_statement"],
//     'ARDUINO_GROVE_SERIAL_LCD_PRINT',
//     [
//         {
//             "type": "input_value",
//             "name": "TEXT1"
//         },
//         {
//             "type": "input_value",
//             "name": "TEXT2"
//         }
//     ]
// );

Blockly.Blocks['motion_arduino_grove_serial_lcd_print2'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_PRINT2,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/serial_lcd_print.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "ROW"
                },
                {
                    "type": "input_value",
                    "name": "COLUMN"
                },
                {
                    "type": "input_value",
                    "name": "TEXT"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"],
        });
    }
}

// createBlock({ name: 'serial_lcd_print.svg', width: 65 }, ["colours_arduino_grove_i2c", "shape_statement"],
//     'ARDUINO_GROVE_SERIAL_LCD_PRINT2',
//     [
//         {
//             "type": "input_value",
//             "name": "ROW"
//         },
//         {
//             "type": "input_value",
//             "name": "COLUMN"
//         },
//         {
//             "type": "input_value",
//             "name": "TEXT"
//         }
//     ]
// );

Blockly.Blocks['motion_arduino_grove_serial_lcd_power'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/serial_lcd_print.svg",
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
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT1, 'display'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT2, 'noDisplay'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT3, 'cursor'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT4, 'noCursor'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT5, 'blink'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT6, 'noBlink'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT7, 'clear']
                    ]
                }

            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};


Blockly.Blocks['motion_arduino_grove_serial_lcd_setrgb'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_SETRGB,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/serial_lcd_print.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "R"
                },
                {
                    "type": "input_value",
                    "name": "G"
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"],
        });
    }
}

// createBlock({ name: 'serial_lcd_print.svg', width: 65 }, ["colours_arduino_grove_i2c", "shape_statement"],
//     'ARDUINO_GROVE_SERIAL_LCD_SETRGB',
//     [
//         {
//             "type": "input_value",
//             "name": "R"
//         },
//         {
//             "type": "input_value",
//             "name": "G"
//         },
//         {
//             "type": "input_value",
//             "name": "B"
//         }
//     ]
// );

//三轴数字加速度 （3 Axis Digital Accelerometer）
Blockly.Blocks['motion_arduino_grove_serial_3ada16'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_3ADA,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/serial_3ada.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "XYZ",
                    "options": [
                        ['X', '0'],
                        ['Y', '1'],
                        ['Z', '2']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_number"],
        });
    }
}

// createBlock({ name: 'serial_3ada.svg', width: 48 }, ["colours_arduino_grove_i2c", "output_number"],
//     'ARDUINO_GROVE_SERIAL_3ADA',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "XYZ",
//             "options": [
//                 ['X', '0'],
//                 ['Y', '1'],
//                 ['Z', '2']
//             ]
//         }
//     ]
// );

//三轴数字加速度 （3 Axis Digital Accelerometer）
Blockly.Blocks['motion_arduino_grove_serial_3ada15'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_3ADA15,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/serial_3ada.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "XYZ",
                    "options": [
                        ['X', '0'],
                        ['Y', '1'],
                        ['Z', '2']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_number"],
        });
    }
}

//三轴数字加速度 （3 Axis Digital Accelerometer-M）
Blockly.Blocks['motion_arduino_grove_serial_3ada_m'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_3ADA_M,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/serial_3ada.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "XYZ",
                    "options": [
                        ['X', '0'],
                        ['Y', '1'],
                        ['Z', '2']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_number"],
        });
    }
}

// createBlock({ name: 'serial_3ada.svg', width: 48 }, ["colours_arduino_grove_i2c", "output_number"],
//     'ARDUINO_GROVE_SERIAL_3ADA15',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "XYZ",
//             "options": [
//                 ['X', '0'],
//                 ['Y', '1'],
//                 ['Z', '2']
//             ]
//         }
//     ]
// );

//多通道触摸传感器 （I2C Touch Sensor）
Blockly.Blocks['motion_arduino_grove_serial_touch'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_TOUCH,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/touch.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "CH",
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
                        ['11', '11']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"],
        });
    }
}

// createBlock({ name: 'touch.svg', width: 48 }, ["colours_arduino_grove_i2c", "output_boolean"],
//     'ARDUINO_GROVE_SERIAL_TOUCH',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "CH",
//             "options": [
//                 ['0', '0'],
//                 ['1', '1'],
//                 ['2', '2'],
//                 ['3', '3'],
//                 ['4', '4'],
//                 ['5', '5'],
//                 ['6', '6'],
//                 ['7', '7'],
//                 ['8', '8'],
//                 ['9', '9'],
//                 ['10', '10'],
//                 ['11', '11']
//             ]
//         }
//     ]
// );

//迷你电机驱动模块 （Mini I2C Motor Driver）
Blockly.Blocks['motion_arduino_grove_serial_mini_motor_driver'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_MINI_MOTOR_DRIVER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/mini_motor.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "CH",
                    "options": [
                        ['M1', 'CH1'],
                        ['M2', 'CH2'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SPEED"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"],
        });
    }
}


// createBlock({ name: 'mini_motor.svg', width: 65 }, ["colours_arduino_grove_i2c", "shape_statement"],
//     'ARDUINO_GROVE_SERIAL_MINI_MOTOR_DRIVER',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "CH",
//             "options": [
//                 ['M1', 'CH1'],
//                 ['M2', 'CH2'],
//             ]
//         },
//         {
//             "type": "input_value",
//             "name": "SPEED"
//         }
//     ]
// );

Blockly.Blocks['motion_arduino_grove_serial_mini_motor_driver_stop'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_MINI_MOTOR_DRIVER_STOP,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/mini_motor.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "CH",
                    "options": [
                        ['M1', 'CH1'],
                        ['M2', 'CH2'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"],
        });
    }
}

// createBlock({ name: 'mini_motor.svg', width: 65 }, ["colours_arduino_grove_i2c", "shape_statement"],
//     'ARDUINO_GROVE_SERIAL_MINI_MOTOR_DRIVER_STOP',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "CH",
//             "options": [
//                 ['M1', 'CH1'],
//                 ['M2', 'CH2'],
//             ]
//         }
//     ]
// );

//RGB矩阵屏 （RGB LED Matrix）
//红，橙，黄，绿，青，蓝，紫，粉红，白
Blockly.Blocks['motion_arduino_grove_serial_rgb_led_matrix_on_point'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/rgb_led_matrix.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
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
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT0, 'red'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT1, 'orange'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT2, 'yellow'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT3, 'green'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT4, 'cyan'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT5, 'blue'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT6, 'purple'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT7, 'pink'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT8, 'white'],
                        [Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT9, 'black']
                    ]
                }

            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};



Blockly.Blocks['motion_arduino_grove_serial_rgb_led_matrix_show_text'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_SHOW_TEXT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/rgb_led_matrix.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "TEXT"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"],
        });
    }
}

//   createBlock({ name: 'rgb_led_matrix.svg', width: 48 }, ["colours_arduino_grove_i2c", "shape_statement"],
//     'ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_SHOW_TEXT',
//     [
//         {
//             "type": "input_value",
//             "name": "TEXT"
//         }
//     ]
// );

Blockly.Blocks['motion_arduino_grove_serial_rgb_led_matrix_show_emoji'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_SHOW_EMOJS,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/rgb_led_matrix.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_rgbmatrix",
                    "name": "SHAPE",
                    "default": ""
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"],
        });
    }
}

// createBlock({ name: 'rgb_led_matrix.svg', width: 48 }, ["colours_arduino_grove_i2c", "shape_statement"],
//     'ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_SHOW_EMOJS',
//     [
//         {
//             "type": "field_rgbmatrix",
//             "name": "SHAPE",
//             "default": ""
//         }
//     ]
// );


Blockly.Blocks['motion_arduino_grove_otto_diy_robot1'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT1,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/otto_diy_robot.svg",
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
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT1_OPT0, '0'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT1_OPT1, '1'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT1_OPT2, '2'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT1_OPT3, '3']

                    ]
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                },
                {
                    "type": "input_value",
                    "name": "T"
                }

            ],
            "extensions": ["colours_arduino_robot_kit", "shape_statement"]
        });
    }
};


//Rest, Jump, Bend, ShakeLeg, UpDown, Swing, TipToeSwing, Jitter, AscendingTurn, Moonwalker, Crusaito, Flapping；默认值Rest
Blockly.Blocks['motion_arduino_grove_otto_diy_robot2'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/otto_diy_robot.svg",
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
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT0, 'Rest'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT1, 'Jump'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT2, 'Bend'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT3, 'ShakeLeg'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT4, 'UpDown'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT5, 'Swing'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT6, 'TipToeSwing'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT7, 'Jitter'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT8, 'AscendingTurn'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT9, 'Moonwalker'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT10, 'Crusaito'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT11, 'Flapping']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "STEPS"
                },
                {
                    "type": "input_value",
                    "name": "T"
                },
                {
                    "type": "field_dropdown",
                    "name": "DIR",
                    "options": [
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT12, '0'],
                        [Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT13, '1']
                    ]
                }
            ],
            "extensions": ["colours_arduino_robot_kit", "shape_statement"]
        });
    }
};



Blockly.Blocks['motion_arduino_shield_bot2'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SHIELD_BOT2,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/shield_bot.svg",
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
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT1, 'middle'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT2, 'left'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT3, 'most-left'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT4, 'right'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT5, 'most-right'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT6, 'lose']
                    ]
                }
            ],
            "extensions": ["colours_arduino_robot_kit", "output_boolean"]
        });
    }
};


Blockly.Blocks['motion_arduino_shield_bot1'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SHIELD_BOT1,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/shield_bot.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DIR",
                    "options": [
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT1, 'forward'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT2, 'back'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT3, 'left'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT4, 'right'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT5, 'stop']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "V",
                    "options": [
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT6, 'low'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT7, 'middle'],
                        [Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT8, 'high']
                    ]
                },


            ],
            "extensions": ["colours_arduino_robot_kit", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_color_read_sensor'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg.ARDUINO_COLOR_READ_SENSOR,
        "args0": [
          {
            "type": "field_image",
            "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/color_sensor.svg",
            "width": 65,
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

Blockly.Blocks['motion_arduino_color_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_COLOR_SENSOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/color_sensor.svg",
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
                        [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT1, 'red'],
                        [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT2, 'green'],
                        [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT3, 'blue'],
                        [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT4, 'black'],
                        [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT5, 'white'],
                        [Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT6, 'other']

                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};
//图像交通标示卡片手势检测
Blockly.Blocks['motion_arduino_traffic_read_sensor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_READ_TRAFFIC_SENSOR,
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

//图像数字卡片手势检测
Blockly.Blocks['motion_arduino_number_read_sensor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_READ_NUMBER_SENSOR,
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

//图像图形卡片手势检测
Blockly.Blocks['motion_arduino_symbol_read_sensor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_READ_SYMBOL_SENSOR,
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

//图像运动手势开启
Blockly.Blocks['motion_arduino_gesture_read_sensor'] = {
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_VISION_READ_GESTURE_SENSOR,
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

      ],
      "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
    });
  }
};

Blockly.Blocks['motion_arduino_webserver_init'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_WEBSERVER_INIT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/E.svg",
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
                        [Blockly.Msg.ARDUINO_WEBSERVER_INIT_OPT1, '1'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SSID",
                },
                {
                    "type": "input_value",
                    "name": "PWD",
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_webserver_show'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_WEBSERVER_SHOW,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/E.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "NO",
                    "options": [
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
                },
                {
                    "type": "field_dropdown",
                    "name": "IMG",
                    "options": [
                        [Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT1, 'img-water'],
                        [Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT2, 'img-ult'],
                        [Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT3, 'img-Infrared'],
                        [Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT4, 'img-temhum'],
                        [Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT5, 'img-led'],
                        [Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT6, 'img-vibration'],
                        [Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT7, 'img-voltage'],
                        [Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT8, 'img-air'],
                        [Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT9, 'img-flame'],
                        [Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT10, 'img-image'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "NAME",
                },
                {
                    "type": "input_value",
                    "name": "VALUE",
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};





//"电压传感器（模块图片）管脚【A0】(Voltage PIN#[A0])"
Blockly.Blocks['motion_arduino_seeed_voltage'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_VOLTAGE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/voltage.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "output_number"],
        });
    }
}


// createBlock({ name: 'voltage.svg', width: 65 }, ["colours_arduino_grove_analog", "output_number"],
//     'ARDUINO_SEEED_VOLTAGE', analogInputBlockArgs);

//"空气污染传感器Quality
Blockly.Blocks['motion_arduino_seeed_quality'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_QUALITY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/quality.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "output_number"],
        });
    }
}

// createBlock({ name: 'quality.svg', width: 65 }, ["colours_arduino_grove_analog", "output_number"],
//     'ARDUINO_SEEED_QUALITY', analogInputBlockArgs);

//"水分子检测传感器（模块图片）管脚【A0】 (Water level PIN#[A0] )"
Blockly.Blocks['motion_arduino_seeed_water_analog'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_WATER_ANALOG,
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
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5'],
                        ['A6', 'A6'],
                        ['A7', 'A7']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "output_number"],
        });
    }
}

// createBlock({ name: 'water.svg', width: 65 }, ["colours_arduino_grove_analog", "output_number"],
//     'ARDUINO_SEEED_WATER_ANALOG', analogInputBlockArgs);

//震动传感器（模块图片）管脚【D2】(Vibration PIN#[D2]) 
Blockly.Blocks['motion_arduino_seeed_vibration'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_VIBRATION,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/vibration.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_boolean"],
        });
    }
}

// createBlock({ name: 'vibration.svg', width: 65 }, ["colours_arduino_grove_igure", "output_boolean"],
//     'ARDUINO_SEEED_VIBRATION', figureBlockArgs);

//"雾化器（模块图片）管脚【D2】设为【开】（Humidifier PIN#【D2】Stat【ON】）"
Blockly.Blocks['motion_arduino_seeed_humidifier'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_HUMIDIFIER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/humidifier.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
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


// createBlock({ name: 'humidifier.svg', width: 65 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_SEEED_HUMIDIFIER',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "field_dropdown",
//             "name": "STAT",
//             "options": [
//                 ['ON', 'HIGH'],
//                 ['OFF', 'LOW']
//             ]
//         }
//     ]);



Blockly.Blocks['motion_arduino_seeed_led_analog'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SEEED_LED_ANALOG,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/LED.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['3', '3'],
                        ['5', '5'],
                        ['6', '6'],
                        ['9', '9'],
                        ['10', '10'],
                        ['11', '11'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "NUM"
                }
            ],
            "extensions": ["colours_arduino_grove_analog", "shape_statement"],
        });
    }
}
// createBlock({ name: 'LED.svg', width: 48 }, ["colours_arduino_grove_analog", "shape_statement"],
//     'ARDUINO_SEEED_LED_ANALOG',
//     [
//         {
//             "type": "field_dropdown",
//             "name": "PIN",
//             "options": [
//                 ['3', '3'],
//                 ['5', '5'],
//                 ['6', '6'],
//                 ['9', '9'],
//                 ['10', '10'],
//                 ['11', '11'],
//             ]
//         },
//         {
//             "type": "input_value",
//             "name": "NUM"
//         }
//     ]
// );

//图像识别传感器(模块图片)识别球体？(Ball detected?)
Blockly.Blocks['motion_arduino_vision_sensor1'] = {
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
                        [Blockly.Msg.ARDUINO_VISION_SENSOR1_OPT1, 'BALL_TYPE_PING_PONG'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR1_OPT2, 'BALL_TYPE_TENNIS'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};

//图像识别传感器(模块图片)识别球体？(Ball detected?)
Blockly.Blocks['motion_arduino_vision_sensor1_ext'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR1_EXT,
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
                    "name": "XY",
                    "options": [
                        [Blockly.Msg.ARDUINO_VISION_SENSOR1_EXT_OPT1, '1'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR1_EXT_OPT2, '2'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_number"]
        });
    }
};



Blockly.Blocks['motion_arduino_vision_sensor2'] = {
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
                        [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT1, 'CARD_TRAFFIC_FORWARD'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT2, 'CARD_TRAFFIC_LEFT'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT3, 'CARD_TRAFFIC_RIGHT'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT4, 'CARD_TRAFFIC_TRUN_AROUND'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR_OPT5, 'CARD_TRAFFIC_PARK']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};

Blockly.Blocks['motion_arduino_vision_sensor3'] = {
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
                        ['0', 'CARD_NUMBER_0'],
                        ['1', 'CARD_NUMBER_1'],
                        ['2', 'CARD_NUMBER_2'],
                        ['3', 'CARD_NUMBER_3'],
                        ['4', 'CARD_NUMBER_4'],
                        ['5', 'CARD_NUMBER_5'],
                        ['6', 'CARD_NUMBER_6'],
                        ['7', 'CARD_NUMBER_7'],
                        ['8', 'CARD_NUMBER_8'],
                        ['9', 'CARD_NUMBER_9'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};


// 识别图形
Blockly.Blocks['motion_arduino_vision_sensor4'] = {
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
                        [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT1, 'CARD_SHAPE_TICK'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT2, 'CARD_SHAPE_CROSS'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT3, 'CARD_SHAPE_CIRCLE'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT4, 'CARD_SHAPE_SQUARE'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT5, 'CARD_SHAPE_TRIANGLE'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};


// 识别人体
Blockly.Blocks['motion_arduino_vision_sensor5'] = {
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
Blockly.Blocks['motion_arduino_vision_sensor6'] = {
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
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT1, 'CC_COLOR_RED'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT2, 'CC_COLOR_YELLOW'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT3, 'CC_COLOR_GREEN'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT4, 'CC_COLOR_CYAN'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT5, 'CC_COLOR_BLUE'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT6, 'CC_COLOR_PURPLE'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT7, 'CC_COLOR_BLACK'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT8, 'CC_COLOR_WHITE'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR6_OPT9, 'CC_COLOR_OTHER'],
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};

// 获取颜色值
Blockly.Blocks['motion_arduino_vision_sensor7'] = {
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

//气压传感器
Blockly.Blocks['motion_arduino_pressure_sensor'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_PRESSURE_SENSOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_barometer_sensor.svg",
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
                        [Blockly.Msg.ARDUINO_PRESSURE_SENSOR_OPT1, '1'],
                        [Blockly.Msg.ARDUINO_PRESSURE_SENSOR_OPT2, '2'],
                        [Blockly.Msg.ARDUINO_PRESSURE_SENSOR_OPT3, '3']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_number"]
        });
    }
};

//运动手势
Blockly.Blocks['motion_arduino_vision_sensor10'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR10,
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
                        [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT1, 'CARD_UPWARD'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT2, 'CARD_DOWNWARD'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT3, 'CARD_LEFTWARD'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT4, 'CARD_RIGHTWARD'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT5, 'CARD_PUSH_DOWN'],
                        [Blockly.Msg.ARDUINO_VISION_SENSOR10_OPT6, 'CARD_LIFT_UP']  
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "output_boolean"]
        });
    }
};


Blockly.Blocks['motion_arduino_vision_sensor11'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR11,
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

Blockly.Blocks['motion_arduino_vision_sensor12'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_VISION_SENSOR12,
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

// oled
Blockly.Blocks['motion_arduino_oled1'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_OLED1,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_oledmatrix",
                    "name": "SHAPE"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_oled2'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_OLED2,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "TEXT",
                },
                {
                    "type": "input_value",
                    "name": "ROW",
                },
                {
                    "type": "input_value",
                    "name": "COL",
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_oled3'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_OLED3,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/oled_display.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};


Blockly.Blocks['motion_arduino_oled11'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_OLED11,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_oled0.96.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_oled_096matrix",
                    "name": "SHAPE"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_oled22'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_OLED22,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_oled0.96.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "TEXT",
                },
                {
                    "type": "input_value",
                    "name": "ROW",
                },
                {
                    "type": "input_value",
                    "name": "COL",
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_oled33'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_OLED33,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_oled0.96.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_led_strip1'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_LED_STRIP1,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/RGB_LED_Strip.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "R"
                },
                {
                    "type": "input_value",
                    "name": "G"
                },
                {
                    "type": "input_value",
                    "name": "B"
                },
                {
                    "type": "input_value",
                    "name": "NO"
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"],
        });
    }
}



// createBlock({ name: 'RGB_LED_Strip.svg', width: 65 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_LED_STRIP1',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "input_value",
//             "name": "R"
//         },
//         {
//             "type": "input_value",
//             "name": "G"
//         },
//         {
//             "type": "input_value",
//             "name": "B"
//         },
//         {
//             "type": "input_value",
//             "name": "NO"
//         }
//     ]);



Blockly.Blocks['motion_arduino_led_strip2'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_LED_STRIP2,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/RGB_LED_Strip.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13'],
                        ['D14', '14'],
                        ['D15', '15'],

                        ['D46', '46'],
                        ['D47', '47'],
                        ['D48', '48'],
                        ['D49', '49'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "R"
                },
                {
                    "type": "input_value",
                    "name": "G"
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"],
        });
    }
}

Blockly.Blocks['motion_arduino_lotusv_setble'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_LOTUSV_SETBLUETOOTH,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN1",
                    "options": [
                        ['D2', '2#3'],
                        ['D3', '3#4'],
                        ['D4', '4#5'],
                        ['D5', '5#6'],
                        ['D6', '6#7'],
                        ['D7', '7#8']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "ID"
                },
                {
                    "type": "input_value",
                    "name": "PWD"
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"],
        });
    }
}


Blockly.Blocks['motion_arduino_lotusv_getblevalue'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_LOTUSV_GETBLUETOOTH_VALUE,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PIN1",
                    "options": [
                        ['D2', '2#3'],
                        ['D3', '3#4'],
                        ['D4', '4#5'],
                        ['D5', '5#6'],
                        ['D6', '6#7'],
                        ['D7', '7#8']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_string"]
        });
    }
}


Blockly.Blocks['motion_arduino_rtc_setdatetime'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_RTC_SETDATETIME,
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

Blockly.Blocks['motion_arduino_rtc_getdate'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_RTC_GETDATE,
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

Blockly.Blocks['motion_arduino_rtc_gettime'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_RTC_GETTIME,
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

Blockly.Blocks['motion_arduino_infrared_send'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_INFRA_RED_SEND,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_barometer_sensor.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "MESSAGE"
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "shape_statement"]
        });
    }
}

Blockly.Blocks['motion_arduino_infrared_receive'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_INFRA_RED_RECEIVE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/icon_infrared_receiver.svg",
                    "width": 65,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "PIN",
                    "options": [
                        ['D2', '2'],
                        ['D3', '3'],
                        ['D4', '4'],
                        ['D5', '5'],
                        ['D6', '6'],
                        ['D7', '7'],
                        ['D8', '8'],
                        ['D9', '9'],
                        ['D10', '10'],
                        ['D11', '11'],
                        ['D12', '12'],
                        ['D13', '13']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_igure", "output_string"]
        });
    }
}

// createBlock({ name: 'RGB_LED_Strip.svg', width: 65 }, ["colours_arduino_grove_igure", "shape_statement"],
//     'ARDUINO_LED_STRIP2',
//     [
//         figureBlockArgs[0],
//         {
//             "type": "input_value",
//             "name": "R"
//         },
//         {
//             "type": "input_value",
//             "name": "G"
//         },
//         {
//             "type": "input_value",
//             "name": "B"
//         }
//     ]);