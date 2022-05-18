
const env = require('../../../env.js');
let baseUrl = '';
if (env == 'prod') {
    baseUrl = 'https://ide.tinkergen.com';
} else {
    baseUrl = 'https://cctest2.chmakered.com';
}
module.exports = {
    baseUrl: baseUrl
}