const CMC_DEVICE_UNKNOWN = 'unknown';
const CMC_DEVICE_GROVEZERO = 'grovezero';
const CMC_DEVICE_ARDUINO = 'arduino';

const CMC_DEVICE_ARDUINO_LOTUSV = 'arduino-lotusv';
const CMC_DEVICE_ARDUINO_MEGA = 'arduino-mega';

const CMC_DEVICE_DAVINCI_AI = 'davinci-ai';
const CMC_DEVICE_DONGLE = 'dongle';
const CMC_DEVICE_MICROBIT = 'microbit';
const CMC_DEVICE_GROVE_JOINS = 'grove-joint';
const CMC_DEVICE_OPENCAT = 'opencat';

const CMC_DEVICE_ELFBOT = "elfbot";
const CMC_DEVICE_MPYTHON = "mpython-grove";
const CMC_DEVICE_MAIXDUINO = "cyberEye";
const CMC_DEVICE_POWERING = "PoweRing";

const CMC_DEVICE_WIO_TERMINAL = "wio-terminal";

/**
 * 判断当前设备是否可用
 * @param {*} device 
 */
const usable = (device) => {
    return getDeviceType(device) !== null;
}

/**
 * 获取可用设备
 * 设备类型
 * @param {*} device 
 */
const getDeviceType = (device) => {
    let {
        vendorId,
        productId
    } = device;

    if (vendorId) {
        vendorId = vendorId.toLowerCase();
    }
    if (productId) {
        productId = productId.toLowerCase();
    }

    if (!vendorId && !productId) return CMC_DEVICE_OPENCAT;

    if (!vendorId || !productId) return null;

    if (vendorId === '10c4') return CMC_DEVICE_UNKNOWN;// grovezero elfbot dongle

    if (vendorId === '0403' && productId === '6010') return CMC_DEVICE_MAIXDUINO; 

    if (vendorId === '2886' && productId === '800d') return CMC_DEVICE_DAVINCI_AI;

    if (vendorId === '2886' && productId === '000d') return CMC_DEVICE_DAVINCI_AI;

    if (vendorId === '2a03' && productId === '0043') return CMC_DEVICE_ARDUINO;

    if (vendorId === '2341' && productId === '0043') return CMC_DEVICE_ARDUINO;

    if (vendorId === '2886' && productId === '0004') return CMC_DEVICE_ARDUINO;

    if (vendorId === '2886' && (productId === '802d'||productId === '002d')) return CMC_DEVICE_WIO_TERMINAL;

    if (vendorId === '2886' && productId === '8026') return CMC_DEVICE_ARDUINO;

    if (vendorId === '2341' && productId === '0243') return CMC_DEVICE_ARDUINO;

    if (vendorId === '0403' && productId === '6001') return CMC_DEVICE_ARDUINO_MEGA;

    if (vendorId === '1a86' && productId === '7523') return CMC_DEVICE_GROVE_JOINS;

    return null;
}

/**
 * 通过设备类型识别设备
 * 返回设备id
 * @param {*} deviceType 
 */
const recognize = (deviceType) => {
    switch (deviceType) {
        case CMC_DEVICE_UNKNOWN:
        case CMC_DEVICE_DONGLE:
            return 1000;
        case CMC_DEVICE_GROVEZERO:
            return 1001;
        case CMC_DEVICE_ARDUINO:
        case CMC_DEVICE_ARDUINO_MEGA:
            return 1002;
        case CMC_DEVICE_ELFBOT:
            return 1003;
        case CMC_DEVICE_DAVINCI_AI:
            return 1004;
        case CMC_DEVICE_GROVE_JOINS:
            return 1006;
        case CMC_DEVICE_OPENCAT:
            return 1009;
        case CMC_DEVICE_WIO_TERMINAL:
            return 1010;
    }
    return 1000;
}

export {
    CMC_DEVICE_UNKNOWN,
    CMC_DEVICE_GROVEZERO,
    CMC_DEVICE_ARDUINO,
    CMC_DEVICE_ARDUINO_MEGA,
    CMC_DEVICE_ARDUINO_LOTUSV,
    CMC_DEVICE_DAVINCI_AI,
    CMC_DEVICE_DONGLE,
    CMC_DEVICE_ELFBOT,
    CMC_DEVICE_MICROBIT,
    CMC_DEVICE_GROVE_JOINS,
    CMC_DEVICE_WIO_TERMINAL,
    CMC_DEVICE_OPENCAT,
    CMC_DEVICE_MAIXDUINO,
    CMC_DEVICE_MPYTHON,
    CMC_DEVICE_POWERING,
    usable,
    recognize,
    getDeviceType
}