/**
 * 引入electron网络模块
 */
const { net } = require('electron')

/**
 * 成功错误码
 */
const SUCC = 0;

const ERROR_CODE_NOCONTENT = -1;

/**
 * 服务器端口号
 */
const SERVER_PORT = 443;

const TYPE_GET = 'GET';
const TYPE_POST = 'POST';
const PROTOCOL = 'https:';

import env from '../../../env.js'

/**
 * 服务器地址
 */
let SERVER_HOST = '';
if (env == 'prod') {
    SERVER_HOST = 'ide.tinkergen.com';
} else {
    SERVER_HOST = 'cctest2.chmakered.com';
}


class NetProxyMgr {

    constructor() {

        this.context = null;
    }

    inject(context) {
        this.context = context;
    }

    /**
     * get 请求
     * @param {get} path 
     * @param {*} params 
     */
    request_Get(path, params) {
        return this.request(TYPE_GET, path, params);
    }

    /**
     * post 请求
     * @param {get} path 
     * @param {*} params 
     */
    request_Post(path, params) {
        return this.request(TYPE_POST, path, params);
    }

    /**
     * 请求
     * @param {*} reqType get post
     * @param {*} url 请求方法
     * @param {*} params 请求参数
     */
    request(reqType, path, params) {

        return new Promise((resolve, reject) => {
            // 格式化参数数据
            let _params = JSON.stringify(params);
            console.log('params---', params)
            // 拼接get请求下的path路径
            if (reqType === TYPE_GET) {
                path = `${path}?${_params}`;
            }
            // 请求参数
            let options = {
                hostname: SERVER_HOST,
                port: SERVER_PORT,
                path: path,
                method: reqType,
                protocol: PROTOCOL
            };

            // 捕获异常
            try {
                // 获取请求对象
                let clientReq = net.request(options);
                // 设置header
                clientReq.setHeader('Content-Type', 'application/json');
                // 注册响应回调
                clientReq.on('response', (response) => {
                    // console.log(`STATUS: ${response.statusCode}`)
                    // console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
                    response.on('data', (chunk) => {
                        console.log(`BODY: ${chunk}`);
                        let content = chunk && chunk.toString();
                        let contentJson = JSON.parse(content);
                        console.log('contentJson', contentJson)
                        // 请求成功
                        if (contentJson
                            && contentJson.errorCode === SUCC) {
                            contentJson.versionNo = params.version;
                            resolve(contentJson);
                        } else {
                            if (!contentJson) {
                                reject(ERROR_CODE_NOCONTENT);
                            } else {
                                let code = contentJson.errorCode, message = contentJson.errorMessage;
                                reject(code, message);
                            }
                        }
                    });
                    response.on('error', (error) => {
                        reject();
                    });
                })
                // 检测网络请求失败
                clientReq.on('error', (error) => {
                    reject(error);
                });
                // 如果post方式，提交数据到body
                // write data to request body  
                if (reqType === TYPE_POST) {
                    clientReq.write(_params);
                }
                // 请求结束
                clientReq.end();
            } catch (error) {
                reject();
            }
        })
    }

}

export default new NetProxyMgr();
