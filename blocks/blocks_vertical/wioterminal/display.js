'use strict';

goog.provide('Blockly.Blocks.wioterminal.display');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


//显示屏朝向（默认）方向
Blockly.Blocks['display_wioterminal_screen_towards'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SCREEN_TOWARDS,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "DIRECT",
                    "options": [
                        [Blockly.Msg.WIO_TERMINAL_SCREEN_TOWARDS_OPT0, '3'],
                        [Blockly.Msg.WIO_TERMINAL_SCREEN_TOWARDS_OPT1, '2'],
                        [Blockly.Msg.WIO_TERMINAL_SCREEN_TOWARDS_OPT2, '0'],
                        [Blockly.Msg.WIO_TERMINAL_SCREEN_TOWARDS_OPT3, '1'],
                    ],
                }
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}

//设置屏幕背景颜色
Blockly.Blocks['display_wioterminal_set_screen_background_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SET_SCREEN_BACKGROUND_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//设置屏幕字体大小
Blockly.Blocks['display_wioterminal_set_text_size'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SET_TEXT_SIZE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "SIZE",
                    "options": [
                        [Blockly.Msg.WIO_TERMINAL_SET_TEXT_SIZE_OPT0, '1'],
                        [Blockly.Msg.WIO_TERMINAL_SET_TEXT_SIZE_OPT1, '2'],
                        [Blockly.Msg.WIO_TERMINAL_SET_TEXT_SIZE_OPT2, '3'],
                        [Blockly.Msg.WIO_TERMINAL_SET_TEXT_SIZE_OPT3, '4'],
                    ]
                }
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//设置屏幕字体颜色
Blockly.Blocks['display_wioterminal_set_text_color'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SET_TEXT_COLOR,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//打印字符串并换行
Blockly.Blocks['display_wioterminal_println_string'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_PRINTLN_STRING,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "MESSAGE"
                },
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//在屏幕指定位置，打印字符串
Blockly.Blocks['display_wioterminal_print_string_at_point'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_PRINT_STRING_AT_POINT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "MESSAGE"
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
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//清空显示屏
Blockly.Blocks['display_wioterminal_screen_clear_reset'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SCREEN_CLEAR_RESET,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//在屏幕指定位置，显示SD卡存储位置图片
Blockly.Blocks['display_wioterminal_show_image'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_SHOW_IMAGE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "IMG_PATH"
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
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//以指定的颜色，在屏幕指定位置绘制一个像素点 drawPixel
Blockly.Blocks['display_wioterminal_draw_pixel'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_DRAW_PIXEL,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
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
                    "type": "input_value",
                    "name": "COLOR"
                },
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//以指定的颜色，以指定的颜色，在屏幕指定的两点位置绘制一条直线
Blockly.Blocks['display_wioterminal_draw_line'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_DRAW_LINE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "input_value",
                    "name": "P1X"
                },
                {
                    "type": "input_value",
                    "name": "P1Y"
                },
                {
                    "type": "input_value",
                    "name": "P2X"
                },
                {
                    "type": "input_value",
                    "name": "P2Y"
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//以指定的颜色，在屏幕指定的点位置,配以宽和高两个参数,绘制矩形：分填充和不填充两种方式
Blockly.Blocks['display_wioterminal_draw_rect'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_DRAW_RECT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "FILL",
                    "options": [
                        [Blockly.Msg.WIO_TERMINAL_DRAW_OPT0, '1'],
                        [Blockly.Msg.WIO_TERMINAL_DRAW_OPT1, '2'],
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
                    "type": "input_value",
                    "name": "WIDTH"
                },
                {
                    "type": "input_value",
                    "name": "HEIGHT"
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//以指定的颜色，在屏幕指定的点位置,配以半径r参数，绘制圆形：分填充和不填充两种方式
Blockly.Blocks['display_wioterminal_draw_circle'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_DRAW_CIRCLE,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "FILL",
                    "options": [
                        [Blockly.Msg.WIO_TERMINAL_DRAW_OPT0, '1'],
                        [Blockly.Msg.WIO_TERMINAL_DRAW_OPT1, '2'],
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
                    "type": "input_value",
                    "name": "R"
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//以指定的颜色，在屏幕指定的三个点位置，绘制三角形形：分填充和不填充两种方式
Blockly.Blocks['display_wioterminal_draw_triangles'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_DRAW_TRIANGLES,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "FILL",
                    "options": [
                        [Blockly.Msg.WIO_TERMINAL_DRAW_OPT0, '1'],
                        [Blockly.Msg.WIO_TERMINAL_DRAW_OPT1, '2'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "P1X"
                },
                {
                    "type": "input_value",
                    "name": "P1Y"
                },
                {
                    "type": "input_value",
                    "name": "P2X"
                },
                {
                    "type": "input_value",
                    "name": "P2Y"
                },
                {
                    "type": "input_value",
                    "name": "P3X"
                },
                {
                    "type": "input_value",
                    "name": "P3Y"
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}
//以指定的颜色，在屏幕指定的点位置,配以宽和高，以及角度半径r三个参数,绘制圆角矩形：分填充和不填充两种方式
Blockly.Blocks['display_wioterminal_draw_round_rect'] = {
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.WIO_TERMINAL_DRAW_ROUND_RECT,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "codecraft/icons/wioterminal/screen.svg",
                    "width": 48,
                    "height": 30
                },
                {
                    "type": "field_vertical_separator"
                },
                {
                    "type": "field_dropdown",
                    "name": "FILL",
                    "options": [
                        [Blockly.Msg.WIO_TERMINAL_DRAW_OPT0, '1'],
                        [Blockly.Msg.WIO_TERMINAL_DRAW_OPT1, '2'],
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
                    "type": "input_value",
                    "name": "WIDTH"
                },
                {
                    "type": "input_value",
                    "name": "HEIGHT"
                },
                {
                    "type": "input_value",
                    "name": "R"
                },
                {
                    "type": "input_value",
                    "name": "COLOR"
                },
            ],
            "extensions": ["colours_wioterminal_display", "shape_statement"]
        });
    }
}