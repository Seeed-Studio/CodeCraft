import init from './init';
import input from './input';
import output from './output';

export default Blockly => {
    init(Blockly);
    input(Blockly);
    output(Blockly);
}