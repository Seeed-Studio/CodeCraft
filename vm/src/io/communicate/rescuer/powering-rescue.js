const Rescue = require('./rescue.js');
const { baseUrl } = require('../../../config/serv-config');

class PoweringRescuer extends Rescue {
    constructor(io, comName) {
        super(io, comName);
        this.type = 'powering';
    }

    isDownFirmwareFile() {
        this.addListeners();
        return new Promise(async (resolve, reject) => {
            await this.fetchFirmwareVersion();
            this.resolve = resolve;
            this.reject = () => reject(this.firmwareVersion)

            let msg = {
                compiler: 'powering',
                data: {
                    type: 'is-down-firmware',
                    data: {
                        version: this.firmwareVersion
                    }
                }
            }
            this.sendMessage(msg);
        })
    }

    downBin() {
        this.addListeners();
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            let msg = {
                compiler: 'powering',
                data: {
                    type: 'save-bin',
                    data: {
                        url: `${baseUrl}/static/firmware/powering/powering.bin`,
                        version: this.firmwareVersion
                    }
                }
            }
            this.sendMessage(msg);
        })
    }

    upgrade() {
        this.addListeners();
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            let msg = {
                compiler: 'powering',
                comName: this.comName,
                data: {
                    type: 'upgrade',
                    upgradeMode: this.upgradeMode
                }
            }
            this.sendMessage(msg);
        })
    }


}

module.exports = PoweringRescuer;