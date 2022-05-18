
import { stringify } from 'querystring';
import { getPackageConfig } from './package-config.js';

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
    const packageConfig = getPackageConfig();
    // 请求参数
    let options = {
        method: reqType,
        headers: {
            'Content-Type': 'application/json',
            channelType: packageConfig.channelType,
            channelVersion: packageConfig.channelVersion,
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
                        delete data.errorCode;
                        delete data.errorMessage;
                        reject({ errorCode, errorMsg, ...data});
                    }
                }).catch(() => {
                    reject({ errorCode: CODE_ERROR, errorMsg: CODE_ERROR });
                });
            } else {
                reject({ errorCode: CODE_ERROR, errorMsg: CODE_ERROR });
            }
        }).catch(() => {
            reject({ errorCode: CODE_ERROR, errorMsg: CODE_ERROR });
        });
    });
}

/**
 * edgeimpulseGet
 * @param {*} url 
 * @param {*} params 
 */
const edgeimpulseGet = (url, params, header) => {
    return edgeimpulseRequest(url, params, header, TYPE_GET)
}

/**
 * edgeimpulsePost
 * @param {*} url 
 * @param {*} params 
 */
const edgeimpulsePost = (url, params, header) => {
    return edgeimpulseRequest(url, params, header, TYPE_POST)
}


/**
 * edgeimpulseRequest
 * @param {*} path 
 * @param {*} params 
 * @param {*} reqType 
 */
const edgeimpulseRequest = (path, params, header, reqType) => {
    const edgeimpulseAuthInfoStr = localStorage.getItem('edgeimpulseAuthInfo');
    const edgeimpulseAuthInfo = edgeimpulseAuthInfoStr ? JSON.parse(edgeimpulseAuthInfoStr) : {};
    // 请求参数
    let options = {
        method: reqType,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-jwt-token': edgeimpulseAuthInfo.jwtToken,
            ...header
        },
    }
    // 为post请求设置参数
    // if (reqType === TYPE_POST) {
        if (params) {
            options.body = JSON.stringify(params);
        }
    // }
    //fetch请求
    return new Promise((resolve, reject) => {
        fetch(`${path}`, options).then(resp => {
            const errCode = resp.status;
            if (errCode === CODE_HTTP_OK) {
                resp.json().then((data) => {
                    console.log(data)
                    const success = data.success;
                    if (success) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                }).catch(() => {
                    reject({ errorCode: CODE_ERROR });
                });
            } else {
                reject({ errorCode: CODE_ERROR });
            }
        }).catch(() => {
            reject({ errorCode: CODE_ERROR });
        });
    });
}

const edgeimpulseUpload = (path, params) => {
    // 请求参数
    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'x-file-name': 'test01',
            'x-api-key': 'ei_0bee44dea672ab3a2bbfe9c87ef00a2c454fe8bb189dba1a043b14d9e31697f3'
        },
        body: params,
        encoding: 'binary'
    }
    console.log(options)
    //fetch请求
    return new Promise((resolve, reject) => {
        fetch(`${path}`, options).then(resp => {
            console.log(resp)
            const errCode = resp.status;
            if (errCode === CODE_HTTP_OK) {
                if (resp.ok == 'ok') {
                    resolve(resp);
                } else {
                    reject({ errorCode: CODE_ERROR });
                }
                // resp.json().then((data) => {
                //     console.log(data)
                //     const success = data.success;
                //     if (success) {
                //         resolve(data);
                //     } else {
                //         reject(data);
                //     }
                // }).catch(() => {
                //     reject({ errorCode: CODE_ERROR });
                // });
            } else {
                reject({ errorCode: CODE_ERROR });
            }
        }).catch(() => {
            reject({ errorCode: CODE_ERROR });
        });
    });
}

export {
    get,
    post,
    edgeimpulseGet,
    edgeimpulsePost,
    edgeimpulseUpload,
}

