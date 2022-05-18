class PirMotionSensor {
    constructor(runtime) {
        this.runtime = runtime;
    }

    postData(data) {
        this.runtime.startHats('event_g0_pir_motion_sensor_detect_someone', data);
    }
}

module.exports = PirMotionSensor;
