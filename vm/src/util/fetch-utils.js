
const { stringify } = require('querystring');

const TYPE_GET = 'get';
const TYPE_POST = 'post';

const CODE_ERROR = -1;
const CODE_PARSE_JSON_ERROR = -3;

const CODE_SUCC = 0;
const CODE_HTTP_OK = 200;

/**
 * get
 * @param {*} url 
 * @param {*} params 
 */
const get = (url, params) => {
    return request(url, params, TYPE_GET)
}

/**
 * post
 * @param {*} url 
 * @param {*} params 
 */
const post = (url, params) => {
    return request(url, params, TYPE_POST)
}

/**
 * request
 * @param {*} path 
 * @param {*} params 
 * @param {*} reqType 
 */
const request = (path, params, reqType) => {
    // 格式化参数数据
    let _params = stringify(params);
    // 拼接get请求下的path路径
    if (reqType === TYPE_GET) {
        path = `${path}?${_params}`;
    }
    // 请求参数
    let options = {
        method: reqType,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // 为post请求设置参数
    if (reqType === TYPE_POST) {
        options.body = JSON.stringify(params);
    }
    //fetch请求
    return new Promise((resolve, reject) => {
        fetch(`${path}`, options).then(resp => {
            const errCode = resp.status;
            if (errCode === CODE_HTTP_OK) {
                resp.json().then((data) => {
                    const errorCode = data.errorCode;
                    const errorMsg = data.errorMessage;
                    if (errorCode === CODE_SUCC) {
                        resolve(data);
                    } else {
                        if (errorCode === 1010008 || errorCode === 1010010) {
                            localStorage.removeItem('localAuthInfo');
                        }
                        reject({ errorCode, errorMsg });
                    }
                }).catch(() => {
                    reject(CODE_PARSE_JSON_ERROR);
                });
            } else {
                reject(errCode);
            }
        }).catch(() => {
            reject(CODE_ERROR);
        });
    });
}

module.exports = {
    get,
    post
};

