class Imu9Dof {
    constructor (runtime) {
        this.runtime = runtime;
    }

    postData (data) {
        this.runtime.startHats('event_g0_imu9_dof_status_when_change', data);
    }

    
}

module.exports = Imu9Dof;
