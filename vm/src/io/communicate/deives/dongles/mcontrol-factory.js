const Grovezero = require('./grovezero');

const {
    CMC_DEVICE_GROVEZERO
} = require('../device-filter');

/**
 * 生成主控对象
 * @param {*} context 
 * @param {*} type 
 */
const createControl = (context, type) => {
    switch (type) {
        case CMC_DEVICE_GROVEZERO:
            return new Grovezero(context);
        default:
            return null;
    }
}

export {
    createControl
};