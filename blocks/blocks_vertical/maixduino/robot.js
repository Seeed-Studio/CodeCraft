'use strict';

goog.provide('Blockly.Blocks.maixduino.robot');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['motion_maixduino_mark_run'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_MARK_RUN,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "V",
                    "options": [
                        [Blockly.Msg.MAIXDUINO_ROBOT_MARK_OPT6, '1'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_MARK_OPT7, '2'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_MARK_OPT8, '3']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "DIR",
                    "options": [
                        [Blockly.Msg.MAIXDUINO_ROBOT_MARK_OPT1, '1'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_MARK_OPT2, '2'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_MARK_OPT3, '4'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_MARK_OPT4, '3'],
                    ]
                },
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_maixduino_mark_stop'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_MARK_STOP,
            "args0": [
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_maixduino_mark_motorrun'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_MOTOR_RUN,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "MOTOR",
                    "options": [
                        [Blockly.Msg.MAIXDUINO_ROBOT_MOTOR_RUN_0PT1, '1'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_MOTOR_RUN_0PT2, '2'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SPEED"
                }
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_maixduino_mark_servorun'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_SERVO_RUN,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "MOTOR",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "ANGLE"
                }
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_maixduino_mark_stepper_servo_setangle'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_STEPPER_SERVO_SETANGLE,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "ANGLE",
                    "options": [
                        ['1.8', '1.8'],
                        ['3.6', '3.6'],
                        ['0.75', '0.75'],
                        ['1.5', '1.5'],
                        ['3', '3']
                    ]
                }
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_maixduino_mark_stepper_servo_setrotatespeed'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_STEPPER_SERVO_SETROTATESPEED,
            "args0": [
                {
                    "type": "input_value",
                    "name": "ROTATESPEED"
                }
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_maixduino_mark_stepper_servo_run'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_STEPPER_SERVO_RUN,
            "args0": [
                {
                    "type": "input_value",
                    "name": "STEP"
                }
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};


Blockly.Blocks['motion_maixduino_mark_stepper_servo_turn'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_STEPPER_SERVO_TURN,
            "args0": [
                {
                    "type": "input_value",
                    "name": "ANGLE"
                },
                {
                    "type": "input_value",
                    "name": "SPEED"
                },
                {
                    "type": "input_value",
                    "name": "SENSITIVITY"
                }
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_maixduino_mark_speaker_setvol'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_SETVOL,
            "args0": [
                {
                    "type": "input_value",
                    "name": "VOLUME"
                }
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};


Blockly.Blocks['motion_maixduino_mark_speaker_playnote'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_PLAYNOTE,
            "args0": [
                {
                    "type": "field_buzzer_note",
                    "name": "NOTE",
                    "options": [
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT0, value: '1' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT1, value: '2' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT2, value: '3' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT3, value: '4' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT4, value: '5' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT5, value: '6' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT6, value: '7' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT7, value: '8' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT8, value: '9' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT9, value: '10' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT10, value: '11' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT11, value: '12' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT12, value: '13' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT13, value: '14' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT14, value: '15' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT15, value: '16' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT16, value: '17' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT17, value: '18' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT18, value: '19' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT19, value: '20' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT20, value: '21' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT21, value: '22' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT22, value: '23' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT23, value: '24' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT24, value: '25' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT25, value: '26' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT26, value: '27' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT27, value: '28' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT28, value: '29' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT29, value: '30' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT30, value: '31' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT31, value: '32' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT32, value: '33' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT33, value: '34' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT34, value: '35' },
                        { text: Blockly.Msg.SOUND_BUZZER_NOTES_OPT35, value: '36' }
                    ],
                },
                {
                    "type": "field_dropdown",
                    "name": "BEAT",
                    "options": [
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT0, '1'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT1, '1/2'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT2, '1/4'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT3, '1/8'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT4, '1/16'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT5, '2'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT6, '4'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT7, '8']
                    ]
                }
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_maixduino_mark_speaker_pause'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_PAUSE,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "BEAT",
                    "options": [
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT0, '1'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT1, '1/2'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT2, '1/4'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT3, '1/8'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT4, '1/16'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT5, '2'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT6, '4'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_SPEAKER_BEAT_OPT7, '8']
                    ]
                }
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};

Blockly.Blocks['motion_maixduino_mark_headlights_show'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_HEAD_LIGHTS_SHOW,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "LIGHT",
                    "options": [
                        [Blockly.Msg.MAIXDUINO_ROBOT_LIGHTS_OPT01, 'all'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_HEAD_LIGHTS_OPT01, '1'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_HEAD_LIGHTS_OPT02, '0']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};


Blockly.Blocks['motion_maixduino_mark_taillights_show'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_TAIL_LIGHTS_SHOW,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "LIGHT",
                    "options": [
                        [Blockly.Msg.MAIXDUINO_ROBOT_TAIL_LIGHTS_OPT01, '0'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_TAIL_LIGHTS_OPT02, '1'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_TAIL_LIGHTS_OPT03, '2']

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
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};


Blockly.Blocks['motion_maixduino_mark_lights_crushout'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.MAIXDUINO_ROBOT_LIGHTS_CRUSHOUT,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "LIGHT",
                    "options": [
                        [Blockly.Msg.MAIXDUINO_ROBOT_LIGHTS_OPT01, 'all'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_HEAD_LIGHTS_OPT01, '1'],
                        [Blockly.Msg.MAIXDUINO_ROBOT_HEAD_LIGHTS_OPT02, '0'],
                    ]
                }
            ],
            "extensions": ["colours_maixdunio_robot", "shape_statement"]
        });
    }
};