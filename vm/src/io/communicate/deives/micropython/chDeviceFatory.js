const Maixduino = require('./maixduino');
const MPython = require('./mpython');
const Powering = require('./powering');

const CMC_DEVICE_MPYTHON = "mpython-grove";
const CMC_DEVICE_MAIXDUINO = "cyberEye";
const CMC_DEVICE_POWERING = "PoweRing";

/**
 * 构建 chDevice
 * @param {*} micropython 
 * @param {*} type 
 */
const createChDevice = (micropython, type) => {
    if (type.indexOf(CMC_DEVICE_MAIXDUINO) > -1) {
        return new Maixduino(micropython);
    }
    if (type.indexOf(CMC_DEVICE_MPYTHON) > -1) {
        return new MPython(micropython);
    }
    if (type.indexOf(CMC_DEVICE_POWERING) > -1) {
        return new Powering(micropython);
    }
    return null;
}

/**
 * 通过设备类型识别设备
 * 返回设备id
 * @param {*} deviceType 
 */
const recognize = (deviceType) => {
    if (deviceType.indexOf(CMC_DEVICE_MAIXDUINO) > -1) {
        return 1005;
    }

    if (deviceType.indexOf(CMC_DEVICE_MPYTHON) > -1) {
        return 1007;
    }

    if (deviceType.indexOf(CMC_DEVICE_POWERRING) > -1) {
        return 1008;
    }

    return 1000;
}



module.exports = {
    recognize,
    createChDevice
}