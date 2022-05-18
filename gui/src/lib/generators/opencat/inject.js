import injectSystem from './system';
import injectSerialPort from './serialport';
import injectKill from './kill';
import injectGroveIgure from './groveigure';
import injectGroveAnalog from './groveanalog';
import injectGroveI2c from './grovei2c';
import injectCommon from './common';

export default Blockly => {
    injectSystem(Blockly);
    injectSerialPort(Blockly);
    injectKill(Blockly);
    injectGroveIgure(Blockly);
    injectGroveAnalog(Blockly);
    injectGroveI2c(Blockly);
    injectCommon(Blockly)
}