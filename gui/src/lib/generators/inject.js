import python from './python.js';
import c from './c.js';
import arduino from './arduino.js'
import microbit from './microbit.js'
import maixduino from './maixduino.js'
import mpython from './mpython.js'
import arduinoOpencat from './arduino-opencat'
import powering from './powering'


export default Blockly => {
    python(Blockly);
    c(Blockly);
    arduino(Blockly);
    microbit(Blockly);
    maixduino(Blockly);
    mpython(Blockly);
    arduinoOpencat(Blockly);
    powering(Blockly);
}

