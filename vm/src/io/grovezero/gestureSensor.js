class GestureSensor {
    constructor(runtime) {
        this.runtime = runtime;
    }

    postData(data) {
        this.runtime.startHats('event_g0_gesture_sensor_when_change', data);
    }
}

module.exports = GestureSensor;
