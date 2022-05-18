const Cast = require('../util/cast');
const Color = require('../util/color');

class PoweringBlocks {

    constructor(runtime) {
        this.runtime = runtime;
    }

    getHats() {
        return {
            event_haloboad_when_button_pressed: {
                restartExistingThreads: false,
                edgeActivated: true
            },
            event_haloboad_when_shaking: {
                restartExistingThreads: false,
                edgeActivated: true
            },
            event_haloboad_when_punching: {
                restartExistingThreads: false,
                edgeActivated: true
            },
            event_haloboad_timer_when_greaterthan: {
                restartExistingThreads: false,
                edgeActivated: true
            },
            event_haloboad_timerA_when_greaterthan: {
                restartExistingThreads: true
            },
            event_haloboad_timerB_when_greaterthan: {
                restartExistingThreads: true
            },
            event_haloboad_whenbroadcastreceived: {
                restartExistingThreads: true
            }
        }
    }

    getPrimitives() {
        return {
            //lights
            motion_haloboad_light_blink: this.lightBlink,
            motion_haloboad_light_shootstart: this.lightShootStart,
            motion_haloboad_light_pattern_flip_lr: this.lightPatternFlipLR,
            motion_haloboad_light_pattern_flip_ud: this.lightPatternFlipUD,
            motion_haloboad_light_pattern_ringset: this.lightPatternShow,
            motion_haloboad_light_pattern_ringset_forduration: this.lightPatternShowFor,
            motion_haloboad_light_show: this.lightShow,
            motion_haloboad_light_show_forduration: this.lightShowFor,
            motion_haloboad_light_closed_all: this.lightClose,
            motion_haloboad_light_rgbled_set: this.lightSetOne,
            motion_haloboad_light_rgbled_closed: this.lightCloseOne,
            motion_haloboad_light_set_test: this.lightTest,
            //pose
            sensing_haloboad_facing_up: this.isFacingUp,
            sensing_haloboad_facing_down: this.isFacingDown,
            sensing_haloboad_facing_left: this.isFacingLeft,
            sensing_haloboad_facing_right: this.isFacingRight,
            sensing_haloboad_facing_forward: this.isFacingForward,
            sensing_haloboad_facing_backward: this.isFacingBackward,
            sensing_haloboad_acceleration: this.getAccelerationValue,
            //event
            event_haloboad_when_button_pressed: this.whenButtonOnPressed,
            event_haloboad_when_shaking: this.whenShaking,
            event_haloboad_when_punching: this.whenPunching,
            event_haloboad_waituntil_end: this.powerOff,
            //timer
            motion_haloboad_timer_resetall: this.resetAllTimer,
            motion_haloboad_timer_resetA: this.resetTimerA,
            motion_haloboad_timer_getvalueA: this.getTimerA,
            event_haloboad_timerA_when_greaterthan: this.whenTimerAGreaterthan,
            motion_haloboad_timer_resetB: this.resetTimerB,
            motion_haloboad_timer_getvalueB: this.getTimerB,
            event_haloboad_timerB_when_greaterthan: this.whenTimerBGreaterthan,

            motion_haloboad_timer_reset: this.resetTimer,
            motion_haloboad_timer_getvalue: this.getTimer,
            event_haloboad_timer_when_greaterthan: this.whenTimerGreaterthan,

            //message
            event_haloboad_broadcast: this.broadcast,
            event_haloboad_broadcastandwait: this.broadcastAndWait,
        };
    }

    async lightBlink(args, util) {
        let colorJson = args.COLOR_V || "{}";
        let speed = args.SPEED;
        let colorObj = JSON.parse(colorJson);

       let {
            id = 0,
            brightness = 1
        } = colorObj;

        let rgb = Color.LIGHT_COLORS[id][brightness - 1];

        let realR = rgb[0];
        let realG = rgb[1];
        let realB = rgb[2];

        await this.runtime.abilities.powering.lights.blink({ r: realR, g: realG, b: realB }, speed);
    }

    async lightShootStart(args, util) {
        let colorJson = args.COLOR_V || "{}";
        let mode = args.MODE;
        let colorObj = JSON.parse(colorJson);

        let {
            id = 0
        } = colorObj;

        await this.runtime.abilities.powering.lights.star(id, mode);
    }

    async lightPatternFlipLR(args, util) {
        let ringJson = args.RING_VALUE || '[]';
        let speed = args.SPEED;
        let ringObj = JSON.parse(ringJson);
        let ringDatas = ringObj.map(({ colorId, brightness }) => {
            let rgb = Color.LIGHT_COLORS[colorId][brightness - 1];
            let realR = rgb[0];
            let realG = rgb[1];
            let realB = rgb[2];
            return `(${realR}, ${realG}, ${realB})`;
        });
        await this.runtime.abilities.powering.lights.horizontalFlip(ringDatas, speed);
    }

    async lightPatternFlipUD(args, util) {
        let ringJson = args.RING_VALUE || '[]';
        let speed = args.SPEED;
        let ringObj = JSON.parse(ringJson);
        let ringDatas = ringObj.map(({ colorId, brightness }) => {
            let rgb = Color.LIGHT_COLORS[colorId][brightness - 1];
            let realR = rgb[0];
            let realG = rgb[1];
            let realB = rgb[2];
            return `(${realR}, ${realG}, ${realB})`;
        });
        await this.runtime.abilities.powering.lights.verticalFlip(ringDatas, speed);
    }

    async lightPatternShow(args, util) {
        let ringJson = args.RING_VALUE || '[]';
        let ringObj = JSON.parse(ringJson);
        let ringDatas = ringObj.map(({ colorId, brightness }) => {
            let rgb = Color.LIGHT_COLORS[colorId][brightness - 1];
            let realR = rgb[0];
            let realG = rgb[1];
            let realB = rgb[2];
            return `(${realR}, ${realG}, ${realB})`;
        });
        await this.runtime.abilities.powering.lights.show(ringDatas);
    }

    async lightPatternShowFor(args, util) {
        let secs = args.SECS || 0;
        let ringJson = args.RING_VALUE || '[]';
        let ringObj = JSON.parse(ringJson);
        let ringDatas = ringObj.map(({ colorId, brightness }) => {
            let rgb = Color.LIGHT_COLORS[colorId][brightness - 1];
            let realR = rgb[0];
            let realG = rgb[1];
            let realB = rgb[2];
            return `(${realR}, ${realG}, ${realB})`;
        });
        await this.runtime.abilities.powering.lights.showFor(ringDatas, secs * 1000);
    }

    async lightShow(args, util) {
        let colorJson = args.COLOR_V || "{}";
        let colorObj = JSON.parse(colorJson);

        let {
            id = 0,
            brightness = 1
        } = colorObj;

        let rgb = Color.LIGHT_COLORS[id][brightness - 1];

        let realR = rgb[0];
        let realG = rgb[1];
        let realB = rgb[2];

        await this.runtime.abilities.powering.lights.lightShow({ r: realR, g: realG, b: realB });
    }

    async lightShowFor(args, util) {
        let secs = args.SECS || 0;
        let colorJson = args.COLOR_V || "{}";
        let colorObj = JSON.parse(colorJson);

        let {
            id = 0,
            brightness = 1
        } = colorObj;

        let rgb = Color.LIGHT_COLORS[id][brightness - 1];

        let realR = rgb[0];
        let realG = rgb[1];
        let realB = rgb[2];

        await this.runtime.abilities.powering.lights.lightShowFor({ r: realR, g: realG, b: realB }, secs * 1000);
    }

    lightClose(args, util) {
        this.runtime.abilities.powering.lights.turnOff();
    }

    lightSetOne(args, util) {
        let no = args.NO;
        let colorJson = args.COLOR_V || "{}";
        let colorObj = JSON.parse(colorJson);

        let {
            id = 0,
            brightness = 1
        } = colorObj;

        let rgb = Color.LIGHT_COLORS[id][brightness - 1];

        let realR = rgb[0];
        let realG = rgb[1];
        let realB = rgb[2];

        this.runtime.abilities.powering.lights.turnOnOne({ r: realR, g: realG, b: realB }, no);
    }

    async lightTest(args, util) {
        let no = args.NO;
        let r = args.R;
        let g = args.G;
        let b = args.B;
        await this.runtime.abilities.powering.lights.lightTest({ r: r, g: g, b: b }, no);
    }

    lightCloseOne(args, util) {
        this.runtime.abilities.powering.lights.turnOffOne(args.NO);
    }

    isFacingUp(args, util) {
        return this.runtime.abilities.powering.pose.isFacingUp();
    }
    isFacingDown(args, util) {
        return this.runtime.abilities.powering.pose.isFacingDown();
    }
    isFacingLeft(args, util) {
        return this.runtime.abilities.powering.pose.isFacingLeft();
    }
    isFacingRight(args, util) {
        return this.runtime.abilities.powering.pose.isFacingRight();
    }
    isFacingForward(args, util) {
        return this.runtime.abilities.powering.pose.isFacingForward();
    }
    isFacingBackward(args, util) {
        return this.runtime.abilities.powering.pose.isFacingBackward();
    }
    getAccelerationValue(args, util) {
        let xyz = args.XYZ;
        return this.runtime.abilities.powering.pose.getAccelerationValue(xyz);
    }

    whenButtonOnPressed(args, util) {
        return this.runtime.abilities.powering.event.handleButtonPressed();
    }
    whenShaking(args, util) {
        return this.runtime.abilities.powering.event.handleShake();
    }
    whenPunching(args, util) {
        return this.runtime.abilities.powering.event.handlePunch();
    }
    powerOff(args, util) {
        return this.runtime.abilities.powering.event.powerOff();
    }

    resetAllTimer(args, util) {
        // this.runtime.abilities.powering.timer.resetAllTimer();
    }
    resetTimerA(args, util) {
        // this.runtime.abilities.powering.timer.resetAllTimerA();
    }
    getTimerA(args, util) {
        // return this.runtime.abilities.powering.timer.getTimerA();
    }
    whenTimerAGreaterthan(args, util) {
        // let sec = Cast.toNumber(args.SEC) || 0;
        // return this.runtime.abilities.powering.timer.whenTimerAGreaterthan(sec);
    }
    resetTimerB(args, util) {
        // this.runtime.abilities.powering.timer.resetAllTimerB();
    }
    getTimerB(args, util) {
        // return this.runtime.abilities.powering.timer.getTimerB();
    }
    whenTimerBGreaterthan(args, util) {
        // let sec = Cast.toNumber(args.SEC) || 0;
        // return this.runtime.abilities.powering.timer.whenTimerBGreaterthan(sec);
    }

    resetTimer(args, util) {
        util.ioQuery('clock', 'resetProjectTimer');
    }
    getTimer(args, util) {
        return util.ioQuery('clock', 'projectTimer');
    }
    whenTimerGreaterthan(args, util) {
        let value = Cast.toNumber(args.SEC);
        return util.ioQuery('clock', 'projectTimer') > value;
    }

    broadcast(args, util) {
        const broadcastVar = util.runtime.getTargetForStage().lookupBroadcastMsg(
            args.BROADCAST_OPTION.id, args.BROADCAST_OPTION.name);
        if (broadcastVar) {
            const broadcastOption = broadcastVar.name;
            util.startHats('event_haloboad_whenbroadcastreceived', {
                BROADCAST_OPTION: broadcastOption
            });
        }
    }

    broadcastAndWait(args, util) {
        const broadcastVar = util.runtime.getTargetForStage().lookupBroadcastMsg(
            args.BROADCAST_OPTION.id, args.BROADCAST_OPTION.name);
        if (broadcastVar) {
            const broadcastOption = broadcastVar.name;
            // Have we run before, starting threads?
            if (!util.stackFrame.startedThreads) {
                // No - start hats for this broadcast.
                util.stackFrame.startedThreads = util.startHats(
                    'event_haloboad_whenbroadcastreceived', {
                    BROADCAST_OPTION: broadcastOption
                }
                );
                if (util.stackFrame.startedThreads.length === 0) {
                    // Nothing was started.
                    return;
                }
            }
            // We've run before; check if the wait is still going on.
            const instance = this;
            // Scratch 2 considers threads to be waiting if they are still in
            // runtime.threads. Threads that have run all their blocks, or are
            // marked done but still in runtime.threads are still considered to
            // be waiting.
            const waiting = util.stackFrame.startedThreads
                .some(thread => instance.runtime.threads.indexOf(thread) !== -1);
            if (waiting) {
                // If all threads are waiting for the next tick or later yield
                // for a tick as well. Otherwise yield until the next loop of
                // the threads.
                if (
                    util.stackFrame.startedThreads
                        .every(thread => instance.runtime.isWaitingThread(thread))
                ) {
                    util.yieldTick();
                } else {
                    util.yield();
                }
            }
        }
    }

}

module.exports = PoweringBlocks;
