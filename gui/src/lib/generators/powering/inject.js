import injectCommon from './common';

import injectEvent from './event';
import injectLight from './light';
import injectPose from './pose';
import injectRadio from './radio';
import injectTimer from './timer';
import injectMessage from './message';


export default Blockly => {

    injectCommon(Blockly)
    injectEvent(Blockly)
    injectLight(Blockly)   
    injectPose(Blockly) 
    injectRadio(Blockly) 
    injectTimer(Blockly)
    injectMessage(Blockly)

}