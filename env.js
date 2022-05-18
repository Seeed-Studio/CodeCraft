// let host = window.location.hostname;
// let hosts = {
//     prodHosts: ['ide.tinkergen.com','ide.chmakered.com'],
//     testHosts: ['cctest2.chmakered.com'],
//     devHosts: ['localhost','127.0.0.1'],
//   }
// let env = 'dev'; // 开发环境
// let env = 'test'; // 测试环境
let env = 'prod'; // 正式环境
// let env;
// if (hosts.prodHosts.indexOf(host) > -1) {
//     env = 'prod';
// } else if (hosts.testHosts.indexOf(host) > -1) {
//     env = 'test';
// } else if (hosts.devHosts.indexOf(host) > -1) {
//     env = 'test';
// } else {
//     env = 'test';
// }
export default env;

