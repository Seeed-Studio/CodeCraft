
/**
 * 判断是否是可支持的浏览器
 * gecko/20100101 firefox/64.0  火狐
 * chrome/68.0.3440.106 safari/537.36 Chrome
 * chrome/63.0.3239.132 safari/537.36  360
 */
const isSupported = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('firefox') != -1 ||
        userAgent.indexOf('chrome') != -1 ||
        userAgent.indexOf('safari') != -1) {
        return true;
    } else {
        return false;
    }
}