import init from './system';
import display from './display';
import azureIoT from './azureIoT';
import grove from './grove';
import json from './json';
import mqtt from './mqtt';

export default Blockly => {
    init(Blockly);
    display(Blockly);
    azureIoT(Blockly);
    grove(Blockly);
    json(Blockly);
    mqtt(Blockly);
}