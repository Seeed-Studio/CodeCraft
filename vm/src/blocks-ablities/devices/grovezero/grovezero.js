const Servo = require('./servo');
const TwinButton = require('./twin-button');
const MiniWheel = require('./mini-wheel');
const DcMotor = require('./dc-motor');
const LedMatrix = require('./led-matrix');
const RgbMatrix = require('./rgb-matrix');
const RgbLed = require('./rgb-led');
const FourDigitDisplay = require('./4-digit-display');
const Buzzer = require('./buzzer');
const Mp3 = require('./mp3');
const Imu9Dof = require('./imu9-dof');
const Touchpad = require('./touchpad');
const GestureSensor = require('./gesture-sensor');
const MechKey = require('./mech-key');
const Knob = require('./knob');
const PirMotionSensor = require('./pir-motion-sensor');

const LightSensor = require('./light-sensor');
const SoundSensor = require('./sound-sensor');
const TemperatureSensor = require('./temperature-sensor');
const Slider = require('./slider');
const UltrasonicSensor = require('./ultrasonic-sensor');
const ColorLineFollower = require('./color-line-follower');
const TemHumSensor = require('./tem-hum-sensor');
const Joystick = require('./joystick');
const Mainboard = require('./mainboard');


module.exports = {
    servo: new Servo(),
    twinButton: new TwinButton(),
    miniWheel: new MiniWheel(),
    dcMotor: new DcMotor(),
    ledMatrix: new LedMatrix(),
    rgbMatrix: new RgbMatrix(),
    rgbLed: new RgbLed(),
    fourDigitDisplay: new FourDigitDisplay(),
    buzzer: new Buzzer(),
    mp3: new Mp3(),
    imu9Dof: new Imu9Dof(),
    touchpad: new Touchpad(),
    gestureSensor: new GestureSensor(),
    mechKey: new MechKey(),
    knob: new Knob(),
    pirMotionSensor: new PirMotionSensor(),
    colorLineFollower: new ColorLineFollower(),
    lightSensor: new LightSensor(),
    soundSensor: new SoundSensor(),
    temperatureSensor: new TemperatureSensor(),
    slider: new Slider(),
    ultrasonicSensor: new UltrasonicSensor(),
    temHumSensor: new TemHumSensor(),
    joystick: new Joystick(),
    mainboard: new Mainboard(),
}