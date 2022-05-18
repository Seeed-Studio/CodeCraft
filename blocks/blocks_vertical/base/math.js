'use strict';

goog.provide('Blockly.Blocks.codecraft');

goog.require('Blockly.Blocks');

goog.require('Blockly.Colours');

goog.require('Blockly.constants');

Blockly.Blocks['math_cc_number'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1",
            "args0": [
                {
                    "type": "field_number",
                    "name": "NUM",
                    "value": "0",
                    "precision": 0.01,
                    "validator": function (input, min, max) {
                        if (!input) {
                            return;
                        }
                        // let re = /[-+]?[0-9]+/;
                        let re = /[-+]?[0-9]*\.?[0-9]+/;
                        let output = re.exec(input);
                        if (!(output && output[0])) {
                            return 0;
                        }
                        // return Math.floor(output[0] * 100) / 100;
                        return output[0].replace(/([0-9]+.[0-9]{2})[0-9]*/, "$1");
                    }
                }
            ],
            "output": "Number",
            "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
            "colour": Blockly.Colours.textField,
            "colourSecondary": Blockly.Colours.textField,
            "colourTertiary": Blockly.Colours.textField
        });
    }
};

/**
 * 正整数 
 */
Blockly.Blocks['math_cc_positive_whole_number'] = {

    init: function () {
        this.jsonInit({
            "message0": "%1",
            "args0": [
                {
                    "type": "field_number",
                    "name": "NUM",
                    "min": 1,
                    "precision": 1,
                    "validator": function (input, min, max) {
                        let re = /\+?[1-9]\d*/;
                        let output = re.exec(input);
                        if (!(output && output[0])) {
                            return 1;
                        }
                        return output[0];
                    }
                }
            ],
            "output": "Number",
            "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
            "colour": Blockly.Colours.textField,
            "colourSecondary": Blockly.Colours.textField,
            "colourTertiary": Blockly.Colours.textField
        });
    }
};


Blockly.Blocks['math_cc_time_number'] = {
    /**
     * 时间输入框 单位s 精度0.01
     */
    init: function () {
        this.jsonInit({
            "message0": "%1",
            "args0": [
                {
                    "type": "field_number",
                    "name": "NUM",
                    "min": 0,
                    "precision": 0.01,
                    "validator": function (input, min, max) {
                        let re = /[0-9]*\.?[0-9]+/;
                        let output = re.exec(input);
                        if (!(output && output[0])) {
                            return 0;
                        }
                        // output = Math.floor(output[0] * 100) / 100;
                        return output[0].replace(/([0-9]+.[0-9]{2})[0-9]*/, "$1");
                    }
                }
            ],
            "output": "Number",
            "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
            "colour": Blockly.Colours.textField,
            "colourSecondary": Blockly.Colours.textField,
            "colourTertiary": Blockly.Colours.textField
        });
    }
};




let list = [
    { min: -100, max: 100 },
    { min: 0, max: 180 },
    { min: 0, max: 4 },
    { min: 0, max: 5 },
    { min: 0, max: 100 },
    { min: 0, max: 255 },
    { min: 0, max: 32 },
    { min: 0, max: 7 },
    { min: 0, max: 15 },
    { min: 262, max: 1976 },
    { min: -999, max: 9999 },
    { min: 0, max: 9999 },
    { min: 60, max: 960 },
    { min: 1, max: 64 },
    { min: 0, max: 127 },
    { min: 0, max: 63 },
    { min: 0, max: 30 },
    { min: 1, max: 999999999 },
    { min: -100, max: 100 },
    { min: 0, max: 200 },
    { min: -999999999, max: 999999999 },
];

for (let x = 0, item; item = list[x]; x++) {
    Blockly.Blocks[`math_cc_min_${item.min}_max_${item.max}_number`] = {
        init: function () {
            this.jsonInit({
                "message0": "%1",
                "args0": [
                    {
                        "type": "field_number",
                        "name": "NUM",
                        "min": item.min,
                        "max": item.max,
                        "precision": 1,
                        "validator": function (input, min, max) {
                            input = input.toString();
                            let re = /-?\d+/;
                            let output = re.exec(input);
                            if (!(output && output[0])) {
                                if (min <= 0) {
                                    return 0;
                                } else {
                                    return min;
                                }
                            }
                            if (output[0] < min) {
                                return min;
                            }
                            if (output[0] > max) {
                                return max;
                            }
                            return output[0];
                        }
                    }
                ],
                "output": "Number",
                "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
                "colour": Blockly.Colours.textField,
                "colourSecondary": Blockly.Colours.textField,
                "colourTertiary": Blockly.Colours.textField
            });
        }
    };
}

Blockly.Blocks['math_cc_duration_time'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1",
            "args0": [
                {
                    "type": "field_number",
                    "name": "NUM",
                    "min": 0,
                    "max": 655,
                    "precision": 0.01,
                    "validator": function (input, min, max) {
                        input = input.toString();
                        let re = /[-+]?[0-9]*\.?[0-9]+/;
                        let output = re.exec(input);
                        if (!(output && output[0])) {
                            if (min <= 0) {
                                return 0;
                            } else {
                                return min;
                            }
                        }
                        if (output[0] < min) {
                            return min;
                        }
                        if (output[0] > max) {
                            return max;
                        }
                        return output[0];
                    }
                }
            ],
            "output": "Number",
            "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
            "colour": Blockly.Colours.textField,
            "colourSecondary": Blockly.Colours.textField,
            "colourTertiary": Blockly.Colours.textField
        });
    }
};


Blockly.Blocks['math_number_for_plotter_print'] = {
    /**
     * Block for generic numeric value.
     * @this Blockly.Block
     */
    init: function() {
      this.jsonInit({
        "message0": "%1",
        "args0": [
          {
            "type": "field_number",
            "name": "NUM",
            "value": "0"
          }
        ],
        "output": "Number",
        "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
        "colour": Blockly.Colours.textField,
        "colourSecondary": Blockly.Colours.textField,
        "colourTertiary": Blockly.Colours.textField
      });
    }
  };
