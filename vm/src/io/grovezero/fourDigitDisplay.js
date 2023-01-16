class FourDigitDisplay {
    constructor (runtime) {
        this.runtime = runtime;
    }

    postData (data) {
        this.runtime.startHats('event_g0_four_digit_display_when_countdown_end', data);
    }
}

module.exports = FourDigitDisplay;
