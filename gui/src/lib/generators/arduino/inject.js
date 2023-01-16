import control from './control';
import math from './math';
import operators from './operators';
import variables from './variables';

import arduino from './arduino';

import speechRec from './speech-rec';


export default Blockly => {
    control(Blockly);
    math(Blockly);
    operators(Blockly);
    variables(Blockly);

    arduino(Blockly);
    speechRec(Blockly);
}