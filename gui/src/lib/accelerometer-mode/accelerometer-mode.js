class AccelerometerMode {
    constructor () {
        this.blockOnclick;
        this.accelerometerCallback;                      
    }

    setAccelerometerCallback (accelerometerCallback) {
        this.accelerometerCallback = accelerometerCallback;
    }
    
}

export default AccelerometerMode;
