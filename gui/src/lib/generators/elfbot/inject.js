import injectInfrared from './infrared'
import injectKey from './key'
import injectLedmatrix from './ledmatrix'
import injectLight from './light'
import injectLinepatrol from './linepatrol'
import injectLoudspeaker from './loudspeaker'
import injectNoise from './noise'

import injectRgbled from './rgbled'
import injectServo from './servo'
import injectUltrasonic from './ultrasonic'
import injectUltrasonicled from './ultrasonicled'
import injectVehiclewheel from './vehiclewheel'

import injectCommon from './common'
import injectEvent from './event'

export default Blockly => {

    injectCommon(Blockly)
    injectInfrared(Blockly)
    injectKey(Blockly)
    injectLedmatrix(Blockly)
    injectLight(Blockly)
    injectLinepatrol(Blockly)
    injectLoudspeaker(Blockly)
    injectNoise(Blockly)
    injectRgbled(Blockly)
    injectServo(Blockly)
    injectUltrasonic(Blockly)
    injectUltrasonicled(Blockly)
    injectVehiclewheel(Blockly)
    injectEvent(Blockly)
}