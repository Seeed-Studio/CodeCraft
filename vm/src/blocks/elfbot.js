const Cast = require('../util/cast');
const Color = require('../util/color');

class ElfbotBlocks {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getHats() {
        return {
            event_elfbot_whenkeysispressed: {
                restartExistingThreads: false,
                edgeActivated: true
            },
            event_elfbot_wheninfrareddetectedoverhead: {
                restartExistingThreads: false,
                edgeActivated: true
            },
            event_elfbot_wheninfrareddetectedoverheadnot: {
                restartExistingThreads: false,
                edgeActivated: true
            },
            event_elfbot_whenultrasonicdetectedobject: {
                restartExistingThreads: true
            },
            event_elfbot_whenlinepatroldetectedcolor: {
                restartExistingThreads: false,
                edgeActivated: true
            },
            event_elfbot_whenultrasonicdetectedobjectdistance: {
                restartExistingThreads: false,
                edgeActivated: true
            },
            event_elfbot_whenloudnessgreaterthan: {
                restartExistingThreads: false,
                edgeActivated: true
            },
            event_elfbot_whenlightintensitylessthan: {
                restartExistingThreads: false,
                edgeActivated: true
            },
        }
    }

    getPrimitives() {
        return {
            // event 
            event_elfbot_whenkeysispressed: this.whenKeyIsPressed,
            event_elfbot_wheninfrareddetectedoverhead: this.whenInfraredDetectedOverhead,
            event_elfbot_wheninfrareddetectedoverheadnot: this.whenInfraredDetectedOverheadNot,
            event_elfbot_whenlinepatroldetectedcolor: this.whenLinepatrolDetectedColor,
            event_elfbot_whenlightintensitylessthan: this.whenLightIntensityLessThan,
            event_elfbot_whenloudnessgreaterthan: this.whenLoudnessGreaterThan,
            event_elfbot_whenultrasonicdetectedobjectdistance: this.whenUltrasonicDetectedObjectDistance,
            // motion
            motion_elfbot_vehiclewheel_run_direction_power: this.vehiclewheelToDirectionAtPower,
            motion_elfbot_vehiclewheel_runforword_power_duartion: this.vehiclewheelForwordAtPowerForDuration,
            motion_elfbot_vehiclewheel_runbackword_power_duartion: this.vehiclewheelBackwordAtPowerForDuration,
            motion_elfbot_vehiclewheel_runleft_power_duartion: this.vehiclewheelRunLeftAtPowerForDuration,
            motion_elfbot_vehiclewheel_runright_power_duartion: this.vehiclewheelRunRightAtPowerForDuration,
            motion_elfbot_vehiclewheel_run_power: this.vehiclewheelRunAtPower,
            motion_elfbot_vehiclewheel_runforword_duration: this.vehiclewheelRunForwardStraightly,
            motion_elfbot_vehiclewheel_runbackword_duration: this.vehiclewheelRunBackwardStraightly,
            motion_elfbot_vehiclewheel_run_stop: this.vehiclewheelStopRun,
            motion_elfbot_headservo_lookleft: this.headservoTurnLeft,
            motion_elfbot_headservo_lookright: this.headservoTurnRight,
            motion_elfbot_headservo_lookup: this.headservoTurnUp,
            motion_elfbot_headservo_lookdown: this.headservoTurnDown,
            motion_elfbot_earservo_turnforword: this.earservoTurnForword,
            motion_elfbot_earservo_turnbackword: this.earservoTurnBackword,
            looks_elfbot_rgbled_show_effectscolor: this.rgbledDisplayAtMode,
            looks_elfbot_rgbled_show_positioncolor: this.rgbledDisplayAtColor,
            looks_elfbot_rgbled_show_positioncolor_duration: this.rgbledDisplayAtColor,
            looks_elfbot_rgbled_show_color: this.rgbledDisplayAtDesignatedColor,
            looks_elfbot_rgbled_crushout: this.rgbledClose,
            looks_elfbot_ultrasonicled_show_color: this.ultrasonicLedDispay,
            looks_elfbot_ultrasonicled_crushout: this.ultrasonicLedClose,
            looks_elfbot_ledmatrix_showimage: this.ledmatrixShowImage,
            looks_elfbot_ledmatrix_showimage_duration: this.ledmatrixShowImageForDuration,
            looks_elfbot_ledmatrix_showemoticon: this.ledmatrixShowMoticon,
            looks_elfbot_ledmatrix_showemoticon_duration: this.ledmatrixShowMoticonForDuration,
            looks_elfbot_ledmatrix_showtext: this.ledmatrixShowText,
            looks_elfbot_ledmatrix_showtext_untildone: this.ledmatrixShowTextUntilDone,
            looks_elfbot_ledmatrix_plot: this.ledmatrixPlot,
            looks_elfbot_ledmatrix_unplot: this.ledmatrixUnPlot,
            looks_elfbot_ledmatrix_plotorunplot: this.ledmatrixPlotOrUnplot,
            looks_elfbot_ledmatrix_isplot: this.ledmatrixIsplot,
            looks_elfbot_ledmatrix_crushoutscreen: this.ledmatrixClose,
            sound_elfbot_sound_play: this.loudsepakerPlay,
            sound_elfbot_sound_play_for_duration: this.loudspeakerPlayForDuration,
            sound_elfbot_sound_play_untildone: this.loudsepakerPlayUntilDone,
            sound_elfbot_sound_stop_play: this.loudsepakerStop,
            sound_elfbot_note_beats: this.loudsepakerPlayNoteBeat,
            sound_elfbot_sound_rest: this.loudsepakerPlayRest,
            sound_elfbot_sound_play_frequencyhz: this.loudsepakerPlayRateSec,
            sound_elfbot_sound_changevolume: this.loudsepakerPlayChangeVolume,
            sound_elfbot_sound_setvolume: this.loudsepakerPlaySetVolume,
            sound_elfbot_sound_volume: this.loudsepakerPlayVolume,
            sensing_elfbot_button_s_ispressed: this.isButtonSPressed,
            sensing_elfbot_ultrasonic_distance: this.ultrasonicGetDistance,
            sensing_elfbot_ultrasonic_isdetectedobject: this.ultrasonicHasObstacle,
            sensing_elfbot_sound_loudness: this.noiseSoundLoudness,
            sensing_elfbot_light_intensity: this.lightIntensity,
            sensing_elfbot_infrared_lightintensity: this.infraredLightness,
            sensing_elfbot_infrared_detected_ishead: this.infraredisHead,
            sensing_elfbot_linepatrol_grayscale: this.linepatrolGetGrayScale,
            sensing_elfbot_linepatrol_detected_color: this.linepatrolDetecteColor,
            sensing_elfbot_linepatrol_detected_color_value: this.linepatrolDetecteColorValue,
            sensing_elfbot_linepatrol_lightintensity: this.linepatrolLightness,
            sensing_elfbot_linepatrol_detect_color: this.linepatrolDetectLinerColor,
            sensing_elfbot_linepatrol_line_location: this.linepatrolLineLocation,
            sensing_elfbot_linepatrol_last_line: this.linepatrolLastLine,
            sensing_elfbot_linepatrol_get_value: this.linepatrolGetValue
        };
    }

    whenLinepatrolDetectedColor(args, util) {
        return this.runtime.abilities.elfbot.linepatrol.detectColor(Cast.toNumber(args.COLOR));
    }

    whenInfraredDetectedOverheadNot(args, util) {
        return !this.runtime.abilities.elfbot.infrared.isVacant();
    }

    whenInfraredDetectedOverhead(args, util) {
        return this.runtime.abilities.elfbot.infrared.isVacant();
    }

    whenKeyIsPressed(args, util) {
        return this.runtime.abilities.elfbot.key.isPressed();
    }

    whenLightIntensityLessThan(args, util) {
        let lightness = this.runtime.abilities.elfbot.light.getLightness();

        if (lightness === -1) return false;

        if (args.OPT === '>') {
            return lightness > args.INTENSITY;
        }
        if (args.OPT === '<') {
            return lightness < args.INTENSITY;
        }

        return false;
    }

    whenLoudnessGreaterThan(args, util) {
        let loudness = this.runtime.abilities.elfbot.noise.getLoudness();

        if (loudness === -1) return false;

        if (args.OPT === '>') {
            return loudness > args.LOUDNESS;
        }
        if (args.OPT === '<') {
            return loudness < args.LOUDNESS;
        }

        return false;
    }

    whenUltrasonicDetectedObjectDistance(args, util) {
        let distance = this.runtime.abilities.elfbot.ultrasonic.getDistance();

        if (distance === -1) return false;

        if (args.OPT === '>') {
            return distance > args.NUM;
        }
        if (args.OPT === '<') {
            return distance < args.NUM;
        }

        return false;
    }

    /**
     * 车轮以一定速度驶向某个方向
     * @param {*} args (方位、速度)
     * @param {*} util 
     */
    vehiclewheelToDirectionAtPower(args, util) {
        let direction = args.DIRECTION;
        let powerPercent = Cast.toNumber(args.POWER);
        this.runtime.abilities.elfbot.vehicleWheel.run(direction, powerPercent, 655);
    }

    /**
     * 车轮以一定速度驶向前行驶一定时间
     * @param {*} args 
     * @param {*} util (方位、速度、时长)
     */
    async vehiclewheelForwordAtPowerForDuration(args, util) {
        let powerPercent = Cast.toNumber(args.POWER);
        let duration = Cast.toNumber(args.DURATION);
        await this.runtime.abilities.elfbot.vehicleWheel.runForDuration('forward', powerPercent, duration);
    }

    /**
     * 车轮以一定速度驶向后行驶一定时间
     * @param {*} args 
     * @param {*} util (方位、速度、时长)
     */
    async vehiclewheelBackwordAtPowerForDuration(args, util) {
        let powerPercent = Cast.toNumber(args.POWER);
        let duration = Cast.toNumber(args.DURATION);
        await this.runtime.abilities.elfbot.vehicleWheel.runForDuration('back', powerPercent, duration);
    }

    /**
     * 车轮以一定速度驶向左行驶一定时间
     * @param {*} args 
     * @param {*} util (方位、速度、时长)
     */
    async vehiclewheelRunLeftAtPowerForDuration(args, util) {
        let powerPercent = Cast.toNumber(args.POWER);
        let duration = Cast.toNumber(args.DURATION);
        await this.runtime.abilities.elfbot.vehicleWheel.runForDuration('left', powerPercent, duration);
    }

    /**
      * 车轮以一定速度驶向左行驶一定时间
      * @param {*} args 
      * @param {*} util (方位、速度、时长)
      */
    async vehiclewheelRunRightAtPowerForDuration(args, util) {
        let powerPercent = Cast.toNumber(args.POWER);
        let duration = Cast.toNumber(args.DURATION);
        await this.runtime.abilities.elfbot.vehicleWheel.runForDuration('right', powerPercent, duration);
    }

    /**
     * 车轮以一定动力值行驶
     * @param {*} args （左动力，右动力）
     * @param {*} util 
     */
    vehiclewheelRunAtPower(args, util) {
        let lPowerPercent = Cast.toNumber(args.LEFTPOWER);
        let rPowerPercent = Cast.toNumber(args.RIGHTPOWER);
        this.runtime.abilities.elfbot.vehicleWheel.runAtPower(lPowerPercent, rPowerPercent, 655);
    }

    /**
     * 直线前进
     * @param {*} args 
     * @param {*} util 
     */
    async vehiclewheelRunForwardStraightly(args, util) {
        let duration = Cast.toNumber(args.DURATION);
        await this.runtime.abilities.elfbot.vehicleWheel.goForward(duration);
    }

    /**
     * 直线后退
     * @param {*} args 
     * @param {*} util 
     */
    async vehiclewheelRunBackwardStraightly(args, util) {
        let duration = Cast.toNumber(args.DURATION);
        await this.runtime.abilities.elfbot.vehicleWheel.goBackward(duration);
    }

    /**
     * 车轮停止运动
     * @param {*} args 
     * @param {*} util 
     */
    vehiclewheelStopRun(args, util) {
        this.runtime.abilities.elfbot.vehicleWheel.stop();
    }

    /**
     * 头部 向左旋转
     * @param {*} args 
     * @param {*} util 
     */
    headservoTurnLeft(args, util) {
        let degress = Cast.toNumber(args.DEGREES);
        this.runtime.abilities.elfbot.servo.run(0x00, degress);
    }

    /**
     * 头部 向右旋转
     * @param {*} args 
     * @param {*} util 
     */
    headservoTurnRight(args, util) {
        let degress = Cast.toNumber(args.DEGREES);
        this.runtime.abilities.elfbot.servo.run(0x01, degress);
    }

    /**
     * 头部 向上旋转
     * @param {*} args 
     * @param {*} util 
     */
    headservoTurnUp(args, util) {
        let degress = Cast.toNumber(args.DEGREES);
        this.runtime.abilities.elfbot.servo.run(0x02, degress);
    }

    /**
      * 头部 向下旋转
      * @param {*} args 
      * @param {*} util 
      */
    headservoTurnDown(args, util) {
        let degress = Cast.toNumber(args.DEGREES);
        this.runtime.abilities.elfbot.servo.run(0x03, degress);
    }

    /**
     * 耳部 向前旋转
     * @param {*} args 
     * @param {*} util 
     */
    earservoTurnForword(args, util) {
        let degress = Cast.toNumber(args.DEGREES);
        this.runtime.abilities.elfbot.servo.run(0x04, degress);
    }

    /**
     * 耳部 向后旋转
     * @param {*} args 
     * @param {*} util 
     */
    earservoTurnBackword(args, util) {
        let degress = Cast.toNumber(args.DEGREES);
        this.runtime.abilities.elfbot.servo.run(0x05, degress);
    }

    /**
     * rgbled 根据模式亮
     * @param {*} args 
     * @param {*} util 
     */
    rgbledDisplayAtMode(args, util) {
        let effect = args.EFFECT;
        let rgb = args.COLOR;
        this.runtime.abilities.elfbot.rgbled.displayAtMode(effect, Color.hexToRgb(rgb));
    }

    /**
     * rgbled 显示颜色值
     * @param {*} args 
     * @param {*} util 
     */
    async rgbledDisplayAtColor(args, util) {
        let position = args.POSITION
        let rgb = args.COLOR;
        let secs = args.TIMER ? Cast.toNumber(args.TIMER) : 0;
        await this.runtime.abilities.elfbot.rgbled.displayAtColor(position, secs, Color.hexToRgb(rgb));
    }

    /**
     * rgbled 显示特定的颜色
     * @param {*} args 
     * @param {*} util 
     */
    rgbledDisplayAtDesignatedColor(args, util) {
        this.runtime.abilities.elfbot.rgbled.displayAtDesignatedColor('all', args.COLOR);
    }

    /**
     * rgbled 关闭
     * @param {*} args 
     * @param {*} util 
     */
    rgbledClose(args, util) {
        this.runtime.abilities.elfbot.rgbled.close();
    }

    /**
     * 超声波 led 显示
     * @param {*} args 
     * @param {*} util 
     */
    ultrasonicLedDispay(args, util) {
        this.runtime.abilities.elfbot.ultrasonicled.display(args.COLOR);
    }

    /**
     * 超声波 led 关闭
     * @param {*} args 
     * @param {*} util 
     */
    ultrasonicLedClose(args, util) {
        this.runtime.abilities.elfbot.ultrasonicled.close();
    }

    /**
     * 显示一幅图案
     * @param {*} args 
     * @param {*} util 
     */
    ledmatrixShowImage(args, util) {
        this.runtime.abilities.elfbot.ledmatrix.showImage(args.SHAPE, 655);
    }

    /**
     * 显示一幅图案 xx 秒
     * @param {*} args 
     * @param {*} util 
     */
    async ledmatrixShowImageForDuration(args, util) {
        let shape = args.SHAPE;
        let secs = Cast.toNumber(args.SECS);
        // if (secs === 0) return;
        await this.runtime.abilities.elfbot.ledmatrix.showImageForDuration(shape, secs);
    }

    /**
     * 显示默认图案
     * @param {*} args 
     * @param {*} uti 
     */
    ledmatrixShowMoticon(args, uti) {
        this.runtime.abilities.elfbot.ledmatrix.showAnima(655, args.EMOTICON);
    }

    /**
     * 显示默认图案 xx 秒
     * @param {*} args 
     * @param {*} uti 
     */
    async ledmatrixShowMoticonForDuration(args, uti) {
        let secs = Cast.toNumber(args.TIMER)
        let emoticon = args.EMOTICON;
        if (secs === 0) return;
        await this.runtime.abilities.elfbot.ledmatrix.showAnima(secs, emoticon);
    }

    /**
     * 显示文本
     * @param {*} args 
     * @param {*} uti 
     */
    ledmatrixShowText(args, uti) {
        this.runtime.abilities.elfbot.ledmatrix.showText(0x01, args.VALUE);
    }
    /**
     * 显示文本直到结束
     * @param {*} args 
     * @param {*} uti 
     */
    async ledmatrixShowTextUntilDone(args, uti) {
        await this.runtime.abilities.elfbot.ledmatrix.showTextUntilDone(args.VALUE);
    }

    /**
     * 点亮 制定位置的led灯
     * @param {*} args 
     * @param {*} util 
     */
    ledmatrixPlot(args, util) {
        let x = Cast.toNumber(args.X);
        let y = Cast.toNumber(args.Y);
        this.runtime.abilities.elfbot.ledmatrix.setPosition(x, y, 0x01, 0);
    }

    /**
     * 熄灭 制定位置的led灯
     * @param {*} args 
     * @param {*} util 
     */
    ledmatrixUnPlot(args, util) {
        let x = Cast.toNumber(args.X);
        let y = Cast.toNumber(args.Y);
        this.runtime.abilities.elfbot.ledmatrix.setPosition(x, y, 0x00, 0);
    }

    /**
     * 点亮/熄灭 制定位置的led灯
     * @param {*} args 
     * @param {*} util 
     */
    ledmatrixPlotOrUnplot(args, util) {
        let x = Cast.toNumber(args.X);
        let y = Cast.toNumber(args.Y);
        this.runtime.abilities.elfbot.ledmatrix.setPositionAutoChange(x, y, 0);
    }

    /**
     * 点 是否点亮
     * @param {*} args 
     * @param {*} util 
     */
    ledmatrixIsplot(args, util) {
        let x = Cast.toNumber(args.X);
        let y = Cast.toNumber(args.Y);
        return this.runtime.abilities.elfbot.ledmatrix.positionState(x, y);
    }

    /**
     * 关闭显示屏
     * @param {*} args 
     * @param {*} util 
     */
    ledmatrixClose(args, util) {
        this.runtime.abilities.elfbot.ledmatrix.close();
    }

    /**
     * 播放声音
     * @param {*} args 
     * @param {*} util 
     */
    async loudsepakerPlay(args, util) {
        await this.runtime.abilities.elfbot.loudspeaker.playSoundsUntilDone(Cast.toNumber(args.SOUND));
    }

    async loudspeakerPlayForDuration(args) {
        await this.runtime.abilities.elfbot.loudspeaker.playSounds(Cast.toNumber(args.SOUND), args.DURATION);
    }

    /**
     * 播放声音直到结束
     * @param {*} args 
     * @param {*} util 
     */
    async loudsepakerPlayUntilDone(args, util) {
        await this.runtime.abilities.elfbot.loudspeaker.playSoundsUntilDone(Cast.toNumber(args.SOUND));
    }
    
    /**
     * 停止播放声音
     * @param {*} args 
     * @param {*} util 
     */
    loudsepakerStop(args, util) {
        this.runtime.abilities.elfbot.loudspeaker.close();
    }

    /**
     * 播放音符节拍
     * @param {*} args 
     * @param {*} util 
     */
    async loudsepakerPlayNoteBeat(args, util) {
        let note = Cast.toNumber(args.NOTE);
        let beat = Cast.toNumber(args.BEAT);
        await this.runtime.abilities.elfbot.loudspeaker.playNoteBeat(note, beat);
    }

    /**
     * 休止节拍
     * @param {*} args 
     * @param {*} util 
     */
    loudsepakerPlayRest(args, util) {
        let beat = Cast.toNumber(args.BEAT);
        this.runtime.abilities.elfbot.loudspeaker.playRestBeat(beat);
    }

    /**
     * 精灵 播放声音以频率##赫兹，持续##秒
     * @param {*} args 
     * @param {*} util 
     */
    async loudsepakerPlayRateSec(args, util) {
        let hz = Cast.toNumber(args.HZ);
        let secs = Cast.toNumber(args.SECS);
        if (secs === 0) return;
        await this.runtime.abilities.elfbot.loudspeaker.playRate(hz, secs);
    }

    /**
     * 将喇叭音量 + 
     * @param {*} args 
     * @param {*} util 
     */
    loudsepakerPlayChangeVolume(args, util) {
        this.runtime.abilities.elfbot.loudspeaker.changeVolume(Cast.toNumber(args.VOLUME));
    }

    /**
     * 设置喇叭音量
     * @param {*} args 
     * @param {*} util 
     */
    loudsepakerPlaySetVolume(args, util) {
        this.runtime.abilities.elfbot.loudspeaker.setVolume(Cast.toNumber(args.VOLUME));
    }

    /**
     * 喇叭音量
     * @param {*} args 
     * @param {*} util 
     */
    loudsepakerPlayVolume(args, util) {
        return this.runtime.abilities.elfbot.loudspeaker.getVolume();
    }

    /**
     * s键是否被按下
     * @param {*} args 
     * @param {*} util 
     */
    isButtonSPressed(args, util) {
        return this.runtime.abilities.elfbot.key.isPressed();
    }

    /**
     * 噪音声音强度
     * @param {*} args 
     * @param {*} util 
     */
    noiseSoundLoudness(args, util) {
        return this.runtime.abilities.elfbot.noise.getLoudness();
    }

    /**
     * 超声波距离
     * @param {*} args 
     * @param {*} util 
     */
    ultrasonicGetDistance(args, util) {
        return this.runtime.abilities.elfbot.ultrasonic.getDistance();
    }

    /**
     * 前方是否有障碍物
     * @param {*} args 
     * @param {*} util 
     */
    ultrasonicHasObstacle(args, util) {
        return this.runtime.abilities.elfbot.ultrasonic.hasObstacle();
    }

    /**
     * 获取精灵环境光强度
     * @param {*} args 
     * @param {*} util 
     */
    lightIntensity(args, util) {
        return this.runtime.abilities.elfbot.light.getLightness();
    }

    /**
     * 获取精灵红外光强度
     * @param {*} args 
     * @param {*} util 
     */
    infraredLightness(args, util) {
        return this.runtime.abilities.elfbot.infrared.getLightness();
    }

    /**
     * 获取精灵红外悬空状态
     * @param {*} args 
     * @param {*} util 
     */
    infraredisHead(args, util) {
        return this.runtime.abilities.elfbot.infrared.isVacant();
    }

    /**
     * 获取灰度值
     * @param {*} args 
     * @param {*} util 
     */
    linepatrolGetGrayScale(args, util) {
        return this.runtime.abilities.elfbot.linepatrol.getGrayScale();
    }

    /**
     * 检测颜色 红色/绿色/蓝色/黄色/青色/紫色/黑色/白色
     * @param {*} args 
     * @param {*} util 
     */
    linepatrolDetecteColor(args, util) {
        return this.runtime.abilities.elfbot.linepatrol.detectColor(Cast.toNumber(args.COLOR));
    }

    /**
     * 检测颜色 红色/绿色/蓝色
     * @param {*} args 
     * @param {*} util 
     */
    linepatrolDetecteColorValue(args, util) {
        return this.runtime.abilities.elfbot.linepatrol.getColor(Cast.toNumber(args.COLOR));
    }

    /**
     * 巡线 光强度
     * @param {*} args 
     * @param {*} util 
     */
    linepatrolLightness(args, util) {
        return this.runtime.abilities.elfbot.linepatrol.getLightness();
    }

    linepatrolDetectLinerColor(args, util) {
        return this.runtime.abilities.elfbot.linepatrol.detectLinerColor(args);
    }

    linepatrolLineLocation(args, util) {
        return this.runtime.abilities.elfbot.linepatrol.isLineLocation(args);
    }

    linepatrolLastLine(args, util) {
        return this.runtime.abilities.elfbot.linepatrol.lastLinerLocation(args);
    }

    linepatrolGetValue(args, util) {
        return this.runtime.abilities.elfbot.linepatrol.getValue(args);
    }

}

module.exports = ElfbotBlocks;
