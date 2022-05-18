'use strict';

goog.provide('Blockly.Blocks.elfbot.mainboard');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

/**
 *  当elfbot精灵启动时
 */
Blockly.Blocks['event_elfbot_whenstartup'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_MAINBOARD_START,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/robot.svg",
                    "width": 40,
                    "height": 30
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

/**
 *  当按下按钮S
 */
Blockly.Blocks['event_elfbot_whenkeysispressed'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_WHEN_BUTTON_S_PRESSED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/btn-s.svg",
                    "width": 40,
                    "height": 30
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

Blockly.Blocks['event_elfbot_whentimergreaterthan'] = {
    /**
     * Block for when loudness/timer/video motion is greater than the value.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_WHENGREATERTHAN_TIMER,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/timer.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "TIMER"
                }
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
};


Blockly.Blocks['sensing_elfbot_button_s_ispressed'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.ELFBOT_BUTTONS_ISPRESSED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/btn-s.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};

Blockly.Blocks['event_elfbot_whenradioreceive'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MAINBOARD_WHEN_RADIO_RECEIVE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/message-bluetooth.svg",
                    "width": 40,
                    "height": 30
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


Blockly.Blocks['event_elfbot_broadcast'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MAINBOARD_BROADCAST,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/message-bluetooth.svg",
                    "width": 40,
                    "height": 30
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


Blockly.Blocks['event_elfbot_stop_broadcast'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MAINBOARD_STOP_BROADCAST,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/message-bluetooth.svg",
                    "width": 40,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                }
            ],
            "extensions": ["colours_event", "shape_statement"]
        });
    }
};


Blockly.Blocks['event_elfbot_set_broadcast_channel'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.GROVEZERO_MAINBOARD_SET_BROADCAST_CHANNEL,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/elfbot/message-bluetooth.svg",
                    "width": 40,
                    "height": 30
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


