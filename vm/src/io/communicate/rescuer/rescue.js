const { getFirmwareInfo } = require('../../../util/firmware-request')


class Rescue {
    constructor(io, comName) {
        this.io = io;
        this.comName = comName;

        this.type = null;
        this.firmwareVersion = null;

        this.resolve = null;
        this.reject = null;

        this.upgradeMode = 1;

        this.onResponse = this.onResponse.bind(this);
    }

    setUpgradeMode(upgradeMode){
        this.upgradeMode = upgradeMode;
    }

    sendMessage(msg) {
        this.io.sendMessage({
            method: 'compile',
            data: msg
        });
    }

    onResponse(message) {
        const { method, data } = message;
        console.log(message);
        if (method !== 'compile-resp') {
            this.removeListeners();
            return;
        }
        const { compileSucc } = data;
        if (compileSucc) {
            this.resolve && this.resolve()
        }
        else {
            this.reject && this.reject();
        }
        this.removeListeners();
    }

    addListeners() {
        this.io.on('message', this.onResponse);
    }

    removeListeners() {
        this.io.removeListener('message', this.onResponse);
    }

    fetchFirmwareVersion() {
        return new Promise((resolve, reject) => {
            getFirmwareInfo({
                type: this.type
            }).then(res => {
                this.firmwareVersion = res.version;
                resolve();
            }).catch(e => {
                reject();
            })
        })
    }

}

module.exports = Rescue;