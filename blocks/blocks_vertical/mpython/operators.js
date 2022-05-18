'use strict';

goog.provide('Blockly.Blocks.mpython.operators');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks['operators_mpython_get_type_'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MPYTHON_OPERATORS_GET_TYPE,
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

Blockly.Blocks['operators_mpython_judge_type'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MPYTHON_OPERATORS_JUDGE_TYPE,
          "args0": [
              {
                  "type": "input_value",
                  "name": "VALUE"
              },
              {
                "type": "field_dropdown",
                "name": "KEY",
                "options": [
                  ['int', 'int'],
                  ['float', 'float'],
                  ['bool', 'bool'],
                  ['str', 'str'],
                  ['list', 'list'],
                  ['tuple', 'tuple'],
                  ['set', 'set'],
                  ['dict', 'dict'],
                  ['bytes', 'bytes'],
                  ['bytearray', 'bytearray'],
                  ['complex', 'complex']
                ]
              }
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_boolean"]
      });
  }
};

Blockly.Blocks['operators_mpython_mod_int'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MPYTHON_OPERATORS_MOD_INT,
      "args0": [
        {
          "type": "input_value",
          "name": "NUM1"
        },
        {
          "type": "input_value",
          "name": "NUM2"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};

Blockly.Blocks['operators_mpython_get_const'] = {
  init: function () {
      this.jsonInit({
          "message0": '%1',
          "args0": [
              {
                "type": "field_dropdown",
                "name": "KEY",
                "options": [
                  ['π', 'math.pi'],
                  ['e', 'math.e'],
                  ['φ', '(1 + math.sqrt(5)) / 2'],
                  ['sqrt(2)', 'math.sqrt(2)'],
                  ['sqrt(1/2)', 'math.sqrt(1.0 / 2)'],
                  ['∞', "float('inf')"]
                ]
              }
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_boolean"]
      });
  }
};

Blockly.Blocks['operators_mpython_judge_result'] = {
  init: function () {
      this.jsonInit({
          "message0": '%1 %2',
          "args0": [
              {
                  "type": "input_value",
                  "name": "VALUE"
              },
              {
                "type": "field_dropdown",
                "name": "KEY",
                "options": [
                  [Blockly.Msg.MPYTHON_OPERATORS_JUDGE_OPT1, '% 2 == 0'],
                  [Blockly.Msg.MPYTHON_OPERATORS_JUDGE_OPT2, '% 2 == 1'],
                  [Blockly.Msg.MPYTHON_OPERATORS_JUDGE_OPT3, '% 1 == 0'],
                  [Blockly.Msg.MPYTHON_OPERATORS_JUDGE_OPT4, '> 0'],
                  [Blockly.Msg.MPYTHON_OPERATORS_JUDGE_OPT5, '< 0'],
                  [Blockly.Msg.MPYTHON_OPERATORS_JUDGE_OPT6, 'False']
                ]
              }
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_boolean"]
      });
  }
};

Blockly.Blocks['operators_mpython_keep_two_decimals'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MPYTHON_OPERATORS_KEEP_TWO_DECIMALS,
          "args0": [
              {
                  "type": "input_value",
                  "name": "VALUE"
              },
              {
                  "type": "input_value",
                  "name": "RESULT"
              }  
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_boolean"]
      });
  }
};

Blockly.Blocks['operators_mpython_limit_range'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MPYTHON_OPERATORS_LIMIT_RANGE,
          "args0": [
              {
                  "type": "input_value",
                  "name": "VALUE"
              },
              {
                  "type": "input_value",
                  "name": "START"
              },
              {
                  "type": "input_value",
                  "name": "END"
              }  
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_boolean"]
      });
  }
};
Blockly.Blocks['operators_mpython_mapping_range'] = {
  init: function () {
      this.jsonInit({
          "message0": Blockly.Msg.MPYTHON_OPERATORS_MAPPING_RANGE,
          "args0": [
              {
                  "type": "input_value",
                  "name": "VALUE"
              },
              {
                  "type": "input_value",
                  "name": "START1"
              },
              {
                  "type": "input_value",
                  "name": "START2"
              },
              {
                  "type": "input_value",
                  "name": "END1"
              },
              {
                  "type": "input_value",
                  "name": "END2"
              }  
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_boolean"]
      });
  }
};

Blockly.Blocks['operators_mpython_conversion_type'] = {
  init: function () {
      this.jsonInit({
          "message0": '%1',
          "args0": [
              {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                  ['int', 'int'],
                  ['float', 'float']
                ]
              }
          ],
          "category": Blockly.Categories.operators,
          "extensions": ["colours_operators", "output_boolean"]
      });
  }
}