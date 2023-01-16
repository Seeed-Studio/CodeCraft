
import math from './math'
import text from './text'
import control from './control'
import variables from './variables'
import operators from './operators'
import procedures from './procedures'
import events from './events'

import mainBoard from './main-board'
import twinButton from './twin-button'
import servo from './servo'
import miniWheel from './mini-wheel'
import dcMotor from './dc-motor'
import ledMatrix from './led-matrix'
import rgbLed from './rgb-led'
import rgbMatrix from './rgb-matrix'
import fourDigitDisplay from './4-digit-diplay'
import buzzer from './buzzer'
import mp3 from './mp3'
import knob from './knob'
import imu9Dof from './imu9-dof'
import mechKey from './mech-key'
import touchpad from './touchpad'
import gestureSensor from './gesture-sensor'
import pirMotionSensor from './pir-motion-sensor'
import colorLineFollower from './color-line-follower'
import slider from './slider'
import temHumSensor from './tem-hum-sensor'
import temperatureSensor from './temperature-sensor'
import soundSensor from './sound-sensor'
import lightSensor from './light-sensor'
import ultrasonicSensor from './ultrasonic-sensor'
import joystick from './joystick'

export default Blockly => {

    math(Blockly)
    text(Blockly)
    control(Blockly)
    variables(Blockly)
    operators(Blockly)
    events(Blockly)
    procedures(Blockly)


    mainBoard(Blockly)
    twinButton(Blockly)
    servo(Blockly)
    miniWheel(Blockly)
    dcMotor(Blockly)
    ledMatrix(Blockly)
    rgbLed(Blockly)
    rgbMatrix(Blockly)
    fourDigitDisplay(Blockly)
    buzzer(Blockly)
    mp3(Blockly)
    knob(Blockly)
    imu9Dof(Blockly)
    mechKey(Blockly)
    touchpad(Blockly)
    gestureSensor(Blockly)
    pirMotionSensor(Blockly)
    colorLineFollower(Blockly)
    slider(Blockly)
    temHumSensor(Blockly)
    temperatureSensor(Blockly)
    soundSensor(Blockly)
    lightSensor(Blockly)
    ultrasonicSensor(Blockly)
    joystick(Blockly)

}