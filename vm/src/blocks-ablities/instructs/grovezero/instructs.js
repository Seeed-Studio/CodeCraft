const ServoInstruct = require('./servo');
const TwinButtonInstruct = require('./twin-button');
const MiniWheelInstruct = require('./mini-wheel')
const DcMotorInstruct = require('./dc-motor');
const LedMatrixInstruct = require('./led-matrix');
const RgbLedInstruct = require('./rgb-led');
const RgbMatrix = require('./rgb-matrix');
const FourDigitDisplay = require('./4-digit-display');
const BuzzerInstruct = require('./buzzer');
const mp3Instruct = require('./mp3');
const Imu9Instruct = require('./imu9-dof');
const TouchpadInstruct = require('./touchpad');
const MechKeyInstruct = require('./mech-key');

const LightSensorInstruct = require('./light-sensor');
const SoundSensorInstruct = require('./sound-sensor');
const TemperatureSensorInstruct = require('./temperature-sensor');
const SliderInstruct = require('./slider');
const UltrasonicSensorInstruct = require('./ultrasonic-sensor');
const ColorLineFollowerInstruct = require('./color-line-follower');
const TemHumSensorInstruct = require('./tem-hum-sensor');
const JoystickInstruct = require('./joystick');
const MainboardInstruct = require('./mainboard');

module.exports = {
    servo: new ServoInstruct(),
    twinButton: new TwinButtonInstruct(),
    miniWheel: new MiniWheelInstruct(),
    dcMotor: new DcMotorInstruct(),
    ledMatrix: new LedMatrixInstruct(),
    rgbLed: new RgbLedInstruct(),
    rgbMatrix: new RgbMatrix(),
    fourDigitDisplay: new FourDigitDisplay(),
    buzzer: new BuzzerInstruct(),
    mp3: new mp3Instruct(),
    imu9Instruct: new Imu9Instruct(),
    touchpad: new TouchpadInstruct(),
    mechKey: new MechKeyInstruct(),

    lightSensor: new LightSensorInstruct(),
    soundSensor: new SoundSensorInstruct(),
    temperatureSensor: new TemperatureSensorInstruct(),
    slider: new SliderInstruct(),
    ultrasonicSensor: new UltrasonicSensorInstruct(),
    colorLineFollower: new ColorLineFollowerInstruct(),
    temHumSensor: new TemHumSensorInstruct(),
    joystick: new JoystickInstruct(),
    mainboard: new MainboardInstruct(),
}