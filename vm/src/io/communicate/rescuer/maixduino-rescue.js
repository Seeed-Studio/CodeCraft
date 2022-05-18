const Rescue = require('./rescue.js');
const { baseUrl } = require('../../../config/serv-config');

class MaixduinoRescuer extends Rescue {
    constructor(io, comName) {
        super(io, comName);
        this.type = 'maixduino';
    }

    isDownFirmwareFile() {
        this.addListeners();
        return new Promise(async (resolve, reject) => {
            await this.fetchFirmwareVersion();
            this.resolve = resolve;
            this.reject = () => reject(this.firmwareVersion)

            let msg = {
                compiler: 'maixduino',
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
                compiler: 'maixduino',
                data: {
                    type: 'save-bin',
                    data: {
                        url: `${baseUrl}/static/firmware/maixduino/maixduino.kfpkg`,
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
                compiler: 'maixduino',
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

module.exports = MaixduinoRescuer;