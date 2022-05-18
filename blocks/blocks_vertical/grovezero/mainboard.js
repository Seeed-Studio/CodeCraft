'use strict';

goog.provide('Blockly.Blocks.grovezero.mainboard');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['event_g0_mainboard_start'] = {
    // 当控制板启动时
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MAINBOARD_START,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovezero-block-icon.svg",
                    "width": 40,
                    "height": 40
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};

Blockly.Blocks['event_g0_mainboard_when_arrival_time'] = {
    // 当计时器大于#秒
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MAINBOARD_WHEN_ARRIVAL_TIME,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovezero-block-icon.svg",
                    "width": 40,
                    "height": 40
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "TIME"
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};

Blockly.Blocks['event_g0_mainboard_when_radio_receive'] = {
    // 在无线接收到 ##
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MAINBOARD_WHEN_RADIO_RECEIVE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovezero-block-icon.svg",
                    "width": 40,
                    "height": 40
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "RECEIVE"
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};


Blockly.Blocks['event_g0_mainboard_broadcast'] = {
    //广播 broast
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MAINBOARD_BROADCAST,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovezero-block-icon.svg",
                    "width": 40,
                    "height": 40
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "BROADCAST_OPTION"
                }
            ],
            "extensions": ["colours_event", "shape_statement"]
        });
    }
};


Blockly.Blocks['event_g0_mainboard_stop_broadcast'] = {
    // 停止广播
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MAINBOARD_STOP_BROADCAST,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovezero-block-icon.svg",
                    "width": 40,
                    "height": 40
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_event", "shape_statement"]
        });
    }
};


Blockly.Blocks['event_g0_mainboard_set_broadcast_channel'] = {
    // 设置广播频道
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MAINBOARD_SET_BROADCAST_CHANNEL,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/grovezero-block-icon.svg",
                    "width": 40,
                    "height": 40
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "extensions": ["colours_event", "shape_statement"]
        });
    }

};


Blockly.Blocks['operator_g0_itoa'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MATH_ITOA_VALUE_MESSAGE0,
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "category": Blockly.Categories.operators,
            "extensions": ["colours_operators", "output_string"]
        });
    }
};


Blockly.Blocks['sensing_g0_mainboard_resettimer'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.SENSING_RESETTIMER,
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "shape_statement"]
        });
    }
};


Blockly.Blocks['sensing_g0_mainboard_timer'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.SENSING_TIMER,
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_number"]
        });
    }
};