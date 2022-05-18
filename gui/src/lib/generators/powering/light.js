const LIGHT_COLORS = [
    [[4, 0, 0], [8, 0, 0], [12, 0, 0], [16, 0, 0], [20, 0, 0], [24, 0, 0], [28, 0, 0]],
    [[16, 4, 0], [32, 8, 0], [48, 12, 0], [64, 16, 0], [80, 20, 0], [96, 24, 0], [112, 28, 0]],
    [[8, 4, 0], [16, 8, 0], [24, 12, 0], [32, 16, 0], [40, 20, 0], [48, 24, 0], [56, 28, 0]],
    [[4, 4, 0], [8, 8, 0], [12, 12, 0], [16, 16, 0], [20, 20, 0], [24, 24, 0], [28, 28, 0]],
    [[0, 4, 0], [0, 8, 0], [0, 12, 0], [0, 16, 0], [0, 20, 0], [0, 24, 0], [0, 28, 0]],
    [[0, 16, 4], [0, 32, 8], [0, 48, 12], [0, 64, 16], [0, 80, 20], [0, 96, 24], [0, 112, 28]],
    [[0, 4, 4], [0, 8, 8], [0, 12, 12], [0, 16, 16], [0, 20, 20], [0, 24, 24], [0, 28, 28]],
    [[0, 4, 16], [0, 8, 32], [0, 12, 48], [0, 16, 64], [0, 20, 80], [0, 24, 96], [0, 28, 112]],
    [[0, 0, 4], [0, 0, 8], [0, 0, 12], [0, 0, 16], [0, 0, 20], [0, 0, 24], [0, 0, 28]],
    [[4, 0, 8], [8, 0, 16], [12, 0, 24], [16, 0, 32], [20, 0, 40], [24, 0, 48], [28, 0, 56]],
    [[4, 0, 4], [8, 0, 8], [12, 0, 12], [16, 0, 16], [20, 0, 20], [24, 0, 24], [28, 0, 28]],
    [[16, 0, 4], [32, 0, 8], [48, 0, 12], [64, 0, 16], [80, 0, 20], [96, 0, 24], [112, 0, 28]],
    [[4, 4, 4], [8, 8, 8], [12, 12, 12], [16, 16, 16], [20, 20, 20], [24, 24, 24], [28, 28, 28]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
];

export default Blockly => {

    Blockly.Powering['motion_haloboad_light_blink'] = function (block) {
        var colorJson = block.getFieldValue('COLOR_V') || "{}";
        var speed = block.getFieldValue('SPEED') || "";

        var colorObj = JSON.parse(colorJson);
        var {
            id = 0,
            brightness = 1
        } = colorObj;

        var rgb = LIGHT_COLORS[id][brightness - 1];

        var realR = rgb[0];
        var realG = rgb[1];
        var realB = rgb[2];

        return `ring.blink(${realR}, ${realG}, ${realB}, "${speed}")\n`;
    }

    Blockly.Powering['motion_haloboad_light_shootstart'] = function (block) {
        var colorJson = block.getFieldValue('COLOR_V') || "{}";
        var mode = block.getFieldValue('MODE') || "";

        var colorObj = JSON.parse(colorJson);
        var {
            id = 0
        } = colorObj;

        return `ring.star(${id}, "${mode}")\n`;
    }

    Blockly.Powering['motion_haloboad_light_pattern_flip_lr'] = function (block) {
        var ringJson = block.getFieldValue('RING_VALUE') || "[]";
        var speed = block.getFieldValue('SPEED') || "";

        var ringObj = JSON.parse(ringJson);

        var ringDatas = ringObj.map(({ colorId, brightness }) => {
            var rgb = LIGHT_COLORS[colorId][brightness - 1];
            var realR = rgb[0];
            var realG = rgb[1];
            var realB = rgb[2];
            return `(${realR}, ${realG}, ${realB})`;
        });

        var varName = Blockly.Powering.variableDB_.getDistinctName('ring_data', Blockly.Variables.NAME_TYPE);

        Blockly.Powering.definitions_[`var_${varName}`] = `${varName} = [\n${ringDatas.join(",\n")}\n]`

        return `ring.horizontal_flip(${varName}, "${speed}")\n`;
    }

    Blockly.Powering['motion_haloboad_light_pattern_flip_ud'] = function (block) {
        var ringJson = block.getFieldValue('RING_VALUE') || "[]";
        var speed = block.getFieldValue('SPEED') || "";

        var ringObj = JSON.parse(ringJson);

        var ringDatas = ringObj.map(({ colorId, brightness }) => {
            var rgb = LIGHT_COLORS[colorId][brightness - 1];
            var realR = rgb[0];
            var realG = rgb[1];
            var realB = rgb[2];
            return `(${realR}, ${realG}, ${realB})`;
        });

        var varName = Blockly.Powering.variableDB_.getDistinctName('ring_data', Blockly.Variables.NAME_TYPE);

        Blockly.Powering.definitions_[`var_${varName}`] = `${varName} = [\n${ringDatas.join(",\n")}\n]`

        return `ring.vertical_flip(${varName}, "${speed}")\n`;
    }

    Blockly.Powering['motion_haloboad_light_pattern_ringset'] = function (block) {

        var ringJson = block.getFieldValue('RING_VALUE') || "[]";

        var ringObj = JSON.parse(ringJson);

        var ringDatas = ringObj.map(({ colorId, brightness }) => {
            var rgb = LIGHT_COLORS[colorId][brightness - 1];
            var realR = rgb[0];
            var realG = rgb[1];
            var realB = rgb[2];
            return `(${realR}, ${realG}, ${realB})`;
        });

        var varName = Blockly.Powering.variableDB_.getDistinctName('ring_data', Blockly.Variables.NAME_TYPE);

        Blockly.Powering.definitions_[`var_${varName}`] = `${varName} = [\n${ringDatas.join(",\n")}\n]`

        return `ring.show(${varName})\n`;
    }

    Blockly.Powering['motion_haloboad_light_pattern_ringset_forduration'] = function (block) {
        var ringJson = block.getFieldValue('RING_VALUE') || "[]";
        var secs = Blockly.Powering.valueToCode(block, 'SECS', Blockly.Powering.ORDER_ATOMIC) || 0;

        var ringObj = JSON.parse(ringJson);

        var ringDatas = ringObj.map(({ colorId, brightness }) => {
            var rgb = LIGHT_COLORS[colorId][brightness - 1];
            var realR = rgb[0];
            var realG = rgb[1];
            var realB = rgb[2];
            return `(${realR}, ${realG}, ${realB})`;
        });

        var varName = Blockly.Powering.variableDB_.getDistinctName('ring_data', Blockly.Variables.NAME_TYPE);

        Blockly.Powering.definitions_[`var_${varName}`] = `${varName} = [\n${ringDatas.join(",\n")}\n]`

        return `ring.show(${varName})\ntime.sleep(${secs})\nring.off()\n`;
    }

    Blockly.Powering['motion_haloboad_light_show'] = function (block) {
        var colorJson = block.getFieldValue('COLOR_V') || "{}";
        var colorObj = JSON.parse(colorJson);

        var {
            id = 0,
            brightness = 1
        } = colorObj;

        var rgb = LIGHT_COLORS[id][brightness - 1];

        var realR = rgb[0];
        var realG = rgb[1];
        var realB = rgb[2];

        return `ring.turn_on('all', ${realR}, ${realG}, ${realB})\n`;
    }

    Blockly.Powering['motion_haloboad_light_show_forduration'] = function (block) {
        var secs = Blockly.Powering.valueToCode(block, 'SECS', Blockly.Powering.ORDER_ATOMIC) || 0;
        var colorJson = block.getFieldValue('COLOR_V') || "{}";
        var colorObj = JSON.parse(colorJson);

        var {
            id = 0,
            brightness = 1
        } = colorObj;

        var rgb = LIGHT_COLORS[id][brightness - 1];

        var realR = rgb[0];
        var realG = rgb[1];
        var realB = rgb[2];

        return `ring.turn_on('all', ${realR}, ${realG}, ${realB})\ntime.sleep(${secs})\nring.off()\n`;
    }

    Blockly.Powering['motion_haloboad_light_closed_all'] = function (block) {
        return `ring.off()\n`;
    }

    Blockly.Powering['motion_haloboad_light_rgbled_set'] = function (block) {
        var colorJson = block.getFieldValue('COLOR_V') || "{}";
        var no = Blockly.Powering.valueToCode(block, 'NO', Blockly.Powering.ORDER_ATOMIC) || 0;

        var colorObj = JSON.parse(colorJson);

        var {
            id = 0,
            brightness = 1
        } = colorObj;

        var rgb = LIGHT_COLORS[id][brightness - 1];

        var realR = rgb[0];
        var realG = rgb[1];
        var realB = rgb[2];

        return `ring.turn_on(${no}, ${realR}, ${realG}, ${realB})\n`;
    }

    Blockly.Powering['motion_haloboad_light_rgbled_closed'] = function (block) {
        var no = Blockly.Powering.valueToCode(block, 'NO', Blockly.Powering.ORDER_ATOMIC) || 0;
        return `ring.turn_off(${no})\n`;
    }

    Blockly.Powering['motion_haloboad_light_set_test'] = function (block) {
        var no = Blockly.Powering.valueToCode(block, 'NO', Blockly.Powering.ORDER_ATOMIC) || 0;
        var r = Blockly.Powering.valueToCode(block, 'R', Blockly.Powering.ORDER_ATOMIC) || 0;
        var g = Blockly.Powering.valueToCode(block, 'G', Blockly.Powering.ORDER_ATOMIC) || 0;
        var b = Blockly.Powering.valueToCode(block, 'B', Blockly.Powering.ORDER_ATOMIC) || 0;
        return `ring.turn_on(${no}, ${r}, ${g}, ${b})\n`;
    }

}