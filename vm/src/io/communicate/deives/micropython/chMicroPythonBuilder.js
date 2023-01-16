
const MicroPython = require('./micropython')

const buildPythonDevice = (context, type) => {
    return new MicroPython(context, type);
}

module.exports = {
    buildPythonDevice
}