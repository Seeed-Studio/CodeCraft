export default (Blockly) => {
    Blockly.C['sensing_g0_color_line_follower_get_color'] = function (block) {
        Blockly.C.definitions_['define_linefollow'] = '#define USE_LINEFOLLOW 1';
        Blockly.C.definitions_['color_str'] = "char colorStr[8]={0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};";
        var code = 'grovezero->linefollow->getcolor(colorStr)';
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }

    Blockly.C['sensing_g0_color_line_follower_is_color'] = function (block) {
        Blockly.C.definitions_['define_linefollow'] = '#define USE_LINEFOLLOW 1';
        let color = block.getFieldValue('COLOR');
        let colorNum = '';
        switch (color) {
            case 'red':
                colorNum = '2';
                break;
            case 'green':
                colorNum = '3';
                break;
            case 'blue':
                colorNum = '4';
                break;
            case 'black':
                colorNum = '1';
                break;
            case 'white':
                colorNum = '5';
                break;
        }
        var code = `grovezero->linefollow->ismatchcolor(${colorNum})`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }

    Blockly.C['sensing_g0_color_line_follower_is_position'] = function (block) {
        Blockly.C.definitions_['define_linefollow'] = '#define USE_LINEFOLLOW 1';
        let position = block.getFieldValue('POSITION');
        let positionNum = '';
        switch (position) {
            case 'middle':
                positionNum = '1';
                break;
            case 'right':
                positionNum = '5';
                break;
            case 'right-most':
                positionNum = '6';
                break;
            case 'left':
                positionNum = '3';
                break;
            case 'left-most':
                positionNum = '4';
                break;
            case 'lost':
                positionNum = '2';
                break;
        }
        var code = `grovezero->linefollow->ismatchlocation(${positionNum})`;
        return [code, Blockly.C.ORDER_FUNCTION_CALL];
    }

}

