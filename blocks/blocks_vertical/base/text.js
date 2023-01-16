Blockly.Blocks['text_cc_length_12'] = {
    /**
     * Block for text value.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": "%1",
        "args0": [
          {
            "type": "field_input",
            "name": "TEXT",
            "validator": function (input) {
              let re = /[\x00-\xff]{1,12}/;
              let output = re.exec(input);
              if (!(output && output[0])) {
                return '';
              }
              return output[0];
            }
          }
        ],
        "output": "String",
        "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
        "colour": Blockly.Colours.textField,
        "colourSecondary": Blockly.Colours.textField,
        "colourTertiary": Blockly.Colours.textField
      });
    }
  };
  
  Blockly.Blocks['text_cc_length_31'] = {
    /**
     * Block for text value.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": "%1",
        "args0": [
          {
            "type": "field_input",
            "name": "TEXT",
            "validator": function (input) {
              let re = /[\x00-\xff]{1,31}/;
              let output = re.exec(input);
              if (!(output && output[0])) {
                return '';
              }
              return output[0];
            }
  
          }
        ],
        "output": "String",
        "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
        "colour": Blockly.Colours.textField,
        "colourSecondary": Blockly.Colours.textField,
        "colourTertiary": Blockly.Colours.textField
      });
    }
  };
  
  Blockly.Blocks['text_cc_length_32'] = {
    /**
     * Block for text value.
     * @this Blockly.Block
     */
    init: function () {
      this.jsonInit({
        "message0": "%1",
        "args0": [
          {
            "type": "field_input",
            "name": "TEXT",
            "validator": function (input) {
              let re = /[\x00-\xff]{1,32}/;
              let output = re.exec(input);
              if (!(output && output[0])) {
                return '';
              }
              return output[0];
            }
  
          }
        ],
        "output": "String",
        "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
        "colour": Blockly.Colours.textField,
        "colourSecondary": Blockly.Colours.textField,
        "colourTertiary": Blockly.Colours.textField
      });
    }
  };