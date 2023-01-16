class TwinButton {
    constructor (runtime) {
        this.runtime = runtime;
    }

    postData (data) {
        this.runtime.startHats('event_g0_twin_button_when_click', data);
    }
}

module.exports = TwinButton;
