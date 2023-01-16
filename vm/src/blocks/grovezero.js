const Cast = require('../util/cast');

class GrovezeroBlocks {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getHats() {
        return {
            event_g0_twin_button_when_click: {
                restartExistingThreads: true
            },
            event_g0_four_digit_display_when_countdown_end: {
                restartExistingThreads: true
            },
            event_g0_imu9_dof_status_when_change: {
                restartExistingThreads: true
            },
            event_g0_touchpad_when_click: {
                restartExistingThreads: true
            },
            event_g0_gesture_sensor_when_change: {
                restartExistingThreads: true
            },
            event_g0_mech_key_when_click: {
                restartExistingThreads: true
            },
            event_g0_knob_when_change: {
                restartExistingThreads: true
            },
            event_g0_pir_motion_sensor_detect_someone: {
                restartExistingThreads: true
            },
            event_g0_mainboard_when_radio_receive: {
                restartExistingThreads: true
            }
        }
    }

    getPrimitives() {
        return {
            motion_g0_servo_turn_angle: this.servoTurnAngle,

            sensing_g0_twin_button_is_pressed: this.twinButtonIsPressed,

            motion_g0_miniwheel_run_velocity_azimuth: this.miniWheelRun,
            motion_g0_miniwheel_stop: this.miniWheelStop,
            motion_g0_miniwheel_set_power: this.miniWheelSetPower,

            motion_g0_dc_motor_trun_power: this.dcMotorTurnPower,
            motion_g0_dc_motor_stop: this.dcMotorStop,

            sensing_g0_ledmatrix_xy_is_on: this.ledMatrixXyIsOn,
            looks_g0_ledmatrix_show_shape: this.ledMatrixShowShape,
            looks_g0_ledmatrix_show_string: this.ledMatrixShowString,
            looks_g0_ledmatrix_xy_set_on: this.ledMatrixXySetOn,
            looks_g0_ledmatrix_xy_set_off: this.ledMatrixXySetOff,
            looks_g0_ledmatrix_clean: this.ledMatrixClean,

            looks_g0_rgb_matrix_show_shape: this.rgbMatrixShowShape,
            looks_g0_rgb_matrix_show_string: this.rgbMatrixShowString,
            looks_g0_rgb_matrix_show_anima: this.rgbMatrixShowAnima,
            looks_g0_rgb_matrix_show_histogram: this.rgbMatrixShowHistogram,
            looks_g0_rgb_matrix_xy_set_on: this.rgbMatrixXySetOn,
            looks_g0_rgb_matrix_xy_set_off: this.rgbMatrixXySetOff,
            looks_g0_rgb_matrix_xy_set_on_off: this.rgbMatrixXySetOnOff,
            sensing_g0_rgb_matrix_xy_is_on: this.rgbMatrixXyIsOn,
            sensing_g0_rgb_matrix_clean: this.rgbMatrixClean,
            sensing_g0_rgb_matrix_xy_get_color: this.ledMatrixXyGetColor,

            looks_g0_rgb_led_show_style_color: this.rgbLedShowStyleColor,
            looks_g0_rgb_led_show_style: this.rgbLedShowStyle,
            looks_g0_rgb_led_fade_from_color1_to_color2: this.rgbLedFadeFromColor1ToColor2,
            looks_g0_rgb_led_set_brightness: this.rgbLedSetBrightness,
            looks_g0_rgb_led_light_off: this.rgbLedLightOff,
            sensing_g0_rgb_to_color: this.rgbToColor,
            sensing_g0_hsl_to_color: this.hslToColor,

            looks_g0_four_digit_display_show_number: this.fourDigitDisplayShowNumber,
            looks_g0_four_digit_display_start_countdown: this.fourDigitDisplayStartCountdown,
            looks_g0_four_digit_display_off: this.fourDigitDisplayOff,
            looks_g0_four_digit_display_set_brightness: this.fourDigitDisplaySetBrightness,

            sound_g0_buzzer_play_melody: this.buzzerPlayMelody,
            sound_g0_buzzer_play_note: this.buzzerPlayNote,
            sound_g0_buzzer_play_note_for_beat: this.buzzerPlayNoteForBeat,
            sound_g0_buzzer_mute_for_beat: this.buzzerMuteForBeat,
            sound_g0_buzzer_set_bpm: this.buzzerSetBpm,
            sound_g0_buzzer_add_bpm: this.buzzerAddBpm,
            sensing_g0_buzzer_get_bpm: this.buzzerGetBpm,
            sound_g0_buzzer_stop: this.buzzerStop,

            sound_g0_mp3_start_play: this.mp3StartPlay,
            sound_g0_mp3_pause_or_play: this.mp3PauseOrPlay,
            sound_g0_mp3_switch: this.mp3Switch,
            sound_g0_mp3_add_volume: this.mp3AddVolume,
            sound_g0_mp3_set_volume: this.mp3SetVolume,
            sound_g0_mp3_stop_play: this.mp3StopPlay,
            sound_g0_mp3_play_mode: this.mp3PlayMode,

            sensing_g0_imu9_dof_status_is: this.imu9DofStatusIs,
            sensing_g0_imu9_dof_get_value: this.imu9DofGetValue,
            sensing_g0_imu9_magnetic_get_value: this.imu9MagneticGetValue,
            sensing_g0_imu9_angular_rate_get_value: this.imu9AngularRateGetValue,
            sensing_g0_imu9_rotation_get_value: this.imu9RotationGetValue,

            sensing_g0_touchpad_is_pressed: this.touchpadIsPressed,

            sensing_g0_joystick_is_pushed_to: this.joystickIsPushedTo,
            sensing_g0_joystick_get_position: this.joystickGetPosition,

            sensing_g0_mech_key_is_pressed: this.mechKeyIsPressed,
            sensing_g0_mech_key_set_rgb: this.mechKeySetRgb,
            sensing_g0_mech_key_close: this.mechKeyClose,

            sensing_g0_color_line_follower_is_color: this.colorLineFollowerIsColor,
            sensing_g0_color_line_follower_is_position: this.colorLineFollowerIsPosition,
            sensing_g0_color_line_follower_get_color: this.colorLineFollowerGetColor,

            sensing_g0_light_sensor_get_value: this.lightSensorGetValue,

            sensing_g0_sound_sensor_get_value: this.soundSensorGetValue,

            sensing_g0_ultrasonic_sensor_get_value: this.ultSensorGetValue,

            sensing_g0_temperature_sensor_get_value: this.temperatureSensorGetValue,

            sensing_g0_temhum_sensor_get_tem_value: this.temHumSensorGetTemValue,

            sensing_g0_temhum_sensor_get_hum_value: this.temHumSensorGetHumValue,

            sensing_g0_slider_get_value: this.sliderGetValue,


            operator_g0_itoa: this.itoa,
            sensing_g0_mainboard_timer: this.getTimer,
            sensing_g0_mainboard_resettimer: this.resetTimer,

            event_g0_mainboard_broadcast: this.broadcast,
            event_g0_mainboard_stop_broadcast: this.stopBroadcast,
            event_g0_mainboard_set_broadcast_channel: this.setBroadcastChannel,
            
        };
    }

    getTimer(args, util) {
        return util.ioQuery('clock', 'projectTimer');
    }

    resetTimer(args, util) {
        util.ioQuery('clock', 'resetProjectTimer');
    }

    //主控广播
    broadcast(args) {
        this.runtime.abilities.grovezero.mainboard.broadcast(args);
    }
    //停止广播
    stopBroadcast(args) {
        this.runtime.abilities.grovezero.mainboard.stopBroadcast();
    }
    //设置广播频道
    setBroadcastChannel(args) {
        this.runtime.abilities.grovezero.mainboard.setBroadcastChannel(args);
    }

    itoa(args) {
        return args.VALUE;
    }

    sliderGetValue(args) {
        return this.runtime.abilities.grovezero.slider.getValue(args);
    }

    temHumSensorGetHumValue(args) {
        return this.runtime.abilities.grovezero.temHumSensor.getHumValue(args);
    }
    temHumSensorGetTemValue(args) {
        return this.runtime.abilities.grovezero.temHumSensor.getTemValue(args);
    }
    temperatureSensorGetValue(args) {
        return this.runtime.abilities.grovezero.temperatureSensor.getValue(args);
    }

    ultSensorGetValue() {
        return this.runtime.abilities.grovezero.ultrasonicSensor.getValue();
    }

    soundSensorGetValue() {
        return this.runtime.abilities.grovezero.soundSensor.getValue();
    }

    lightSensorGetValue() {
        return this.runtime.abilities.grovezero.lightSensor.getValue();
    }

    // color line follower
    colorLineFollowerIsColor(args) {
        return this.runtime.abilities.grovezero.colorLineFollower.isColor(args);
    }

    colorLineFollowerIsPosition(args) {
        return this.runtime.abilities.grovezero.colorLineFollower.isPosition(args);
    }

    colorLineFollowerGetColor(args) {
        return this.runtime.abilities.grovezero.colorLineFollower.getColor(args);
    }

    //mech key
    mechKeyIsPressed(args) {
        return this.runtime.abilities.grovezero.mechKey.isPressed(args);
    }
    mechKeySetRgb(args) {
        this.runtime.abilities.grovezero.mechKey.setRgb(args);
    }
    mechKeyClose(args) {
        this.runtime.abilities.grovezero.mechKey.close(args);
    }
    // touchpad
    touchpadIsPressed(args) {
        return this.runtime.abilities.grovezero.touchpad.isPressed(args);
    }

    //摇杆
    joystickIsPushedTo(args) {
        return this.runtime.abilities.grovezero.joystick.isPushedTo(args);
    }

    joystickGetPosition(args) {
        return this.runtime.abilities.grovezero.joystick.getPosition(args);
    }

    // imu9 dof
    imu9DofStatusIs(args) {
        return this.runtime.abilities.grovezero.imu9Dof.statusIs(args);
    }

    imu9DofGetValue(args) {
        return this.runtime.abilities.grovezero.imu9Dof.getValue(args);
    }

    imu9MagneticGetValue(args) {
        return this.runtime.abilities.grovezero.imu9Dof.getMagneticValue(args);
    }

    imu9AngularRateGetValue(args) {
        return this.runtime.abilities.grovezero.imu9Dof.getAngularRateValue(args);
    }

    imu9RotationGetValue(args) {
        return this.runtime.abilities.grovezero.imu9Dof.getRotationValue(args);
    }
    //mp3
    mp3StartPlay(args) {
        this.runtime.abilities.grovezero.mp3.startPlay(args.VALUE);
    }

    mp3PauseOrPlay(args) {
        this.runtime.abilities.grovezero.mp3.palyOrPause(args.OPTIONS);
    }

    mp3Switch(args) {
        this.runtime.abilities.grovezero.mp3.switch(args.OPTIONS);
    }

    mp3AddVolume(args) {
        this.runtime.abilities.grovezero.mp3.addVolume(args.VALUE);
    }

    mp3SetVolume(args) {
        this.runtime.abilities.grovezero.mp3.setVolume(args.VALUE);
    }

    mp3StopPlay(args) {
        this.runtime.abilities.grovezero.mp3.stopPlay();
    }

    mp3PlayMode(args) {
        this.runtime.abilities.grovezero.mp3.setPlayMode(args.MODE);
    }

    //buzzer
    buzzerPlayMelody(args) {
        this.runtime.abilities.grovezero.buzzer.playMelody(args);
    }

    buzzerPlayNote(args) {
        this.runtime.abilities.grovezero.buzzer.playNote(args);
    }
    async buzzerPlayNoteForBeat(args) {
        await this.runtime.abilities.grovezero.buzzer.playNoteForBeat(args);

    }
    async buzzerMuteForBeat(args) {
        await this.runtime.abilities.grovezero.buzzer.muteForBeat(args);
    }
    buzzerSetBpm(args) {
        this.runtime.abilities.grovezero.buzzer.setBpm(args);
    }
    buzzerAddBpm(args) {
        this.runtime.abilities.grovezero.buzzer.addBpm(args);
    }
    buzzerGetBpm(args) {
        return this.runtime.abilities.grovezero.buzzer.getBpm(args);
    }
    buzzerStop(args) {
        this.runtime.abilities.grovezero.buzzer.playStop(args);
    }

    //four digit display
    fourDigitDisplayShowNumber(args) {
        this.runtime.abilities.grovezero.fourDigitDisplay.showNumber(args);
    }
    fourDigitDisplayStartCountdown(args) {
        this.runtime.abilities.grovezero.fourDigitDisplay.startCountdown(args);
    }
    fourDigitDisplayOff(args) {
        this.runtime.abilities.grovezero.fourDigitDisplay.off(args);
    }
    fourDigitDisplaySetBrightness(args) {
        this.runtime.abilities.grovezero.fourDigitDisplay.setBrightness(args);
    }
    // rgb led
    rgbLedShowStyleColor(args) {
        this.runtime.abilities.grovezero.rgbLed.showStyleColor(args);
    }

    rgbLedShowStyle(args) {
        this.runtime.abilities.grovezero.rgbLed.showStyle(args);
    }

    rgbLedFadeFromColor1ToColor2(args) {
        this.runtime.abilities.grovezero.rgbLed.fadeFromColor1ToColor2(args);
    }

    rgbLedSetBrightness(args) {
        this.runtime.abilities.grovezero.rgbLed.setBrightness(args);
    }

    rgbLedLightOff(args) {
        this.runtime.abilities.grovezero.rgbLed.lightOff(args);
    }

    rgbToColor(args) {
        return this.runtime.abilities.grovezero.rgbLed.rgbToColor(args);
    }

    hslToColor(args) {
        return this.runtime.abilities.grovezero.rgbLed.hslToColor(args);
    }

    // rgb matrix
    ledMatrixXyGetColor(args) {
        let _address = parseInt(args.I2C);
        let _x = Cast.toNumber(args.X);
        let _y = Cast.toNumber(args.Y);
        return this.runtime.abilities.grovezero.rgbMatrix.getColorValue(_address, {
            x: _x,
            y: _y
        });
    }

    rgbMatrixClean(args) {
        let _address = parseInt(args.I2C);
        this.runtime.abilities.grovezero.rgbMatrix.quenchAll(_address);
    }

    rgbMatrixXyIsOn(args) {
        let _address = parseInt(args.I2C);
        let _x = Cast.toNumber(args.X);
        let _y = Cast.toNumber(args.Y);
        return this.runtime.abilities.grovezero.rgbMatrix.isLisghted(_address, {
            x: _x,
            y: _y
        });
    }

    async rgbMatrixXySetOnOff(args) {
        let _address = parseInt(args.I2C);
        let _x = Cast.toNumber(args.X);
        let _y = Cast.toNumber(args.Y);
        let _color = args.COLOR;
        await this.runtime.abilities.grovezero.rgbMatrix.trunonoffRgbMatrix(_address, {
            x: _x,
            y: _y
        }, _color);
    }
    async rgbMatrixXySetOff(args) {
        let _address = parseInt(args.I2C);
        let _x = Cast.toNumber(args.X);
        let _y = Cast.toNumber(args.Y);
        await this.runtime.abilities.grovezero.rgbMatrix.quenchRgbMatrix(_address, {
            x: _x,
            y: _y
        });
    }
    async rgbMatrixXySetOn(args) {
        let _address = parseInt(args.I2C);
        let _x = Cast.toNumber(args.X);
        let _y = Cast.toNumber(args.Y);
        let _color = args.COLOR;
        await this.runtime.abilities.grovezero.rgbMatrix.lightRgbMatrix(_address, {
            x: _x,
            y: _y
        }, _color);
    }
    async rgbMatrixShowHistogram(args) {
        let _address = parseInt(args.I2C);
        let _value = Cast.toNumber(args.VALUE);
        await this.runtime.abilities.grovezero.rgbMatrix.showHistoram(_address, _value);
    }

    async rgbMatrixShowAnima(args) {
        let _address = parseInt(args.I2C);
        let _anima = Cast.toNumber(args.ANIMA);
        await this.runtime.abilities.grovezero.rgbMatrix.showAnima(_address, _anima);
    }

    async rgbMatrixShowString(args) {
        let _address = parseInt(args.I2C);
        let _color = args.COLOR;
        let _text = args.STRING;
        await this.runtime.abilities.grovezero.rgbMatrix.showText(_address, _text, _color);
    }

    async rgbMatrixShowShape(args) {
        let _address = parseInt(args.I2C);
        let _rgb_matrix = JSON.parse(args.SHAPE);
        await this.runtime.abilities.grovezero.rgbMatrix.ShowPattern(_address, _rgb_matrix);
    }

    // led matrix
    ledMatrixClean(args) {
        this.runtime.abilities.grovezero.ledMatrix.clean(args);
    }
    ledMatrixXySetOff(args) {
        this.runtime.abilities.grovezero.ledMatrix.xySetOff(args);
    }
    ledMatrixXySetOn(args) {
        this.runtime.abilities.grovezero.ledMatrix.xySetOn(args);
    }
    ledMatrixShowString(args) {
        this.runtime.abilities.grovezero.ledMatrix.showString(args);
    }
    ledMatrixShowShape(args) {
        this.runtime.abilities.grovezero.ledMatrix.showShape(args);
    }

    ledMatrixXyIsOn(args) {
        this.runtime.abilities.grovezero.ledMatrix.xyIsOn(args);
    }

    // dc motor
    dcMotorTurnPower(args) {
        this.runtime.abilities.grovezero.dcMotor.turnPower(args);
    }

    dcMotorStop(args) {
        this.runtime.abilities.grovezero.dcMotor.stop(args);
    }

    // mini wheel
    miniWheelSetPower(args) {
        this.runtime.abilities.grovezero.miniWheel.setPowerAtRate(args);
    }

    miniWheelStop(args) {
        this.runtime.abilities.grovezero.miniWheel.stop(args);
    }

    miniWheelRun(args) {
        this.runtime.abilities.grovezero.miniWheel.run(args);
    }

    // servo
    servoTurnAngle(args) {
        this.runtime.abilities.grovezero.servo.turnAngle(args);
    }

    // twin button
    twinButtonIsPressed(args) {
        return this.runtime.abilities.grovezero.twinButton.isPressed(args);
    }


}

module.exports = GrovezeroBlocks;
