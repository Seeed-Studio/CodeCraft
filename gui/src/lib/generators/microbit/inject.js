import injectCommon from './common'

import injectMusic from './music'
import injectShow from './show'
import injectPin from './pin'
import injectWireless from './wireless'
import injectSensor from './sensor'
import injectBitPlayer from './bitplayer'
import injectBitCar from './bitcar'
import injectGroveOne from './groveone'
import injectBitMaker from './bitmaker'
import injectBitWear from './bitwear'
import injectMuVision from './muvision'


export default Blockly => {
    injectCommon(Blockly)
    injectMusic(Blockly)
    injectShow(Blockly)
    injectPin(Blockly)
    injectWireless(Blockly)
    injectSensor(Blockly)
    injectBitPlayer(Blockly)
    injectBitCar(Blockly)
    injectGroveOne(Blockly)
    injectBitMaker(Blockly)
    injectBitWear(Blockly)
    injectMuVision(Blockly)
}