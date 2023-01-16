import injectCommon from './common'
import injectEvent from './event'
import injectCamera from './camera'
import injectDisplay from './display'

import injectInput from './input'
import injectOutput from './output'

import injectRobot from './robot'

import injectGrovedigit from './grovedigit'
import injectGrovei2c from './grovei2c'

import injectDigitalSensor from './digital-sensor'


export default Blockly => {
    injectCommon(Blockly)
    injectEvent(Blockly)
    injectCamera(Blockly)
    injectDisplay(Blockly)
    injectInput(Blockly)
    injectOutput(Blockly)
    injectRobot(Blockly)
    injectGrovedigit(Blockly)
    injectDigitalSensor(Blockly)
    injectGrovei2c(Blockly)
}