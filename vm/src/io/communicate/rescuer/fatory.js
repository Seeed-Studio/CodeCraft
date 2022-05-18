const ElfbotRescuer = require('./elfbot-rescue')
const MPythonRescuer = require('./mpython-rescue')
const MaixduinoRescuer = require('./maixduino-rescue')
const PoweringRescuer = require('./powering-rescue')

const createRescuer = (type, comName, io) => {
    switch (type) {
        case 'elfbot':
            return new ElfbotRescuer(io, comName);
        case 'mpython':
            return new MPythonRescuer(io, comName);
        case 'maixduino':
            return new MaixduinoRescuer(io, comName);
        case 'powering':
            return new PoweringRescuer(io, comName);
    }
}

module.exports = {
    createRescuer
}