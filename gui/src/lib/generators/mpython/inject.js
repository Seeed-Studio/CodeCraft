import injectCommon from './common'
import injectEvent from './event'
import injectLooks from './looks'
import injectPin from './pin'
import injectSysreSoures from './sysresoures'
import injectMusic from './music'
import injectBuzzer from './buzzer'
import injectRadio from './radio'
import injectWifi from './wifi'
import injectNeopixel from './neopixel'
import injectGrovezero from './grovezero'


export default Blockly => {
    injectCommon(Blockly)
    injectEvent(Blockly)
    injectLooks(Blockly)
    injectSysreSoures(Blockly)
    injectPin(Blockly)
    injectMusic(Blockly)
    injectBuzzer(Blockly)
    injectRadio(Blockly)
    injectWifi(Blockly)
    injectNeopixel(Blockly)
    injectGrovezero(Blockly)
}