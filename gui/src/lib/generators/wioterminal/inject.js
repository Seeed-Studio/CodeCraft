import init from './system';
import display from './display';
import azureIoT from './azureIoT';
import grove from './grove';

export default Blockly => {
    init(Blockly);
    display(Blockly);
    azureIoT(Blockly);
    grove(Blockly);
}