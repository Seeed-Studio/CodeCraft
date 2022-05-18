'use strict';

goog.provide('Blockly.Blocks.microbit.pin');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['sensing_microbit_pin_connected'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_CONNECTED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        ["0", '0'],
                        ["1", '1'],
                        ["2", '2']
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "output_boolean"]
        });
    }
};

Blockly.Blocks['sensing_microbit_pin_analogquantity'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_ANALOGQUANTITY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        ["0", '0'],
                        ["1", '1'],
                        ["2", '2'],
                        ["3", '3'],
                        ["4", '4'],
                        ["10", '10']
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_microbit_pin_set_analogquantity'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_SET_ANALOGQUANTITY,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        ["0", '0'],
                        ["1", '1'],
                        ["2", '2'],
                        ["3", '3'],
                        ["4", '4'],
                        ["10", '10']
                    ]
                },
                {
                    "name": "ANALOGQUANTITY",
                    "type": "input_value"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "shape_statement"]
        });
    }
};


Blockly.Blocks['sensing_microbit_pin_number_input'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_NUMBER_INPUT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        ["0", '0'],
                        ["1", '1'],
                        ["2", '2'],
                        ["3", '3'],
                        ["4", '4'],
                        ["5", '5'],
                        ["6", '6'],
                        ["7", '7'],
                        ["8", '8'],
                        ["9", '9'],
                        ["10", '10'],
                        ["11", '11'],
                        ["12", '12'],
                        ["13", '13'],
                        ["14", '14'],
                        ["15", '15'],
                        ["16", '16'],
                        ["17", '17'],
                        ["18", '18'],
                        ["19", '19'],
                        ["20", '20']
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "output_boolean"]
        });
    }
};



Blockly.Blocks['sensing_microbit_pin_analog_read'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_ANALOG_READ,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        ["P0", '0'],
                        ["P1", '1'],
                        ["P2", '2'],
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "output_number"]
        });
    }
};


Blockly.Blocks['sensing_microbit_pin_analog_map_to'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_ANALOG_MAP_TO,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        ["P0", '0'],
                        ["P1", '1'],
                        ["P2", '2'],
                    ]
                },
                {
                    "name": "LOW",
                    "type": "input_value"
                },
                {
                    "name": "HIGH",
                    "type": "input_value"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "output_number"]
        });
    }
};


Blockly.Blocks['sensing_microbit_pin_analog_write'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_ANALOG_WRITE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        ["P0", '0'],
                        ["P1", '1'],
                        ["P2", '2'],
                    ]
                },
                {
                    "name": "NUM",
                    "type": "input_value"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "shape_statement"]
        });
    }
};


Blockly.Blocks['sensing_microbit_pin_analog_set_period'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_ANALOG_SET_PERIOD,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        ["P0", '0'],
                        ["P1", '1'],
                        ["P2", '2'],
                    ]
                },
                {
                    "name": "US",
                    "type": "input_value"
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_microbit_pin_digital_read'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_DIGITAL_READ,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        ["P0", '0'],
                        ["P1", '1'],
                        ["P2", '2'],
                        ["P8", '8'],
                        ["P16", '16'],
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_microbit_pin_digital_is'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_DIGITAL_IS,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        ["P0", '0'],
                        ["P1", '1'],
                        ["P2", '2'],
                        ["P8", '8'],
                        ["P16", '16'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        [Blockly.Msg.MICROBIT_PIN_DIGITAL_IS_OPT1, 'True'],
                        [Blockly.Msg.MICROBIT_PIN_DIGITAL_IS_OPT2, 'False'],
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "output_boolean"]
        });
    }
};

Blockly.Blocks['sensing_microbit_pin_digital_set_to'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_DIGITAL_SET_TO,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
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
                        ["P0", '0'],
                        ["P1", '1'],
                        ["P2", '2'],
                        ["P8", '8'],
                        ["P16", '16'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "OPT",
                    "options": [
                        [Blockly.Msg.MICROBIT_PIN_DIGITAL_IS_OPT1, 'True'],
                        [Blockly.Msg.MICROBIT_PIN_DIGITAL_IS_OPT2, 'False'],
                    ]
                }
            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "shape_statement"]
        });
    }
};


Blockly.Blocks['sensing_microbit_pin_i2c_read'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_I2C_READ,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "name": "I2C",
                    "type": "input_value"
                },
                {
                    "name": "FORMAT",
                    "type": "field_dropdown",
                    "options": [
                        ["Int8LE", '1'],
                        ["UInt8LE", '2'],
                        ["Int8BE", '3'],
                        ["UInt8BE", '4'],
                        ["Int16LE", '5'],
                        ["UInt16LE", '6'],
                        ["Int16BE", '7'],
                        ["UInt16BE", '8'],
                        ["Int32LE", '9'],
                        ["Int32BE", '10'],

                    ]
                },
                {
                    "name": "REPEAT",
                    "type": "field_dropdown",
                    "options": [
                        [Blockly.Msg.MICROBIT_PIN_I2C_READ_OPT1, 'False'],
                        [Blockly.Msg.MICROBIT_PIN_I2C_READ_OPT2, 'True'],
                    ]
                }

            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "output_number"]
        });
    }
};

Blockly.Blocks['sensing_microbit_pin_i2c_write'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MICROBIT_PIN_I2C_WRITE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/microbit/block.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "name": "I2C",
                    "type": "input_value"
                },
                {
                    "name": "VALUE",
                    "type": "input_value"
                },
                {
                    "name": "FORMAT",
                    "type": "field_dropdown",
                    "options": [
                        ["Int8LE", '1'],
                        ["UInt8LE", '2'],
                        ["Int8BE", '3'],
                        ["UInt8BE", '4'],
                        ["Int16LE", '5'],
                        ["UInt16LE", '6'],
                        ["Int16BE", '7'],
                        ["UInt16BE", '8'],
                        ["Int32LE", '9'],
                        ["Int32BE", '10'],

                    ]
                },
                {
                    "name": "REPEAT",
                    "type": "field_dropdown",
                    "options": [
                        ["yes", 'False'],
                        ["no", 'True'],
                    ]
                }

            ],
            "category": Blockly.Categories.motion,
            "extensions": ["colours_microbit_pin", "shape_statement"]
        });
    }
};