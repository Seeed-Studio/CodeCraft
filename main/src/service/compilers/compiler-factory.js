
import ArduinoCompiler from './arduino';
import CppCompiler from './c';

import ElfbotCompiler from './elfbot';
import MaixduinoCompiler from './maixduino';

import MPythonCompiler from './mpython';

import PoweRingCompiler from './powering';


/**
 * 创建编译器对象
 * @param {*} type 
 */
const createCompiler = (type) => {
    switch (type) {
        case 'c':
            return new CppCompiler();
        case 'arduino':
            return new ArduinoCompiler();
        case 'elfbot':
            return new ElfbotCompiler();
        case 'maixduino':
            return new MaixduinoCompiler();
        case 'mpython':
            return new MPythonCompiler();
        case 'powering':
            return new PoweRingCompiler();
        default:
            return null;
    }
}

export {
    createCompiler
}