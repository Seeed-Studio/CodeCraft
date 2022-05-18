/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview English strings.
 * @author ascii@media.mit.edu (Andrew Sliwinski)
 *
 * After modifying this file, run `npm run translate` from the root directory
 * to regenerate `./msg/json/en.json`.
 * IMPORTANT:
 * All message strings must use single quotes for the scripts to work properly
 */
'use strict';

goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');

// Control blocks
Blockly.Msg.CONTROL_FOREVER = 'forever';
Blockly.Msg.CONTROL_REPEAT = 'repeat %1';
Blockly.Msg.CONTROL_IF = 'if %1 then';
Blockly.Msg.CONTROL_ELSE = 'else';
Blockly.Msg.CONTROL_STOP = 'stop';
Blockly.Msg.CONTROL_STOP_ALL = 'all';
Blockly.Msg.CONTROL_STOP_THIS = 'this script';
Blockly.Msg.CONTROL_STOP_OTHER = 'other scripts in sprite';
Blockly.Msg.CONTROL_WAIT = 'wait %1 seconds';
Blockly.Msg.CONTROL_WAITUNTIL = 'wait until %1';
Blockly.Msg.CONTROL_REPEATUNTIL = 'repeat until %1';
Blockly.Msg.CONTROL_WHILE = 'while %1';
Blockly.Msg.CONTROL_FOREACH = 'for each %1 in %2';
Blockly.Msg.CONTROL_STARTASCLONE = 'when I start as a clone';
Blockly.Msg.CONTROL_CREATECLONEOF = 'create clone of %1';
Blockly.Msg.CONTROL_CREATECLONEOF_MYSELF = 'myself';
Blockly.Msg.CONTROL_DELETETHISCLONE = 'delete this clone';
Blockly.Msg.CONTROL_COUNTER = 'counter';
Blockly.Msg.CONTROL_INCRCOUNTER = 'increment counter';
Blockly.Msg.CONTROL_CLEARCOUNTER = 'clear counter';
Blockly.Msg.CONTROL_ALLATONCE = 'all at once';

// Data blocks
Blockly.Msg.DATA_SETVARIABLETO = 'set %1 to %2';
Blockly.Msg.DATA_CHANGEVARIABLEBY = 'change %1 by %2';
Blockly.Msg.DATA_SHOWVARIABLE = 'show variable %1';
Blockly.Msg.DATA_HIDEVARIABLE = 'hide variable %1';
Blockly.Msg.DATA_ADDTOLIST = 'add %1 to %2';
Blockly.Msg.DATA_DELETEOFLIST = 'delete %1 of %2';
Blockly.Msg.DATA_DELETEALLOFLIST = 'delete all of %1';
Blockly.Msg.DATA_INSERTATLIST = 'insert %1 at %2 of %3';
Blockly.Msg.DATA_REPLACEITEMOFLIST = 'replace item %1 of %2 with %3';
Blockly.Msg.DATA_ITEMOFLIST = 'item %1 of %2';
Blockly.Msg.DATA_ITEMNUMOFLIST = 'item # of %1 in %2';
Blockly.Msg.DATA_LENGTHOFLIST = 'length of %1';
Blockly.Msg.DATA_LISTCONTAINSITEM = '%1 contains %2?';
Blockly.Msg.DATA_SHOWLIST = 'show list %1';
Blockly.Msg.DATA_HIDELIST = 'hide list %1';
Blockly.Msg.DATA_INDEX_ALL = 'all';
Blockly.Msg.DATA_INDEX_LAST = 'last';
Blockly.Msg.DATA_INDEX_RANDOM = 'random';

// Event blocks
Blockly.Msg.EVENT_WHENFLAGCLICKED = 'when %1 clicked';
Blockly.Msg.EVENT_WHENTHISSPRITECLICKED = 'when this sprite clicked';
Blockly.Msg.EVENT_WHENSTAGECLICKED = 'when stage clicked';
Blockly.Msg.EVENT_WHENTOUCHINGOBJECT = 'when this sprite touches %1';
Blockly.Msg.EVENT_WHENBROADCASTRECEIVED = 'when I receive %1';
Blockly.Msg.EVENT_WHENBACKDROPSWITCHESTO = 'when backdrop switches to %1';
Blockly.Msg.EVENT_WHENGREATERTHAN = 'when %1 > %2';
Blockly.Msg.EVENT_WHENGREATERTHAN_TIMER = 'timer';
Blockly.Msg.EVENT_WHENGREATERTHAN_LOUDNESS = 'loudness';
Blockly.Msg.EVENT_BROADCAST = 'broadcast %1';
Blockly.Msg.EVENT_BROADCASTANDWAIT = 'broadcast %1 and wait';
Blockly.Msg.EVENT_WHENKEYPRESSED = 'when %1 key pressed';
Blockly.Msg.EVENT_WHENKEYPRESSED_SPACE = 'space';
Blockly.Msg.EVENT_WHENKEYPRESSED_LEFT = 'left arrow';
Blockly.Msg.EVENT_WHENKEYPRESSED_RIGHT = 'right arrow';
Blockly.Msg.EVENT_WHENKEYPRESSED_DOWN = 'down arrow';
Blockly.Msg.EVENT_WHENKEYPRESSED_UP = 'up arrow';
Blockly.Msg.EVENT_WHENKEYPRESSED_ANY = 'any';

// Looks blocks
Blockly.Msg.LOOKS_SAYFORSECS = 'say %1 for %2 seconds';
Blockly.Msg.LOOKS_SAY = 'say %1';
Blockly.Msg.LOOKS_HELLO = 'Hello!';
Blockly.Msg.LOOKS_THINKFORSECS = 'think %1 for %2 seconds';
Blockly.Msg.LOOKS_THINK = 'think %1';
Blockly.Msg.LOOKS_HMM = 'Hmm...';
Blockly.Msg.LOOKS_SHOW = 'show';
Blockly.Msg.LOOKS_HIDE = 'hide';
Blockly.Msg.LOOKS_HIDEALLSPRITES = 'hide all sprites';
Blockly.Msg.LOOKS_EFFECT_COLOR = 'color';
Blockly.Msg.LOOKS_EFFECT_FISHEYE = 'fisheye';
Blockly.Msg.LOOKS_EFFECT_WHIRL = 'whirl';
Blockly.Msg.LOOKS_EFFECT_PIXELATE = 'pixelate';
Blockly.Msg.LOOKS_EFFECT_MOSAIC = 'mosaic';
Blockly.Msg.LOOKS_EFFECT_BRIGHTNESS = 'brightness';
Blockly.Msg.LOOKS_EFFECT_GHOST = 'ghost';
Blockly.Msg.LOOKS_CHANGEEFFECTBY = 'change %1 effect by %2';
Blockly.Msg.LOOKS_SETEFFECTTO = 'set %1 effect to %2';
Blockly.Msg.LOOKS_CLEARGRAPHICEFFECTS = 'clear graphic effects';
Blockly.Msg.LOOKS_CHANGESIZEBY = 'change size by %1';
Blockly.Msg.LOOKS_SETSIZETO = 'set size to %1 %';
Blockly.Msg.LOOKS_SIZE = 'size';
Blockly.Msg.LOOKS_CHANGESTRETCHBY = 'change stretch by %1';
Blockly.Msg.LOOKS_SETSTRETCHTO = 'set stretch to %1 %';
Blockly.Msg.LOOKS_SWITCHCOSTUMETO = 'switch costume to %1';
Blockly.Msg.LOOKS_NEXTCOSTUME = 'next costume';
Blockly.Msg.LOOKS_SWITCHBACKDROPTO = 'switch backdrop to %1';
Blockly.Msg.LOOKS_GOTOFRONTBACK = 'go to %1 layer';
Blockly.Msg.LOOKS_GOTOFRONTBACK_FRONT = 'front';
Blockly.Msg.LOOKS_GOTOFRONTBACK_BACK = 'back';
Blockly.Msg.LOOKS_GOFORWARDBACKWARDLAYERS = 'go %1 %2 layers';
Blockly.Msg.LOOKS_GOFORWARDBACKWARDLAYERS_FORWARD = 'forward';
Blockly.Msg.LOOKS_GOFORWARDBACKWARDLAYERS_BACKWARD = 'backward';
Blockly.Msg.LOOKS_BACKDROPNUMBERNAME = 'backdrop %1';
Blockly.Msg.LOOKS_COSTUMENUMBERNAME = 'costume %1';
Blockly.Msg.LOOKS_NUMBERNAME_NUMBER = 'number';
Blockly.Msg.LOOKS_NUMBERNAME_NAME = 'name';
Blockly.Msg.LOOKS_SWITCHBACKDROPTOANDWAIT = 'switch backdrop to %1 and wait';
Blockly.Msg.LOOKS_NEXTBACKDROP_BLOCK = 'next backdrop';
Blockly.Msg.LOOKS_NEXTBACKDROP = 'next backdrop';
Blockly.Msg.LOOKS_PREVIOUSBACKDROP = 'previous backdrop';
Blockly.Msg.LOOKS_RANDOMBACKDROP = 'random backdrop';

// Motion blocks
Blockly.Msg.MOTION_MOVESTEPS = 'move %1 steps';
Blockly.Msg.MOTION_TURNLEFT = 'turn %1 %2 degrees';
Blockly.Msg.MOTION_TURNRIGHT = 'turn %1 %2 degrees';
Blockly.Msg.MOTION_POINTINDIRECTION = 'point in direction %1';
Blockly.Msg.MOTION_POINTTOWARDS = 'point towards %1';
Blockly.Msg.MOTION_POINTTOWARDS_POINTER = 'mouse-pointer';
Blockly.Msg.MOTION_GOTO = 'go to %1';
Blockly.Msg.MOTION_GOTO_POINTER = 'mouse-pointer';
Blockly.Msg.MOTION_GOTO_RANDOM = 'random position';
Blockly.Msg.MOTION_GOTOXY = 'go to x: %1 y: %2';
Blockly.Msg.MOTION_GLIDESECSTOXY = 'glide %1 secs to x: %2 y: %3';
Blockly.Msg.MOTION_GLIDETO = 'glide %1 secs to %2';
Blockly.Msg.MOTION_GLIDETO_POINTER = 'mouse-pointer';
Blockly.Msg.MOTION_GLIDETO_RANDOM = 'random position';
Blockly.Msg.MOTION_CHANGEXBY = 'change x by %1';
Blockly.Msg.MOTION_SETX = 'set x to %1';
Blockly.Msg.MOTION_CHANGEYBY = 'change y by %1';
Blockly.Msg.MOTION_SETY = 'set y to %1';
Blockly.Msg.MOTION_IFONEDGEBOUNCE = 'if on edge, bounce';
Blockly.Msg.MOTION_SETROTATIONSTYLE = 'set rotation style %1';
Blockly.Msg.MOTION_SETROTATIONSTYLE_LEFTRIGHT = 'left-right';
Blockly.Msg.MOTION_SETROTATIONSTYLE_DONTROTATE = 'don\'t rotate';
Blockly.Msg.MOTION_SETROTATIONSTYLE_ALLAROUND = 'all around';
Blockly.Msg.MOTION_XPOSITION = 'x position';
Blockly.Msg.MOTION_YPOSITION = 'y position';
Blockly.Msg.MOTION_DIRECTION = 'direction';
Blockly.Msg.MOTION_SCROLLRIGHT = 'scroll right %1';
Blockly.Msg.MOTION_SCROLLUP = 'scroll up %1';
Blockly.Msg.MOTION_ALIGNSCENE = 'align scene %1';
Blockly.Msg.MOTION_ALIGNSCENE_BOTTOMLEFT = 'bottom-left';
Blockly.Msg.MOTION_ALIGNSCENE_BOTTOMRIGHT = 'bottom-right';
Blockly.Msg.MOTION_ALIGNSCENE_MIDDLE = 'middle';
Blockly.Msg.MOTION_ALIGNSCENE_TOPLEFT = 'top-left';
Blockly.Msg.MOTION_ALIGNSCENE_TOPRIGHT = 'top-right';
Blockly.Msg.MOTION_XSCROLL = 'x scroll';
Blockly.Msg.MOTION_YSCROLL = 'y scroll';
Blockly.Msg.MOTION_STAGE_SELECTED = 'Stage selected: no motion blocks';

// Operators blocks
Blockly.Msg.OPERATORS_ADD = '%1 + %2';
Blockly.Msg.OPERATORS_SUBTRACT = '%1 - %2';
Blockly.Msg.OPERATORS_MULTIPLY = '%1 * %2';
Blockly.Msg.OPERATORS_DIVIDE = '%1 / %2';
Blockly.Msg.OPERATORS_RANDOM = 'pick random %1 to %2';
Blockly.Msg.OPERATORS_GT = '%1 > %2';
Blockly.Msg.OPERATORS_LT = '%1 < %2';
Blockly.Msg.OPERATORS_EQUALS = '%1 = %2';
Blockly.Msg.OPERATORS_AND = '%1 and %2';
Blockly.Msg.OPERATORS_OR = '%1 or %2';
Blockly.Msg.OPERATORS_NOT = 'not %1';
Blockly.Msg.OPERATORS_JOIN = 'join %1 %2';
Blockly.Msg.OPERATORS_JOIN_APPLE = 'apple';
Blockly.Msg.OPERATORS_JOIN_BANANA = 'banana';
Blockly.Msg.OPERATORS_LETTEROF = 'letter %1 of %2';
Blockly.Msg.OPERATORS_LETTEROF_APPLE = 'a';
Blockly.Msg.OPERATORS_LENGTH = 'length of %1';
Blockly.Msg.OPERATORS_CONTAINS = '%1 contains %2?';
Blockly.Msg.OPERATORS_MOD = '%1 mod %2';
Blockly.Msg.OPERATORS_ROUND = 'round %1';
Blockly.Msg.OPERATORS_MATHOP = '%1 of %2';
Blockly.Msg.OPERATORS_MATHOP_ABS = 'abs';
Blockly.Msg.OPERATORS_MATHOP_FLOOR = 'floor';
Blockly.Msg.OPERATORS_MATHOP_CEILING = 'ceiling';
Blockly.Msg.OPERATORS_MATHOP_SQRT = 'sqrt';
Blockly.Msg.OPERATORS_MATHOP_SIN = 'sin';
Blockly.Msg.OPERATORS_MATHOP_COS = 'cos';
Blockly.Msg.OPERATORS_MATHOP_TAN = 'tan';
Blockly.Msg.OPERATORS_MATHOP_ASIN = 'asin';
Blockly.Msg.OPERATORS_MATHOP_ACOS = 'acos';
Blockly.Msg.OPERATORS_MATHOP_ATAN = 'atan';
Blockly.Msg.OPERATORS_MATHOP_LN = 'ln';
Blockly.Msg.OPERATORS_MATHOP_LOG = 'log';
Blockly.Msg.OPERATORS_MATHOP_EEXP = 'e ^';
Blockly.Msg.OPERATORS_MATHOP_10EXP = '10 ^';

// Procedures blocks
Blockly.Msg.PROCEDURES_DEFINITION = 'define %1';

// Sensing blocks
Blockly.Msg.SENSING_TOUCHINGOBJECT = 'touching %1?';
Blockly.Msg.SENSING_TOUCHINGOBJECT_POINTER = 'mouse-pointer';
Blockly.Msg.SENSING_TOUCHINGOBJECT_EDGE = 'edge';
Blockly.Msg.SENSING_TOUCHINGCOLOR = 'touching color %1?';
Blockly.Msg.SENSING_COLORISTOUCHINGCOLOR = 'color %1 is touching %2?';
Blockly.Msg.SENSING_DISTANCETO = 'distance to %1';
Blockly.Msg.SENSING_DISTANCETO_POINTER = 'mouse-pointer';
Blockly.Msg.SENSING_ASKANDWAIT = 'ask %1 and wait';
Blockly.Msg.SENSING_ASK_TEXT = 'What\'s your name?';
Blockly.Msg.SENSING_ANSWER = 'answer';
Blockly.Msg.SENSING_KEYPRESSED = 'key %1 pressed?';
Blockly.Msg.SENSING_MOUSEDOWN = 'mouse down?';
Blockly.Msg.SENSING_MOUSEX = 'mouse x';
Blockly.Msg.SENSING_MOUSEY = 'mouse y';
Blockly.Msg.SENSING_SETDRAGMODE = 'set drag mode %1';
Blockly.Msg.SENSING_SETDRAGMODE_DRAGGABLE = 'draggable';
Blockly.Msg.SENSING_SETDRAGMODE_NOTDRAGGABLE = 'not draggable';
Blockly.Msg.SENSING_LOUDNESS = 'loudness';
Blockly.Msg.SENSING_LOUD = 'loud?';
Blockly.Msg.SENSING_TIMER = 'timer';
Blockly.Msg.SENSING_RESETTIMER = 'reset timer';
Blockly.Msg.SENSING_OF = '%1 of %2';
Blockly.Msg.SENSING_OF_XPOSITION = 'x position';
Blockly.Msg.SENSING_OF_YPOSITION = 'y position';
Blockly.Msg.SENSING_OF_DIRECTION = 'direction';
Blockly.Msg.SENSING_OF_COSTUMENUMBER = 'costume #';
Blockly.Msg.SENSING_OF_COSTUMENAME = 'costume name';
Blockly.Msg.SENSING_OF_SIZE = 'size';
Blockly.Msg.SENSING_OF_VOLUME = 'volume';
Blockly.Msg.SENSING_OF_BACKDROPNUMBER = 'backdrop #';
Blockly.Msg.SENSING_OF_BACKDROPNAME = 'backdrop name';
Blockly.Msg.SENSING_OF_STAGE = 'Stage';
Blockly.Msg.SENSING_CURRENT = 'current %1';
Blockly.Msg.SENSING_CURRENT_YEAR = 'year';
Blockly.Msg.SENSING_CURRENT_MONTH = 'month';
Blockly.Msg.SENSING_CURRENT_DATE = 'date';
Blockly.Msg.SENSING_CURRENT_DAYOFWEEK = 'day of week';
Blockly.Msg.SENSING_CURRENT_HOUR = 'hour';
Blockly.Msg.SENSING_CURRENT_MINUTE = 'minute';
Blockly.Msg.SENSING_CURRENT_SECOND = 'second';
Blockly.Msg.SENSING_DAYSSINCE2000 = 'days since 2000';
Blockly.Msg.SENSING_USERNAME = 'username';
Blockly.Msg.SENSING_USERID = 'user id';

// Sound blocks
Blockly.Msg.SOUND_PLAY = 'start sound %1';
Blockly.Msg.SOUND_PLAYUNTILDONE = 'play sound %1 until done';
Blockly.Msg.SOUND_STOPALLSOUNDS = 'stop all sounds';
Blockly.Msg.SOUND_SETEFFECTO = 'set %1 effect to %2';
Blockly.Msg.SOUND_CHANGEEFFECTBY = 'change %1 effect by %2';
Blockly.Msg.SOUND_CLEAREFFECTS = 'clear sound effects';
Blockly.Msg.SOUND_EFFECTS_PITCH = 'pitch';
Blockly.Msg.SOUND_EFFECTS_PAN = 'pan left/right';
Blockly.Msg.SOUND_CHANGEVOLUMEBY = 'change volume by %1';
Blockly.Msg.SOUND_SETVOLUMETO = 'set volume to %1%';
Blockly.Msg.SOUND_VOLUME = 'volume';
Blockly.Msg.SOUND_RECORD = 'record...';

// Category labels
Blockly.Msg.CATEGORY_SEARCH = 'Search';
Blockly.Msg.CATEGORY_MOTION = 'Motion';
Blockly.Msg.CATEGORY_LOOKS = 'Looks';
Blockly.Msg.CATEGORY_SOUND = 'Sound';
Blockly.Msg.CATEGORY_EVENTS = 'Events';
Blockly.Msg.CATEGORY_CONTROL = 'Control';
Blockly.Msg.CATEGORY_SENSING = 'Sensing';
Blockly.Msg.CATEGORY_OPERATORS = 'Operators';
Blockly.Msg.CATEGORY_VARIABLES = 'Variables';
Blockly.Msg.CATEGORY_MYBLOCKS = 'My Blocks';

// Context menus
Blockly.Msg.DUPLICATE = 'Duplicate';
Blockly.Msg.DUPLICATE_PASTE = 'Duplicate And Paste';
Blockly.Msg.DELETE = 'Delete blocks';
Blockly.Msg.ADD_COMMENT = 'Add Comment';
Blockly.Msg.REMOVE_COMMENT = 'Remove Comment';
Blockly.Msg.DELETE_BLOCK = 'Delete Block';
Blockly.Msg.DELETE_X_BLOCKS = 'Delete %1 Blocks';
Blockly.Msg.DELETE_ALL_BLOCKS = 'Delete all %1 blocks?';
Blockly.Msg.CLEAN_UP = 'Clean up Blocks';
Blockly.Msg.HELP = 'Help';
Blockly.Msg.UNDO = 'Undo';
Blockly.Msg.REDO = 'Redo';
Blockly.Msg.EDIT_PROCEDURE = 'Edit';
Blockly.Msg.SHOW_PROCEDURE_DEFINITION = 'Go to definition';
Blockly.Msg.WORKSPACE_COMMENT_DEFAULT_TEXT = 'Say something...';

// Color
Blockly.Msg.COLOUR_HUE_LABEL = 'Color';
Blockly.Msg.COLOUR_SATURATION_LABEL = 'Saturation';
Blockly.Msg.COLOUR_BRIGHTNESS_LABEL = 'Brightness';

// Variables
// @todo Remove these once fully managed by Scratch VM / Scratch GUI
Blockly.Msg.CHANGE_VALUE_TITLE = 'Change value:';
Blockly.Msg.RENAME_VARIABLE = 'Rename variable';
Blockly.Msg.RENAME_VARIABLE_TITLE = 'Rename all "%1" variables to:';
Blockly.Msg.RENAME_VARIABLE_MODAL_TITLE = 'Rename Variable';
Blockly.Msg.NEW_VARIABLE = 'Make a Variable';
Blockly.Msg.NEW_VARIABLE_TITLE = 'New variable name:';
Blockly.Msg.VARIABLE_MODAL_TITLE = 'New Variable';
Blockly.Msg.VARIABLE_ALREADY_EXISTS = 'A variable named "%1" already exists.';
Blockly.Msg.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE = 'A variable named "%1" already exists for another variable of type "%2".';
Blockly.Msg.DELETE_VARIABLE_CONFIRMATION = 'Delete %1 uses of the "%2" variable?';
Blockly.Msg.CANNOT_DELETE_VARIABLE_PROCEDURE = 'Can\'t delete the variable "%1" because it\'s part of the definition of the function "%2"';
Blockly.Msg.DELETE_VARIABLE = 'Delete the "%1" variable';

// Custom Procedures
// @todo Remove these once fully managed by Scratch VM / Scratch GUI
Blockly.Msg.NEW_PROCEDURE = 'Make a Block';
Blockly.Msg.PROCEDURE_ALREADY_EXISTS = 'A procedure named "%1" already exists.';
Blockly.Msg.PROCEDURE_DEFAULT_NAME = 'block name';

// Lists
// @todo Remove these once fully managed by Scratch VM / Scratch GUI
Blockly.Msg.NEW_LIST = 'Make a List';
Blockly.Msg.NEW_LIST_TITLE = 'New list name:';
Blockly.Msg.LIST_MODAL_TITLE = 'New List';
Blockly.Msg.LIST_ALREADY_EXISTS = 'A list named "%1" already exists.';
Blockly.Msg.RENAME_LIST_TITLE = 'Rename all "%1" lists to:';
Blockly.Msg.RENAME_LIST_MODAL_TITLE = 'Rename List';
Blockly.Msg.DEFAULT_LIST_ITEM = 'thing';

// Broadcast Messages
// @todo Remove these once fully managed by Scratch VM / Scratch GUI
Blockly.Msg.NEW_BROADCAST_MESSAGE = 'New message';
Blockly.Msg.NEW_BROADCAST_MESSAGE_TITLE = 'New message name:';
Blockly.Msg.BROADCAST_MODAL_TITLE = 'New Message';
Blockly.Msg.DEFAULT_BROADCAST_MESSAGE_NAME = 'message1';



/**
 * mini wheel
 */

Blockly.Msg.GROVEZERO_MINIWHEEL_SET_POWER = '%1 %2 小车底盘 左轮动力 %3 %，右轮动力 %4 %'
Blockly.Msg.GROVEZERO_MINIWHEEL_STOP = '%1 %2 小车底盘 停止运动'
Blockly.Msg.GROVEZERO_MINIWHEEL_RUN_VELOCITY_AZIMUTH = '%1 %2 小车底盘 以 %3 %4'
Blockly.Msg.GROVEZERO_MINIWHEEL_OPT1 = '慢速'
Blockly.Msg.GROVEZERO_MINIWHEEL_OPT2 = '中速'
Blockly.Msg.GROVEZERO_MINIWHEEL_OPT3 = '快速'
Blockly.Msg.GROVEZERO_MINIWHEEL_OPT4 = '前进'
Blockly.Msg.GROVEZERO_MINIWHEEL_OPT5 = '后退'
Blockly.Msg.GROVEZERO_MINIWHEEL_OPT6 = '左转'
Blockly.Msg.GROVEZERO_MINIWHEEL_OPT7 = '右转'
Blockly.Msg.GROVEZERO_MINIWHEEL_OPT8 = '顺时针转'
Blockly.Msg.GROVEZERO_MINIWHEEL_OPT9 = '逆时针转'

Blockly.Msg.GROVEZERO_MOTOR_STOP = '%1 %2 %3 直流减速电机 停止转动'
Blockly.Msg.GROVEZERO_DC_MOTOR_TRUN_POWER = '%1 %2 %3 直流减速电机 开始转动 动力 %4 %'
Blockly.Msg.GROVEZERO_SERVO_TURN_ANGLE = '%1 %2 舵机 转到 %3 度'


/**
 * color
 */
Blockly.Msg.GROVEZERO_RGB_TO_COLOR = "%1 %2 红 %3 绿 %4 蓝 %5";
Blockly.Msg.GROVEZERO_HSL_TO_COLOR = "%1 %2 颜色 %3 饱和度 %4 亮度 %5";


/**
 * led matrix
 */
Blockly.Msg.GROVEZERO_LED_MATRIX_XY_IS_ON = '%1 %2 LED 矩阵 x:%3 y:%4 是否被点亮？';
Blockly.Msg.GROVEZERO_LED_MATRIX_SHOW_SHAPE = '%1 %2 LED 矩阵 显示图案 %3';
Blockly.Msg.GROVEZERO_LED_MATRIX_SHOW_STRING = '%1 %2 LED 矩阵 显示字符串 %3';
Blockly.Msg.GROVEZERO_LED_MATRIX_XY_SET_ON = '%1 %2 LED 矩阵 点亮 x: %3 y: %4';
Blockly.Msg.GROVEZERO_LED_MATRIX_XY_SET_OFF = '%1 %2 LED 矩阵 熄灭 x: %3 y: %4';
Blockly.Msg.GROVEZERO_LED_MATRIX_CLEAN = '%1 %2 LED 矩阵 全部熄灭';

/**
 * rgb led
 */
Blockly.Msg.GROVEZERO_RGB_LED_SHOW_STYLE_COLOR = '%1 %2 可调彩灯 一直 %3 %4'
Blockly.Msg.GROVEZERO_RGB_LED_SHOW_STYLE = '%1 %2 可调彩灯 %3 效果'
Blockly.Msg.GROVEZERO_RGB_LED_FADE_FROM_COLOR1_TO_COLOR2 = '%1 %2 可调彩灯 从 %3 渐变到 %4'
Blockly.Msg.GROVEZERO_RGB_LED_SET_BRIGHTNESS = '%1 %2 可调彩灯 设置亮度为 %3 %'
Blockly.Msg.GROVEZERO_RGB_LED_LIGHT_OFF = '%1 %2 可调彩灯 熄灭'
Blockly.Msg.GROVEZERO_RGB_LED_OPT1 = '亮'
Blockly.Msg.GROVEZERO_RGB_LED_OPT2 = '闪烁'
Blockly.Msg.GROVEZERO_RGB_LED_OPT3 = '呼吸'
Blockly.Msg.GROVEZERO_RGB_LED_OPT4 = '彩虹灯'
Blockly.Msg.GROVEZERO_RGB_LED_OPT5 = '随机色'
/**
 * rgb matrix
 */
Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_SHAPE = '%1 %2 %3 RGB LED 矩阵 显示图案 %4'
Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_STRING = '%1 %2 %3 RGB LED 矩阵 显示字符串 %4 %5'
Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_ANIMA = '%1 %2 %3 RGB LED 矩阵 显示动画 %4'
Blockly.Msg.GROVEZERO_RGB_MATRIX_SHOW_HISTOGRAM = '%1 %2 %3 RGB LED 矩阵 绘制柱状图 值为 %4'
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON = '%1 %2 %3 RGB LED 矩阵 点亮 x: %4 y: %5 %6'
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_OFF = '%1 %2 %3 RGB LED 矩阵 熄灭 x: %4 y: %5'
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OFF = '%1 %2 %3 RGB LED 矩阵 开关 x: %4 y: %5 %6'
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_IS_ON = '%1 %2 %3 RGB LED 矩阵 x: %4 y: %5 被点亮'
Blockly.Msg.GROVEZERO_RGB_MATRIX_CLEAN = '%1 %2 %3 RGB LED 矩阵 全部熄灭'
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_GET_COLOR = '%1 %2 %3 RGB LED 矩阵 x: %4 y: %5 颜色值'

Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT1 = '波浪';
Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT2 = '顺时针画大方形';
Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT3 = '顺时针画小方形';
Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT4 = '逆时针画大方形';
Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT5 = '逆时针画小方形';
Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT6 = '变幻';
Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT7 = '火焰';
Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT8 = '行走';
Blockly.Msg.GROVEZERO_RGB_MATRIX_ARGS_ANIMA_OPT9 = '心碎';

Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT1 = '红';
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT2 = '橙';
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT3 = '黄';
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT4 = '绿';
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT5 = '青';
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT6 = '蓝';
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT7 = '紫';
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT8 = '粉红';
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT9 = '白';
Blockly.Msg.GROVEZERO_RGB_MATRIX_XY_SET_ON_OPT10 = '黑';

/**
 * four digit display
 */
Blockly.Msg.GROVEZERO_FOUR_DIGIT_WHEN_COUNTDOWN_END = '%1 %2 四位数码管 倒数结束'
Blockly.Msg.GROVEZERO_FOUR_DIGIT_SHOW_NUMBER = '%1 %2 四位数码管 显示 %3'
Blockly.Msg.GROVEZERO_FOUR_DIGIT_START_COUNTDOWN = '%1 %2 四位数码管 开始倒数 %3 秒'
Blockly.Msg.GROVEZERO_FOUR_DIGIT_OFF = '%1 %2 四位数码管 熄灭'
Blockly.Msg.GROVEZERO_FOUR_DIGIT_SET_BRIGHTNESS = '%1 %2 四位数码管 设置亮度 %3 %'


/**
 * buzzer 
 */
Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY = "%1 %2 蜂鸣器 播放旋律 %3 一次";
Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT0 = 'ba ding';
Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT1 = 'wawawawaa';
Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT2 = 'jump up';
Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT3 = 'jump down';
Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT4 = 'power up';
Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT5 = 'power down';
Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT6 = 'magic wand';
Blockly.Msg.GROVEZERO_BUZZER_PLAY_MELODY_OPT7 = 'siren';

Blockly.Msg.GROVEZERO_BUZZER_MUTE_FOR_BEAT = "%1 %2 蜂鸣器 停顿 %3 拍";
Blockly.Msg.GROVEZERO_BUZZER_SET_BPM = "%1 %2 蜂鸣器 将节奏(bpm) 设定为 %3";
Blockly.Msg.GROVEZERO_BUZZER_ADD_BPM = "%1 %2 蜂鸣器 将节奏(bpm) 增加 %3";
Blockly.Msg.GROVEZERO_BUZZER_GET_BPM = "%1 %2  蜂鸣器 节奏(bpm)";
Blockly.Msg.GROVEZERO_BUZZER_STOP = "%1 %2 蜂鸣器 停止播放";
Blockly.Msg.GROVEZERO_BUZZER_PLAY_NOTE = "%1 %2 蜂鸣器 持续播放音符  %3";
Blockly.Msg.GROVEZERO_BUZZER_PLAY_NOTE_FOR_BEAT = "%1 %2 蜂鸣器 弹奏音符 %3 持续 %4 拍";

Blockly.Msg.SOUND_BUZZER_NOTES_OPT0 = '低 C';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT1 = '低 D';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT2 = '低 E';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT3 = '低 F';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT4 = '低 G';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT5 = '低 A';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT6 = '低 B';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT7 = '中 C';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT8 = '中 D';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT9 = '中 E';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT10 = '中 F';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT11 = '中 G';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT12 = '中 A';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT13 = '中 B';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT14 = '高 C';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT15 = '高 D';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT16 = '高 E';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT17 = '高 F';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT18 = '高 G';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT19 = '高 A';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT20 = '高 B';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT21 = '低 C#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT22 = '低 D#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT23 = '低 F#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT24 = '低 G#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT25 = '低 A#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT26 = '中 C#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT27 = '中 D#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT28 = '中 F#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT29 = '中 G#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT30 = '中 A#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT31 = '高 C#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT32 = '高 D#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT33 = '高 F#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT34 = '高 G#';
Blockly.Msg.SOUND_BUZZER_NOTES_OPT35 = '高 A#';


/**
 * mp3
 */
Blockly.Msg.GROVEZERO_MP3_START_PLAY = '%1 %2 MP3播放器 播放第 %3 首歌';
Blockly.Msg.GROVEZERO_MP3_PAUSE_OR_PLAY = '%1 %2 MP3播放器 %3 播放';
Blockly.Msg.GROVEZERO_MP3_SWITCH = '%1 %2 MP3播放器 %3';
Blockly.Msg.GROVEZERO_MP3_ADD_VOLUME = '%1 %2 MP3播放器 将音量增加 %3 %';
Blockly.Msg.GROVEZERO_MP3_SET_VOLUME = '%1 %2 MP3播放器 将音量设定为 %3 %';
Blockly.Msg.GROVEZERO_MP3_STOP_PLAY = '%1 %2 MP3播放器 停止播放';
Blockly.Msg.GROVEZERO_MP3_PLAY_MODE = '%1 %2 MP3播放器 模式为 %3';
Blockly.Msg.GROVEZERO_MP3_PAUSE_OR_PLAY_OPT0 = '暂停';
Blockly.Msg.GROVEZERO_MP3_PAUSE_OR_PLAY_OPT1 = '恢复';
Blockly.Msg.GROVEZERO_MP3_SWITCH_OPT0 = '下一首';
Blockly.Msg.GROVEZERO_MP3_SWITCH_OPT1 = '上一首';
Blockly.Msg.GROVEZERO_MP3_PLAY_MODE_OPT0 = '顺序播放';
Blockly.Msg.GROVEZERO_MP3_PLAY_MODE_OPT1 = '随机播放';
Blockly.Msg.GROVEZERO_MP3_PLAY_MODE_OPT2 = '单曲循环';

/**
 * mainboard
 */
Blockly.Msg.GROVEZERO_MAINBOARD_START = '%1 %2 当控制板启动时';
Blockly.Msg.GROVEZERO_MAINBOARD_WHEN_ARRIVAL_TIME = '%1 %2 当计时器大于 %3 秒';
Blockly.Msg.GROVEZERO_MAINBOARD_WHEN_RADIO_RECEIVE = '%1 %2 当无线接收到 %3';
Blockly.Msg.GROVEZERO_MAINBOARD_BROADCAST = '%1 %2 广播 %3';
Blockly.Msg.GROVEZERO_MAINBOARD_STOP_BROADCAST = '%1 %2 停止广播';
Blockly.Msg.GROVEZERO_MAINBOARD_SET_BROADCAST_CHANNEL = '%1 %2 设置广播频道 %3';

/**
 * twin button
 */
Blockly.Msg.GROVEZERO_TWIN_BUTTON_WHEN_CLICK = "%1 %2 当 %3 双按钮开关 的 %4 被 %5";
Blockly.Msg.GROVEZERO_TWIN_BUTTON_IS_PRESSED = "%1 %2 %3 双按钮开关 的 %4 正在被按下？";
Blockly.Msg.GROVEZERO_TWIN_BUTTON_WHEN_CLICK_OPT3 = '单击';
Blockly.Msg.GROVEZERO_TWIN_BUTTON_WHEN_CLICK_OPT5 = '长按';

/**
 * imu9 dof
 */
Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_WHEN_CHANGE = "%1 %2 当 9轴姿态传感器 %3";
Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT0 = '竖直向下';
Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT1 = '竖直向上';
Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT2 = '向左倾斜';
Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT3 = '向右倾斜';
Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT4 = '正面朝上';
Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT5 = '正面朝下';
Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT6 = '被摇晃';
Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_OPT7 = '自由落体';
Blockly.Msg.GROVEZERO_IMU9_DOF_STATUS_IS = "%1 %2 9轴姿态传感器 %3 ?";
Blockly.Msg.GROVEZERO_IMU9_DOF_GET_VALUE = "%1 %2 9轴姿态传感器 %3 轴加速度值(mg)";

/**
 * pir motion sensor
 */
Blockly.Msg.GROVEZERO_PIR_MOTION_SENSOR_DETECT_SOMEONE = '%1 %2 当 红外运动传感器 检测到人';

/**
 * mech key
 */
Blockly.Msg.GROVEZERO_MECH_KEY_WHENCLICK = '%1 %2 当 %3 机械按钮开关 被 %4';
Blockly.Msg.GROVEZERO_MECH_KEY_WHENCLICK_OPT0 = '单击';
Blockly.Msg.GROVEZERO_MECH_KEY_WHENCLICK_OPT1 = '长按';
Blockly.Msg.GROVEZERO_MECH_KEY_IS_PRESSED = '%1 %2 %3 机械按钮开关 正在被按下？';
Blockly.Msg.GROVEZERO_MECH_KEY_SET_RGB = '%1 %2 %3 机械按钮开关 背灯亮 %4';
Blockly.Msg.GROVEZERO_MECH_KEY_CLOSE_RGB = '%1 %2 %3 机械按钮开关 背灯熄灭';


/**
 * knob
 */
Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE = '%1 %2 当 %3 旋钮调节器被 %4';
Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE_OPT0 = '顺时针旋转';
Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE_OPT1 = '逆时针旋转';
Blockly.Msg.GROVEZERO_KNOB_WHEN_CHANGE_OPT2 = '按下';

/**
 * gesture
 */
Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE = '%1 %2 当 手势识别传感器 检测到 %3 ';
Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT0 = '向左划';
Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT1 = '向右划';
Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT2 = '向上划';
Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT3 = '向下划';
Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT4 = '物体靠近';
Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT5 = '物体远离';
Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT6 = '顺时针画圈';
Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT7 = '逆时针画圈';
Blockly.Msg.GROVEZERO_GESTURE_SENSOR_WHEN_CHANGE_OPT8 = '手指舞动';

/**
 * touchpad
 */
Blockly.Msg.GROVEZERO_TOUCHPAD_IS_PRESSED = '%1 %2 %3 多触摸开关 引脚 %4 被按下？';
Blockly.Msg.GROVEZERO_TOUCHPAD_WHEN_CLICK = '%1 %2 当 %3 多触摸开关 引脚 %4 被按下';

/**
 * light sensor
 */
Blockly.Msg.GROVEZERO_LIGHT_SENSOR_GET_VALUE = "%1 %2 光线传感器 光线强度(流明)";

Blockly.Msg.GROVEZERO_SOUND_SENSOR_GET_VALUE = "%1 %2 声音传感器 声音响度";

Blockly.Msg.GROVEZERO_TEMPERATURESENSOR_GET_VALUE = "%1 %2 温度传感器 温度值 %3";
Blockly.Msg.GROVEZERO_TEMPERATURESENSOR_GET_VALUE_OPT0 = '℃';
Blockly.Msg.GROVEZERO_TEMPERATURESENSOR_GET_VALUE_OPT1 = '℉';

Blockly.Msg.GROVEZERO_SLIDER_GET_VALUE = '%1 %2 %3 滑动变阻器 值';

Blockly.Msg.GROVEZERO_ULTRASONIC_SENSOR_GET_VALUE = '%1 %2 超声波测距传感器 距离（厘米）';
// 温湿度传感器 温度值【选择控件】
Blockly.Msg.GROVEZERO_TEMHUM_SENSOR_GET_TEM_VALUE = '%1 %2 温湿度传感器 温度值 %3';
Blockly.Msg.GROVEZERO_TEMHUM_SENSOR_GET_HUM_VALUE = '%1 %2 温湿度传感器 湿度值（%）';


Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_GET_COLOR = "%1 %2 识色循迹传感器 颜色值";
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITION = "%1 %2 识色循迹传感器 线的位置为 %3";
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT0 = '中';
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT1 = '右';
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT2 = '最右';
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT3 = '左';
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT4 = '最左';
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_POSITiON_OPT5 = '丢失';
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR = "%1 %2 识色循迹传感器 检测到 %3 色";
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT0 = '红';
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT1 = '绿';
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT2 = '蓝';
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT3 = '黑';
Blockly.Msg.GROVEZERO_COLOR_LINE_FOLLOWER_IS_COLOR_OPT4 = '其他';


/**
 * arduino
 */
Blockly.Msg.ARDUINO_SEEED_SERVO_MOVE = '%1 %2 Servo Pin %3 Degree %4 Delay %5';
Blockly.Msg.ARDUINO_SEEED_SERVO_READ_DEGREES = '%1 %2 Servo Pin %3 Read Degrees';
Blockly.Msg.ARDUINO_SEEED_LED = '%1 %2 LED Pin %3 stat %4';
Blockly.Msg.ARDUINO_SEEED_BUZZER = '%1 %2 Buzzer Pin %3 stat %4';
Blockly.Msg.ARDUINO_SEEED_RELAY = '%1 %2 Relay Pin %3 stat %4';
Blockly.Msg.ARDUINO_SEEED_BTN = '%1 %2 Button Pin %3';
Blockly.Msg.ARDUINO_SEEED_TILT = '%1 %2 Tilt Pin %3';
Blockly.Msg.ARDUINO_SEEED_TOUCH = '%1 %2 Touch Pin %3';
Blockly.Msg.ARDUINO_SEEED_ROTATION = '%1 %2 Rotation Pin %3';
Blockly.Msg.ARDUINO_SEEED_SOUND = '%1 %2 Sound Pin %3';
Blockly.Msg.ARDUINO_SEEED_LIGHT = '%1 %2 Light Pin %3';
Blockly.Msg.ARDUINO_SEEED_TEMPERATURE = '%1 %2 Temperature Pin %3';
Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_PRINT = '%1 %2 LCD RGB Backlight print line1 %3 print line2 %4';
Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_PRINT2 = '%1 %2 LCD RGB Backlight row %3 column %4 print %5';
Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER = '%1 %2 LCD RGB Backlight %3';
Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT1 = 'On'
Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT2 = 'Off'
Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT3 = 'Cursor'
Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT4 = 'No Cursor'
Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT5 = 'Blink'
Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT6 = 'No Blink'
Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_POWER_OPT7 = 'Clear'

Blockly.Msg.ARDUINO_GROVE_SERIAL_LCD_SETRGB = '%1 %2 LCD RGB setColor R %3 G %4 B %5';

Blockly.Msg.ARDUINO_SEEED_TEMPERATURE_HUMIDITY = '%1 %2 温湿度传感器 管脚 %3 %4';
Blockly.Msg.ARDUINO_SEEED_TEMPERATURE_HUMIDITY_OPT1 = 'temperature'
Blockly.Msg.ARDUINO_SEEED_TEMPERATURE_HUMIDITY_OPT2 = 'humidity'
Blockly.Msg.ARDUINO_SEEED_THUMB_JOYSTICK = '%1 %2 拇指控制杆管脚 %3 坐标值 %4轴';
Blockly.Msg.ARDUINO_SEEED_ULT = '%1 %2 超声波测距传感器 管脚 %3';
Blockly.Msg.ARDUINO_SEEED_LINE_FINDER = '%1 %2 红外接近传感器 管脚 %3';
Blockly.Msg.ARDUINO_SEEED_LINE_FINDER_R = '%1 %2 巡线传感器 管脚 %3';

Blockly.Msg.ARDUINO_SEEED_WATER = '%1 %2 水分子检测传感器 管脚 %3';
Blockly.Msg.ARDUINO_SEEED_MAGNETIC_SWITCH = '%1 %2 磁力开关 管脚 %3';
Blockly.Msg.ARDUINO_SEEED_PIR_MOTION = '%1 %2 人体红外传感器 管脚 %3';
Blockly.Msg.ARDUINO_SEEED_FLAME = '%1 %2 火焰传感器 管脚 %3';
Blockly.Msg.ARDUINO_SEEED_COLLISION = '%1 %2 碰撞传感器 管脚 %3';
Blockly.Msg.ARDUINO_SEEED_HALL = '%1 %2 霍尔电磁开关 管脚 %3';
Blockly.Msg.ARDUINO_SEEED_SLIDE_POT = '%1 %2 滑动电位开关 管脚 %3';
Blockly.Msg.ARDUINO_SEEED_MOISTURE = '%1 %2 土壤湿度传感器 管脚 %3';

Blockly.Msg.ARDUINO_SEEED_4DIGIT_DISPLAY = '%1 %2 4位数码管 管脚 %3 显示为 %4';
Blockly.Msg.ARDUINO_SEEED_RGB_LED = '%1 %2 炫彩RGB LED灯 管脚 %3 显示为 %4 序号 %5';
Blockly.Msg.ARDUINO_SEEED_RGB_LED1 = '%1 %2 炫彩RGB LED灯 管脚 %3 显示为 R %4 G %5 B %6 序号 %7';
Blockly.Msg.ARDUINO_SEEED_RGB_LED10 = '%1 %2 炫彩RGB LED灯 管脚 %3 显示为 %4';
Blockly.Msg.ARDUINO_SEEED_RGB_LED11 = '%1 %2 炫彩RGB LED灯 管脚 %3 显示为 R %4 G %5 B %6';
Blockly.Msg.ARDUINO_SEEED_SPEAKER = '%1 %2 扬声器 管脚 %3 播放音符 %4 以%5拍';
Blockly.Msg.ARDUINO_SEEED_RECORDER = '%1 %2 录音播放模块 管脚 %3 %4';

Blockly.Msg.ARDUINO_SEEED_EL_DRIVER = '%1 %2 冷光条驱动 管脚 %3 设为 %4';
Blockly.Msg.ARDUINO_SEEED_EL_VIBRATION_MOTOR = '%1 %2 震动马达 管脚 %3 设为 %4';
Blockly.Msg.ARDUINO_SEEED_ELECTROMAGNET = '%1 %2 电磁铁模块 管脚 %3 设为 %4';
Blockly.Msg.ARDUINO_SEEED_MINI_FAN = '%1 %2 迷你风扇 管脚 %3 设为 %4';


Blockly.Msg.ARDUINO_GROVE_SERIAL_3ADA = '%1 %2 三轴数字加速度 %3 轴';
Blockly.Msg.ARDUINO_GROVE_SERIAL_TOUCH = '%1 %2 多通道触摸传感器 通道 %3';
Blockly.Msg.ARDUINO_GROVE_SERIAL_MINI_MOTOR_DRIVER = '%1 %2 迷你电机驱动模块 电机 %3 转速（-255~255）%4';

Blockly.Msg.ARDUINO_GROVE_SERIAL_MINI_MOTOR_DRIVER_STOP = '%1 %2 迷你电机驱动模块 电机 %3 停止';

Blockly.Msg.ARDUINO_SEEED_LED_STRING_LIGHT = '%1 %2 LED灯条 管脚 %3 编号 %4 显示为 R %5 G %6 B %7';

Blockly.Msg.ARDUINO_SEEED_LED_BAR = '%1 %2 柱状发光二级管 管脚 %3 %4 %5';

Blockly.Msg.ARDUINO_SEEED_LED_CIRCULAR_LED = '%1 %2 环形发光二级管 管脚 %3 亮灯 %4';

Blockly.Msg.ARDUINO_SEEED_GESTURE = '%1 %2 手势识别传感器 识别手势 %3？';

Blockly.Msg.ARDUINO_SEEED_SPEECH_RECOGNIZER = '%1 %2  语音识别传感器 管脚 %3 识别语音 %4？';


Blockly.Msg.ARDUINO_FIGURE_OUTPUT = '数字输出 管脚 %1 设为 %2';

Blockly.Msg.ARDUINO_FIGURE_INPUT = '数字输入 管脚 %1';


Blockly.Msg.ARDUINO_ANALOG_INPUT = '模拟输入 管脚 %1';
Blockly.Msg.ARDUINO_ANALOG_OUTPUT = '模拟输出 管脚 %1 赋值为 %2';
Blockly.Msg.ARDUINO_PULSE_LEN = '脉冲长度 管脚 %1 状态 %2';
Blockly.Msg.ARDUINO_PULSE_LEN_US = '脉冲长度 管脚 %1 状态 %2 超时(微秒) %3';
Blockly.Msg.ARDUINO_SERIAL_BAUD_RATE = '串口 波特率 %1';
Blockly.Msg.ARDUINO_SERIAL_PRINT = '串口 写入文本 %1';
Blockly.Msg.ARDUINO_SERIAL_IS_READABLE = '串口 有数据可读吗？';
Blockly.Msg.ARDUINO_SERIAL_READ = '串口 读取字符串';
Blockly.Msg.ARDUINO_DELAY_MS = '延时 毫秒 %1';
Blockly.Msg.ARDUINO_DELAY_US = '延时 微秒 %1';
Blockly.Msg.ARDUINO_SYS_TIME = '系统运行时间 %1';
Blockly.Msg.ARDUINO_KEEP_WAIT = '一直等待(结束程序)';
Blockly.Msg.ARDUINO_FOR1 = '使用 %1 从 %2 到 %3 步长为 %4';
Blockly.Msg.ARDUINO_FOR2 = '执行 %1';

Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT = '%1 %2 RGB矩阵 点亮 x:%3 y:%4 %5';
Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_SHOW_TEXT = '%1 %2 RGB矩阵 显示字符串 %3';
Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_SHOW_EMOJS = '%1 %2 RGB矩阵 显示图案 %3';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT1 = '%1 %2 Otto DIY机器人 %3 步数:%4 时间:%5';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2 = '%1 %2 Otto DIY机器人 %3 步数:%4 时间:%5 方向:%6';

Blockly.Msg.ARDUINO_SETUP_LOOP0 = '初始化 setup';
Blockly.Msg.ARDUINO_SETUP_LOOP2 = '循环 loop';
Blockly.Msg.ARDUINO_REPEAT = '重复当 %1';
Blockly.Msg.ARDUINO_BREAK = '中断循环';


Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT0 = '向上';
Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT1 = '向下';
Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT2 = '向左';
Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT3 = '向右';
Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT4 = '向前';
Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT5 = '向后';
Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT6 = '顺时针';
Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT7 = '逆时针';
Blockly.Msg.ARDUINO_SEEED_GESTURE_OPT8 = '挥手';


Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT0 = '红';
Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT1 = '橙';
Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT2 = '黄';
Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT3 = '绿';
Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT4 = '青';
Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT5 = '蓝';
Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT6 = '紫';
Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT7 = '粉红';
Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT8 = '白';
Blockly.Msg.ARDUINO_GROVE_SERIAL_RGB_LED_MATRIX_ON_POINT_OPT9 = '熄灭';


Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT1_OPT0 = '前进';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT1_OPT1 = '后退';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT1_OPT2 = '往左';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT1_OPT3 = '往右';


Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT0 = 'Rest';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT1 = 'Jump';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT2 = 'Bend';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT3 = 'ShakeLeg';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT4 = 'UpDown';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT5 = 'Swing';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT6 = 'TipToeSwing';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT7 = 'Jitter';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT8 = 'AscendingTurn';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT9 = 'Moonwalker';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT10 = 'Crusaito';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT11 = 'Flapping';

Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT12 = 'RIGHT/FOREWARD';
Blockly.Msg.ARDUINO_GROVE_OTTO_DIY_ROBOT2_OPT13 = 'LEFT/BACKWARD';


Blockly.Msg.ARDUINO_SHIELD_BOT2 = '%1 %2 Shield Bot 小车 循迹传感器线的位置为 %3';
Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT1 = '中';
Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT2 = '左';
Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT3 = '最左';
Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT4 = '右';
Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT5 = '最右';
Blockly.Msg.ARDUINO_SHIELD_BOT2_OPT6 = '丢失';

Blockly.Msg.ARDUINO_SHIELD_BOT1 = '%1 %2 Shield Bot 小车 %3 %4';

Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT1 = '前进';
Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT2 = '后退';
Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT3 = '往左';
Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT4 = '往右';
Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT5 = '停止';
Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT6 = '低速';
Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT7 = '中速';
Blockly.Msg.ARDUINO_SHIELD_BOT1_OPT8 = '高速';

// 
Blockly.Msg.CATEGORY_ARDUINO_INIT = '初始化';
Blockly.Msg.CATEGORY_ARDUINO_INPUT = '输入';
Blockly.Msg.CATEGORY_ARDUINO_OUTPUT = '输出';
Blockly.Msg.CATEGORY_ARDUINO_SERIAL = '串口';
Blockly.Msg.CATEGORY_ARDUINO_GROVE_IGURE = 'Grove 数字';
Blockly.Msg.CATEGORY_ARDUINO_GROVE_ANALOG = 'Grove 模拟';
Blockly.Msg.CATEGORY_ARDUINO_GROVE_I2C = 'Grove I2C';
Blockly.Msg.CATEGORY_ARDUINO_ROBOT_KIT = 'Robot Kit';


Blockly.Msg.ARDUINO_WEBSERVER_SHOW = '%1 %2 web服务器 %3 %4 显示 名称：%5 数值：%6';
Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT1 = ''
Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT2 = ''
Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT3 = ''
Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT4 = ''
Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT5 = ''
Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT6 = ''
Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT7 = ''
Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT8 = ''
Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT9 = ''
Blockly.Msg.ARDUINO_WEBSERVER_SHOW_OPT10 = ''

Blockly.Msg.ARDUINO_WEBSERVER_INIT = '%1 %2 web服务器 初始化 %3';

Blockly.Msg.ARDUINO_WEBSERVER_INIT_OPT1 = '智慧城市'

Blockly.Msg.ARDUINO_COLOR_SENSOR = '%1 %2 颜色识别传感器 识别到颜色 %3 ？';
Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT1 = '红'
Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT2 = '绿'
Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT3 = '蓝'
Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT4 = '黑'
Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT5 = '白'
Blockly.Msg.ARDUINO_COLOR_SENSOR_OPT6 = '其他'



Blockly.Msg.GROVEZERO_MATH_ITOA_VALUE_MESSAGE0 = "转字符串 %1";

Blockly.Msg.TOOLBOX_EXTENSION_CATEGORY_NAME = "扩展";
Blockly.Msg.TOOLBOX_SEARCH = "搜索";
Blockly.Msg.TOOLBOX_NO_RESULT = "无搜索结果";
Blockly.Msg.TOOLBOX_NO_BLOCKS = "当前设备下没有找到满足条件的积木名称";
Blockly.Msg.TOOLBOX_SEARCH_OTHER_DEVICE = "建议您尝试在其他设备下寻找该积木";
Blockly.Msg.TOOLBOX_TOGGLE_DEVICE = "切换设备";



Blockly.Msg.ARDUINO_SEEED_VOLTAGE = '%1 %2 电压传感器 管脚 %3'
Blockly.Msg.ARDUINO_SEEED_QUALITY = '%1 %2 空气污染传感器 管脚 %3'
Blockly.Msg.ARDUINO_SEEED_WATER_ANALOG = '%1 %2 水分子检测传感器 管脚 %3'

Blockly.Msg.ARDUINO_SEEED_HUMIDIFIER = '%1 %2 雾化器 管脚 %3 设为 %4'
Blockly.Msg.ARDUINO_SEEED_VIBRATION = '%1 %2 震动传感器 管脚 %3'
Blockly.Msg.ARDUINO_SEEED_LED_ANALOG = '%1 %2 LED灯 管脚 %3 设为 %4 '

Blockly.Msg.ARDUINO_VISION_SENSOR1 = '%1 %2 图像识别传感器 识别 球体 %3'
Blockly.Msg.ARDUINO_VISION_SENSOR1_OPT1 = '橙色乒乓球'
Blockly.Msg.ARDUINO_VISION_SENSOR1_OPT2 = '绿色网球'




Blockly.Msg.ARDUINO_VISION_SENSOR2 = '%1 %2 图像识别传感器 识别 交通标示卡片 %3'
Blockly.Msg.ARDUINO_VISION_SENSOR3 = '%1 %2 图像识别传感器 识别 数字卡片 %3'
Blockly.Msg.ARDUINO_VISION_SENSOR4 = '%1 %2 图像识别传感器 识别 图形 %3';
Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT1 = '对号'
Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT2 = '叉号'
Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT3 = '圆形'
Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT4 = '方形'
Blockly.Msg.ARDUINO_VISION_SENSOR4_OPT5 = '三角形'

Blockly.Msg.ARDUINO_VISION_SENSOR5 = '%1 %2 图像识别传感器 识别 人体';
Blockly.Msg.ARDUINO_VISION_SENSOR6 = '%1 %2 图像识别传感器 识别 颜色 %3';
Blockly.Msg.ARDUINO_VISION_SENSOR7 = '%1 %2 图像识别传感器 获取识别颜色值';

Blockly.Msg.BUZZER_TONE_LOW = '低'
Blockly.Msg.BUZZER_TONE_MIDDLE = '中'
Blockly.Msg.BUZZER_TONE_HIGH = '高'
Blockly.Msg.BUZZER_SELECTED_PREFIX = '已选：'

Blockly.Msg.ARDUINO_LED_STRIP1 = '%1 %2 炫彩RGB LED灯条 管脚 %3 显示为R值 %4 G值 %5 B值 %6 序号 %7';
Blockly.Msg.ARDUINO_LED_STRIP2 = '%1 %2 炫彩RGB LED灯条 管脚 %3 显示为R值 %4 G值 %5 B值 %6';

Blockly.Msg.ARDUINO_OLED1 = '%1 %2 OLED屏幕 显示图案 %3';
Blockly.Msg.ARDUINO_OLED2 = '%1 %2 OLED屏幕 显示字符串 %3 第 %4 行，第 %5 列';
Blockly.Msg.ARDUINO_OLED3 = '%1 %2 OLED屏幕 清除显示';


//maixduino
Blockly.Msg.MAIXDUINO_ENENT_WHENSTARTUP = '当主控板启动时'

Blockly.Msg.MAIXDUINO_DISPLAY_STRING = '%1 %2 显示 %3'
Blockly.Msg.MAIXDUINO_DISPLAY_SET_CIRCLE = '绘制圆形：圆心坐标 X%1 Y%2 半径%3'
Blockly.Msg.MAIXDUINO_DISPLAY_SET_RECTANGLE = '绘制长方形: X1%1 Y1%2 X2%3 Y2%4'

Blockly.Msg.MAIXDUINO_DISPLAY_DRAW_CIRCLE = '%1 %2 绘制球形区域 %3'
Blockly.Msg.MAIXDUINO_DISPLAY_DRAW_RECTANGLE = '%1 %2 绘制长方形区域 %3'

Blockly.Msg.MAIXDUINO_CAMERA_SET_THRESHOLD = '%1 %2 设置图像识别 灵敏度为 %3'
Blockly.Msg.MAIXDUINO_CAMERA_TAKE_PICTURE = '拍照: 文件名 %1'
Blockly.Msg.MAIXDUINO_CAMERA_TAKE_VIDEO = '录像：时间 %1 秒， 文件名 %2'
Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_BALL = '%1 %2 检测到球形？'
Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_BALL_COORD = '%1 %2 球形 %3 检测 %4'
Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_BALL_VALUE = '%1 %2 球形 %3 检测'
Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_RECTANGLE = '%1 %2 检测到长方形？'
Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_RECTANGLE_COORD = '%1 %2 长方形 %3 检测 %4'
Blockly.Msg.MAIXDUINO_CAMERA_DETECTION_RECTANGLE_VALUE = '%1 %2 长方形 %3 检测'
Blockly.Msg.MAIXDUINO_CAMERA_GET_BALL_AVERAGE_COLOR = '%1 %2 球形区域：X坐标 %3 Y坐标 %4 R值 %5 的平均颜色RGB值'
Blockly.Msg.MAIXDUINO_CAMERA_GET_RECTANGLE_AVERAGE_COLOR = '%1 %2 长方形区域：Xmin坐标 %3 Xmax坐标 %4 Ymin坐标 %5 Ymax坐标 %6 的平均颜色RGB值'
Blockly.Msg.MAIXDUINO_CAMERA_INTEREST_AREA_COLOR = '%1 %2 兴趣区域 %3 检测到 %4 ?'
Blockly.Msg.MAIXDUINO_CAMERA_INTEREST_AREA_AVERAGE_COLOR = '%1 %2 兴趣区域 %3 的平均颜色RGB值'

Blockly.Msg.MAIXDUINO_SENSING_HOME_ANIMAL_DETECTION = '%1 %2 家庭动物识别 概率 > %3 %';
Blockly.Msg.MAIXDUINO_SENSING_HOME_ANIMAL_SEL_DETECTION = '%1 %2 家庭动物识别 %3 概率 > %4 %';
Blockly.Msg.MAIXDUINO_SENSING_ZOO_ANIMAL_DETECTION = '%1 %2 动物园动物识别 概率 > %3 %';
Blockly.Msg.MAIXDUINO_SENSING_ZOO_ANIMAL_SEL_DETECTION = '%1 %2 动物园动物识别 %3 概率 > %4 %';
// Blockly.Msg.MAIXDUINO_SENSING_OTHER_ANIMAL_DETECTION = '%1 %2 其他动物检测 概率 > %3 %';
// Blockly.Msg.MAIXDUINO_SENSING_OTHER_ANIMAL_SEL_DETECTION = '%1 %2 其他动物检测 %3 概率 > %4 %';
Blockly.Msg.MAIXDUINO_SENSING_ORDINARY_OBJECT_DETECTION = '%1 %2 普通物体识别 概率 > %3 %';
Blockly.Msg.MAIXDUINO_SENSING_ORDINARY_OBJECT_SEL_DETECTION = '%1 %2 普通物体识别 %3 概率 > %4 %';
Blockly.Msg.MAIXDUINO_SENSING_NUM_DETECTION = '%1 %2 数字检测 概率 > %3 %';
Blockly.Msg.MAIXDUINO_NUM_SEL_DETECTION = '%1 %2 数字检测 %3 概率 > %4 %';
Blockly.Msg.MAIXDUINO_NUM_CERTRE_DETECTION = '识别到的数字 %1 概率 > %3 % 的 %2';
Blockly.Msg.MAIXDUINO_SENSING_TRAFFIC_SIGNS_DETECTION = '%1 %2 交通标志检测 概率 > %3 %';
Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_SEL_DETECTION = '%1 %2 交通标志检测 %3 概率 > %4 %';
Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_CERTRE_DETECTION = '识别到的交通标志 %1 的 %2 坐标 概率 >%3 %';

Blockly.Msg.MAIXDUINO_INPUT_SYSTEMTIME = '系统运行时间 %1'

Blockly.Msg.MAIXDUINO_CAMERA_R_MAX = 'R最大'
Blockly.Msg.MAIXDUINO_CAMERA_R_MIN = 'R最小'

Blockly.Msg.MAIXDUINO_CAMERA_SIZE_MAX = '最大'
Blockly.Msg.MAIXDUINO_CAMERA_SIZE_MIN = '最小'

Blockly.Msg.MAIXDUINO_CAMERA_COORD_X = '位置：X坐标'
Blockly.Msg.MAIXDUINO_CAMERA_COORDP_Y = '位置：Y坐标'
Blockly.Msg.MAIXDUINO_CAMERA_COORDP_XMIN = '位置：Xmin坐标'
Blockly.Msg.MAIXDUINO_CAMERA_COORDP_YMIN = '位置：Ymin坐标'
Blockly.Msg.MAIXDUINO_CAMERA_COORDP_XMAX = '位置：Xmax坐标'
Blockly.Msg.MAIXDUINO_CAMERA_COORDP_YMAX = '位置：Ymax坐标'
Blockly.Msg.MAIXDUINO_CAMERA_R_VALUE = 'R值'
Blockly.Msg.MAIXDUINO_CAMERA_A_VALUE = '面积'

Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT1 = '红'
Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT2 = '绿'
Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT3 = '蓝'
Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT4 = '黄'
Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT5 = '青'
Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT6 = '紫'
Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT7 = '黑'
Blockly.Msg.MAIXDUINO_CAMERA_SENSOR_OPT8 = '白'

Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT1 = '猫'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT2 = '狗'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT3 = '鸟'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT4 = '刺猬'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT5 = '老鼠'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT6 = '鳄鱼'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT7 = '熊'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT8 = '大象'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT9 = '长颈鹿'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT10 = '老虎'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT11 = '蝴蝶'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT12 = '蟑螂'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT13 = '鱼'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT14 = '蜥蜴'
Blockly.Msg.MAIXDUINO_SENSING_ANIMAL_OPT15 = '蜘蛛'


Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT0 = '左转'
Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT1 = '右转'
Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT2 = '直行'
Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT3 = '调头'
Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT4 = '停车让行'
Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT5 = '限速5'
Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT6 = '限速80'
Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT7 = '禁止直行'
Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT8 = '减速让行'
Blockly.Msg.MAIXDUINO_TRAFFIC_SIGNS_OPT9 = '注意行人'

Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT1 = '椅子'
Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT2 = '书籍'
Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT3 = '杯子'
Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT4 = '笔'
Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT5 = '比萨饼'
Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT6 = '智能手机'
Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT7 = '炸弹'
Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT8 = '电脑'
Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT9 = '人'
Blockly.Msg.MAIXDUINO_SENSING_OBJECT_OPT10 = '背包'

Blockly.Msg.MAIXDUINO_SENSING_COORD_X = 'X中心坐标'
Blockly.Msg.MAIXDUINO_SENSING_COORD_Y = 'Y中心坐标'
Blockly.Msg.MAIXDUINO_SENSING_COORD_A = '面积'

Blockly.Msg.MAIXDUINO_LINEPAROL_ANGLE = '%1 %2 巡线 设置线识别颜色为 %3 区域权重 红区%4%  蓝区%5%  绿区%6%'

Blockly.Msg.MAIXDUINO_CAMERA_BALL_AERA = '球形'
Blockly.Msg.MAIXDUINO_CAMERA_RECTANGLE_AERA = '长方形'

Blockly.Msg.MAIXDUINO_ROBOT_MARK_RUN = '%1 %2 M.A.R.K 小车 %3 %4'
Blockly.Msg.MAIXDUINO_ROBOT_MOTOR_RUN = '%1 %2 M.A.R.K 设置电机 %3 转速为 %4 %'
Blockly.Msg.MAIXDUINO_ROBOT_SERVO_RUN = '%1 %2 M.A.R.K 舵机 %3 转到 %4 度'

Blockly.Msg.MAIXDUINO_ROBOT_STEPPER_SERVO_SETANGLE = '%1 %2 M.A.R.K 设置步进电机步距角为 %3 °'
Blockly.Msg.MAIXDUINO_ROBOT_STEPPER_SERVO_SETROTATESPEED = '%1 %2 M.A.R.K 设置步进电机转速为 %3 RPM'
Blockly.Msg.MAIXDUINO_ROBOT_STEPPER_SERVO_RUN = '%1 %2 M.A.R.K 步进电机转动 %3 步'
Blockly.Msg.MAIXDUINO_ROBOT_STEPPER_SERVO_TURN = '%1 %2 M.A.R.K 转弯角度 %3 速度为 %4 灵敏度为 %5'

//mpython
Blockly.Msg.MPYTHON_ENENT_WHENSTARTUP = '%1 %2 当掌控板 启动'
Blockly.Msg.MPYTHON_ENENT_WHENACTION = '%1 %2 当按键 %3 被 %4 时'
Blockly.Msg.MPYTHON_ENENT_WHENPINVOLTAGE = '%1 %2 当引脚 %3 被 %4 时'
Blockly.Msg.MPYTHON_ENENT_WHENSHARK = '%1 %2 当掌控板 被摇晃时'
Blockly.Msg.MPYTHON_ENENT_TILT_DIRECTION = '%1 %2 当掌控板 %3 时'
Blockly.Msg.MPYTHON_ENENT_WHENTOUCHKEY = '%1 %2 当触摸键 %3 被 %4 时'

Blockly.Msg.MPYTHON_ENENT_FOR1 = '%1 %2 设置定时器 %3 %4 周期 %5 毫秒'
Blockly.Msg.MPYTHON_ENENT_FOR2 = '执行 %1'
Blockly.Msg.MPYTHON_ENENT_CLEAR_TIMER = '%1 %2 清除 定时器/事件 %3'
Blockly.Msg.MPYTHON_ENENT_TIMER_COUNT = '%1 %2 定时器 %3 的计数值'
Blockly.Msg.MPYTHON_EVENT_WHEN_ACTION = '%1 %2 事件 %3 : 当 %4 时'
Blockly.Msg.MPYTHON_EVENT_CHILD_THREAD = '%1 %2 子线程 %3'

Blockly.Msg.MPYTHON_SYSRESOURES_BUTTON_PRESSED = "%1 %2 按键 %3 被按下"
Blockly.Msg.MPYTHON_SYSRESOURES_BUTTON_TOUCH = "%1 %2 按键 %3 被触摸"
Blockly.Msg.MPYTHON_SYSRESOURES_TOUCH_VALUE = "%1 %2 按键 %3 触摸值"
Blockly.Msg.MPYTHON_SYSRESOURES_VOLUME = "%1 %2 声音值"
Blockly.Msg.MPYTHON_SYSRESOURES_LIGHT = "%1 %2 光线值"
Blockly.Msg.MPYTHON_SYSRESOURES_ACCELERATION = "%1 %2 %3 轴加速度"
Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE = "%1 %2 %3 轴倾斜角"
Blockly.Msg.MPYTHON_SYSRESOURES_SHARKED = "%1 %2 掌控版 被摇晃"
Blockly.Msg.MPYTHON_SYSRESOURES_SLOPE_ANGLE = "%1 %2 掌控版 %3"

Blockly.Msg.MPYTHON_SYSRESOURES_SET_SINGLE_COLOR = "%1 %2 设置 %3 RGB灯颜色为 %4"
Blockly.Msg.MPYTHON_SYSRESOURES_SET_SINGLE_RGB = "%1 %2 设置 %3 RGB灯颜色为 R %4 G %5 B %6"
Blockly.Msg.MPYTHON_SYSRESOURES_SET_ALL_COLOR = "%1 %2 设置所有 RGB灯颜色为 %3"
Blockly.Msg.MPYTHON_SYSRESOURES_SET_ALL_RGB = "%1 %2 设置所有 RGB灯颜色为 R %3 G %4 B %5"
Blockly.Msg.MPYTHON_SYSRESOURES_CLOSE_RGB = "%1 %2 关闭 RGB灯"
Blockly.Msg.MPYTHON_SYSRESOURES_SET_BME280 = "%1 %2 BME280 %3"
Blockly.Msg.MPYTHON_SYSRESOURES_DRAW_CLOCK = "%1 %2 绘制时钟 x %3 y %4 半径 %5"
Blockly.Msg.MPYTHON_SYSRESOURES_CLOCK_OPERATE = "%1 %2 %3 时钟"
Blockly.Msg.MPYTHON_SYSRESOURES_SET_RUN_TIME = "%1 %2 运行时间 %3"
Blockly.Msg.MPYTHON_SYSRESOURES_SET_LOCAL_TIME = "%1 %2 本地时间 %3"
Blockly.Msg.MPYTHON_SYSRESOURES_RESET = "%1 %2 复位"
Blockly.Msg.MPYTHON_SYSRESOURES_MAC_ADDRESS = "%1 %2 MAC地址"

Blockly.Msg.MPYTHON_LOOKS_OLED = "%1 %2 OLED 屏 %3"
Blockly.Msg.MPYTHON_LOOKS_OLED_LINE_TEXT = "%1 %2 OLED 屏第 %3 行显示 %4 模式 %5"
Blockly.Msg.MPYTHON_LOOKS_OLED_CLEAR_LINE = "%1 %2 OLED 屏 清除第 %3 行"
Blockly.Msg.MPYTHON_LOOKS_DISPLAY_TEXT = "%1 %2 显示文本 x %3 y %4 内容 %5 模式 %6"
Blockly.Msg.MPYTHON_LOOKS_TRACE_POINT = "%1 %2 描点 x %3 y %4 为 %5"
Blockly.Msg.MPYTHON_LOOKS_PROGRESS = "%1 %2 进度条 x %3 y %4 宽 %5 高 %6 进度 %7"
Blockly.Msg.MPYTHON_LOOKS_COLUMN_STRIP = "%1 %2 柱状条 %3 x %4 y %5 宽 %6 高 %7 进度 %8"
Blockly.Msg.MPYTHON_LOOKS_DRAW_LINE = "%1 %2 %3 线 x1 %4 y1 %5 到 x2 %6 y2 %7"
Blockly.Msg.MPYTHON_LOOKS_DRAW_FRAME = "%1 %2 %3 边框 x %4 y %5 宽 %6 高 %7"
Blockly.Msg.MPYTHON_LOOKS_DRAW_ARC_BORDER = "%1 %2 %3 圆角边框 x %4 y %5 宽 %6 高 %7 半径 %8"
Blockly.Msg.MPYTHON_LOOKS_DRAW_RECT = "%1 %2 %3 矩形 x %4 y %5 宽 %6 高 %7"
Blockly.Msg.MPYTHON_LOOKS_DRAW_CIRCLE = "%1 %2 %3 %4 圆 x %5 y %6 半径 %7"
Blockly.Msg.MPYTHON_LOOKS_DRAW_TRIANGLE = "%1 %2 %3 %4 三角形 x %5 y %6 x2 %7 y2 %8 x3 %9 y3 %10"
Blockly.Msg.MPYTHON_LOOKS_DRAW_DISPLAY_PICTURE = "%1 %2 在 x %3 y %4 显示图像 %5"
Blockly.Msg.MPYTHON_LOOKS_DRAW_DISPLAY = "%1 %2 在 x %3 y %4 显示 %5 字体 %6 %7"

Blockly.Msg.MPYTHON_MUSIC_STOP_PLAY = "%1 %2 停止音乐 引脚 %3"
Blockly.Msg.MPYTHON_MUSIC_RESTORE_MUSIC_SET = "%1 %2 恢复音乐设置"
Blockly.Msg.MPYTHON_MUSIC_NOTE_BEAT = "%1 %2 音符 %3 节拍 %4"
Blockly.Msg.MPYTHON_MUSIC_NOTE_BEAT_PIN = "%1 %2 播放音符 音符 %3 节拍 %4 引脚 %5"
Blockly.Msg.MPYTHON_MUSIC_TONE = "%1 %2 音调 %3"
Blockly.Msg.MPYTHON_MUSIC_PLAY_TONE_PIN = "%1 %2 播放音调 音调%3 延时 %4 引脚 %5"
Blockly.Msg.MPYTHON_MUSIC_PLAY_TONE_PIN_PARA = "%1 %2 播放音调 从 %3 到 %4 步长 %5 时长 %6 （毫秒）引脚 %7"
Blockly.Msg.MPYTHON_MUSIC_PLAY_MUSIC_PIN = "%1 %2 播放音乐 %3 等待 %4 循环 %5 引脚 %6"
Blockly.Msg.MPYTHON_MUSIC_SET_PLAY_SPEED = "%1 %2 设置播放速度为 %3 倍"
Blockly.Msg.MPYTHON_MUSIC_SET_BEAT = "%1 %2 设置每一拍等同 %3 分音符，每分钟节拍数 %4"
Blockly.Msg.MPYTHON_MUSIC_SET_CURRENT_BEAT = "%1 %2 当前节拍数"

Blockly.Msg.MPYTHON_BUZZER_INIT = "%1 %2 音频 初始化"
Blockly.Msg.MPYTHON_BUZZER_RELEASE_CACHE = "%1 %2 音频 释放缓存"
Blockly.Msg.MPYTHON_BUZZER_SET_VOLUMN = "%1 %2 设置音频音量 %3"
Blockly.Msg.MPYTHON_BUZZER_SET_ACTION = "%1 %2 音频 %3"
Blockly.Msg.MPYTHON_BUZZER_PLAY = "%1 %2 音频 播放 %3"
Blockly.Msg.MPYTHON_BUZZER_VOICE_CONF = "%1 %2 TTS 语音配置 APPID %3 APIKey %4"
Blockly.Msg.MPYTHON_BUZZER_VOICE_PLAY = "%1 %2 TTS 语音播放 %3"

Blockly.Msg.MPYTHON_PIN_GET_VALUE = "%1 %2 读取引脚 %3 数字值"
Blockly.Msg.MPYTHON_PIN_SET_VALUE = "%1 %2 设置引脚 %3 数字值为 %4"
Blockly.Msg.MPYTHON_PIN_GET_ANALOG_VALUE = "%1 %2 读取引脚 %3 模拟值"
Blockly.Msg.MPYTHON_PIN_SET_ANALOG_VALUE = "%1 %2 设置引脚 %3 PWM为 %4"
Blockly.Msg.MPYTHON_PIN_SET_SERVO_ANGLE = "%1 %2 设置舵机 %3 角度为 %4"
Blockly.Msg.MPYTHON_PIN_SET_SERVO_PWM_MAXANGLE = "%1 %2 设置舵机 %3 角度为 %4 脉宽从 %5 到 %6 最大角度 %7"
Blockly.Msg.MPYTHON_PIN_SET_PIN_MODE = "%1 %2 设置引脚 %3 为 %4 模式 %5"
Blockly.Msg.MPYTHON_PIN_EXTERNAL_LEVEL_DURATION = "%1 %2 %3 外部 %4% 电平持续时间(微秒)"
Blockly.Msg.MPYTHON_PIN_DHT11_VALUE = "%1 %2 DHT11 %3 %4"
Blockly.Msg.MPYTHON_PIN_DHT22_VALUE = "%1 %2 DHT22 %3 %4"
Blockly.Msg.MPYTHON_PIN_INIT_I2C_BAUD_RATE = "%1 %2 初始化I2C 波特率 %3"
Blockly.Msg.MPYTHON_PIN_INIT_I2C_SCL_SDA_BAUD = "%1 %2 初始化I2C SCL %3 SDA %4 波特率 %5"
Blockly.Msg.MPYTHON_PIN_I2C_ADDRESS_WRITE = "%1 %2 I2C地址 %3 写入 %4"
Blockly.Msg.MPYTHON_PIN_I2C_ADDRESS_GET_BYTES_NUM = "%1 %2 I2C地址 %3 读取bytes数量 %4"
Blockly.Msg.MPYTHON_PIN_HSCR04_ULTRASONIC_INIT = "%1 %2HCSR04 超声波初始化 名称 %3 trigger %4 echo %5"
Blockly.Msg.MPYTHON_PIN_HSCR04_ULTRASONIC_DISTANCE_UNIT = "%1 %2 %3 HCSR04 超声测距 %4"

Blockly.Msg.MPYTHON_RADIO_ACTION = "%1 %2 %3 无线广播"
Blockly.Msg.MPYTHON_SET_RADIO_CHANNEL = "%1 %2 设置无线广播 频道为 %3"
Blockly.Msg.MPYTHON_SET_RADIO_SEND_MES = "%1 %2 无线广播 发送 %3"
Blockly.Msg.MPYTHON_RADIO_GET_MES = "%1 %2 无线广播 接收消息"
Blockly.Msg.MPYTHON_RADIO_GET_MES_FOR1 = "当收到无线广播消息 %1"
Blockly.Msg.MPYTHON_RADIO_GET_SPECIAL_FOR1 = "当收到特定无线广播消息 %1"

Blockly.Msg.MPYTHON_WIFI_CONNECT = "%1 %2 连接 Wi-Fi 名称 %3 密码 %4"
Blockly.Msg.MPYTHON_WIFI_DISCONNECT = "%1 %2 断开 Wi-Fi 连接"
Blockly.Msg.MPYTHON_WIFI_CONNECTED = "%1 %2 Wi-Fi 已连接"
Blockly.Msg.MPYTHON_WIFI_ALL_CONF = "%1 %2 所有 Wi-Fi 配置信息"
Blockly.Msg.MPYTHON_WIFI_CONF_MES = "%1 %2 Wi-Fi 配置信息 %3"
Blockly.Msg.MPYTHON_WIFI_OPEN_AP_MODE = "%1 %2 开启 AP模式 名称 %3 信道 %4"
Blockly.Msg.MPYTHON_WIFI_CLOSE_AP_MODE = "%1 %2 关闭 AP模式"
Blockly.Msg.MPYTHON_WIFI_SYNC_NETWORK_TIME = "%1 %2 同步网络时间 时区 %3 授时服务器 %4"

Blockly.Msg.MPYTHON_NEOPIXEL_INIT = "%1 %2 灯带 初始化 %3 引脚 %4 数量 %5"
Blockly.Msg.MPYTHON_NEOPIXEL_CHANNEL_COLOR = "%1 %2 灯带 %3 %4 号颜色为 %5"
Blockly.Msg.MPYTHON_NEOPIXEL_CHANNEL_RGB = "%1 %2 灯带 %3 %4 号 红 %5 绿 %6 蓝 %7"
Blockly.Msg.MPYTHON_NEOPIXEL_FULL_LIGHT_COLOR = "%1 %2 灯带 %3 全亮 颜色 %4"
Blockly.Msg.MPYTHON_NEOPIXEL_FULL_LIGHT_RGB = "%1 %2 灯带 %3 全亮 红 %4 绿 %5 蓝 %6"
Blockly.Msg.MPYTHON_NEOPIXEL_CLOSE = "%1 %2 灯带 %3 熄灭"
Blockly.Msg.MPYTHON_NEOPIXEL_RAINBOW_LIGHT_EFFECT = "%1 %2 彩虹灯带 %3 数量 %4 亮度 %5 偏移 %6"
Blockly.Msg.MPYTHON_NEOPIXEL_SET_WRITE = "%1 %2 灯带 %3 设置生效"

Blockly.Msg.MPYTHON_CONTROL_FOR1 = '为每个项目 %1 在列表中'
Blockly.Msg.MPYTHON_OPERATORS_GET_TYPE = '值 %1 的类型'
Blockly.Msg.MPYTHON_OPERATORS_JUDGE_TYPE = '值 %1 的类型为 %2'
Blockly.Msg.MPYTHON_OPERATORS_MOD_INT = '%1 ÷ %2 商的整数部分'
Blockly.Msg.MPYTHON_OPERATORS_KEEP_TWO_DECIMALS = '%1 保留 %2 位小数'
Blockly.Msg.MPYTHON_OPERATORS_LIMIT_RANGE = '限制数字 %1 介于低 %2 至 高 %3'
Blockly.Msg.MPYTHON_OPERATORS_MAPPING_RANGE = '映射 %1 从低 %2 至 %3 到高 %4 至 %5'

Blockly.Msg.MPYTHON_G0_COLOR_LINE_FOLLOWER_POSITION = "%1 %2 识色循迹传感器 线的位置为 %3"
Blockly.Msg.MPYTHON_G0_COLOR_LINE_FOLLOWER_SEEING = "%1 %2 识色循迹传感器 检测到%3 色"
Blockly.Msg.MPYTHON_G0_COLOR_LINE_FOLLOWER_COLOR = "%1 %2 识色循迹传感器 颜色值"
