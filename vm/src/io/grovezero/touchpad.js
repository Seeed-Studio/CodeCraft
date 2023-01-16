class Touchpad {
    constructor(runtime) {
        this.runtime = runtime;
    }

    postData(data) {
        this.runtime.startHats('event_g0_touchpad_when_click', data);
    }


}

module.exports = Touchpad;
