class MechKey {
    constructor (runtime) {
        this.runtime = runtime;
    }

    postData (data) {
        this.runtime.startHats('event_g0_mech_key_when_click', data);
    }
}

module.exports = MechKey;
