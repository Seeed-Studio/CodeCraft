import localeData from './locale-data.js';
import locales, {isRtl} from './supported-locales.js';

export {
    locales as default,
    isRtl,
    localeData // data expected for initializing ReactIntl.addLocaleData
};
