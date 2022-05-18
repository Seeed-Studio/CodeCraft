'use strict';

goog.provide('Blockly.Blocks.grovezero.mechKey');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['event_g0_mech_key_when_click'] = {
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
            "extensions": ["colours_event", "shape_hat"]
        })
    }
}


Blockly.Blocks['sensing_g0_mech_key_is_pressed'] = {
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
                        ['1', '0x0F'],
                        ['2', '0x1F'],
                        ['3', '0x2F'],
                        ['4', '0x3F']
                    ]
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_sensing", "output_boolean"]
        });
    }
};


Blockly.Blocks['sensing_g0_mech_key_set_rgb'] = {
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
                        ['1', '0x0F'],
                        ['2', '0x1F'],
                        ['3', '0x2F'],
                        ['4', '0x3F']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                }
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['sensing_g0_mech_key_close'] = {
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
                        ['1', '0x0F'],
                        ['2', '0x1F'],
                        ['3', '0x2F'],
                        ['4', '0x3F']
                    ]
                },
            ],
            "category": Blockly.Categories.sensing,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};