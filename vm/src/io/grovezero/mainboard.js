class Mainboard {
    constructor (runtime) {
        this.runtime = runtime;
    }

    postData (data) {
        this.runtime.startHats('event_g0_mainboard_when_radio_receive', data);
    }

}

module.exports = Mainboard;
