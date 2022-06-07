'use strict';

goog.provide('Blockly.Blocks.arduino.speechRecongnition');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['motion_arduino_network_state'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_NETWORK_STATE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/speech_recognizer.svg",
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

Blockly.Blocks['motion_arduino_speechr_rec'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SPEECH_RECOGNITION_REC,
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
                    "name": "LANGUAGE",
                    "options": [
                        [Blockly.Msg.ARDUINO_SPEECH_RECOGNITION_OPT01, '0'],
                        [Blockly.Msg.ARDUINO_SPEECH_RECOGNITION_OPT02, '1'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SECS"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_speechr_rectext'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SPEECH_RECOGNITION_RECTEXT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/speech_recognizer.svg",
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
};

Blockly.Blocks['motion_arduino_speechr_tts'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_SPEECH_RECOGNITION_TTS,
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
                    "type": "input_value",
                    "name": "TEXT"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_audio_record'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_AUDIO_RECORD,
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
                    "name": "STORAGE",
                    "options": [
                        // [Blockly.Msg.ARDUINO_AUDIO_STORAGE_OPT01, '1'],
                        [Blockly.Msg.ARDUINO_AUDIO_STORAGE_OPT02, '2'],
                        // [Blockly.Msg.ARDUINO_AUDIO_STORAGE_OPT03, '3'],
                        // [Blockly.Msg.ARDUINO_AUDIO_STORAGE_OPT04, '4'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "NAME"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_audio_stop_record'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_AUDIO_STOP_RECORD,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/arduino/speech_recognizer.svg",
                    "width": 65,
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

Blockly.Blocks['motion_arduino_audio_play'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_AUDIO_PLAY,
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
                    "name": "STORAGE",
                    "options": [
                        // [Blockly.Msg.ARDUINO_AUDIO_STORAGE_OPT01, '1'],
                        [Blockly.Msg.ARDUINO_AUDIO_STORAGE_OPT02, '2'],
                        // [Blockly.Msg.ARDUINO_AUDIO_STORAGE_OPT03, '3'],
                        // [Blockly.Msg.ARDUINO_AUDIO_STORAGE_OPT04, '4'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "NAME"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_audio_play_someone'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_AUDIO_PLAY_SOMEONE,
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
                    "type": "input_value",
                    "name": "INDEX"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_audio_play_preornext'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_AUDIO_PLAY_PREORNEXT,
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
                    "name": "PLAY_OPT",
                    "options": [
                        [Blockly.Msg.ARDUINO_AUDIO_PLAY_OPT1, '1'],
                        [Blockly.Msg.ARDUINO_AUDIO_PLAY_OPT2, '2']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_audio_play_atmode'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_AUDIO_PLAY_ATMODE,
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
                    "name": "PLAY_OPT",
                    "options": [
                        [Blockly.Msg.ARDUINO_AUDIO_PLAY_MODE_OPT1, '1'],
                        [Blockly.Msg.ARDUINO_AUDIO_PLAY_MODE_OPT2, '2'],
                        [Blockly.Msg.ARDUINO_AUDIO_PLAY_MODE_OPT3, '3']
                    ]
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_arduino_audio_setvol'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ARDUINO_AUDIO_SETVOL,
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
                    "type": "input_value",
                    "name": "VOL"
                }
            ],
            "extensions": ["colours_arduino_grove_i2c", "shape_statement"]
        });
    }
};