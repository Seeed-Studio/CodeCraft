import http from 'http';
import io from 'socket.io';
import { EventEmitter } from 'events';
import bindAll from 'lodash.bindall';
import { checkAndKillTask } from '../utils/tasks-util';

/**
 * socket path
 * 常量值
 */
const MAIN_PATH = '/codecraft/scoketio/main';

/**
 * http port
 */
const HTTP_PORT = 62377;

/**
 * socket io 
 * 配置信息
 */
const SOCKET_CONFIG = {
    path: MAIN_PATH,
    cookie: false,
    serveClient: false,
    pingTimeout: 50 * 1000,
    pingInterval: 50 * 1000,
    maxHttpBufferSize: 10e7 * 50,
    // allowUpgrades: false,
    // transports:	['websocket']
}

/**
 * 获取url参数
 * @param {*} variable 
 */
const getUrlParams = (getUrl = "") => {
    if (getUrl.indexOf('?') != -1) {
        let strarr = getUrl.split('?');
        if (strarr.length > 1) {
            let paramStr = strarr[1];
            let items = paramStr.split('&');
            let data = {};
            if (items && items.length > 0) {
                items.forEach(item => {
                    let itemMap = item.split('=');
                    if (itemMap.length == 2) {
                        data[itemMap[0]] = itemMap[1];
                    }
                })
            }
            return data;
        } else {
            return {};
        }
    } else {
        return {};
    }
}

/**
 * Socket 
 * 通讯核心类
 * 
 * 
 * 
 * events ['error','disconnect','disconnecting',disconnecting','message']
 */
class SocketCore extends EventEmitter {

    /**
     * SocketCore
     * 构造函数
     */
    constructor() {
        super();
        /**
         * 当前处于连接
         * scoket
         */
        this.socket = null;


        /**
         * scoket service
         */
        this.socketService = null;

        /**
         * 绑定回调函数
         */
        bindAll(this, [
            'onConnect',
            'onError',
            'onDisconnect',
            'onDisconnecting',
            'onMessage',
            'onRequest'
        ]);
    }

    /**
     * 启动服务
     */
    startServer() {
        // 检测端口，杀掉进程
        checkAndKillTask().then(() => {
            // 尝试连接次数
            let tryCount = 0;
            // 创建socket服务
            let httpsServer = http.createServer();
            // 设置端口
            httpsServer.listen(HTTP_PORT);
            // 设置http服务 request 处理函数
            httpsServer.on('request', this.onRequest);
            httpsServer.on('error', error => {
                if (tryCount > 3) {
                    console.log("Unable to create service, port occupied ... tryCount : ", tryCount)
                } else {
                    setTimeout(() => {
                        httpsServer.listen(HTTP_PORT); tryCount++;
                    }, 200);
                }
            });
            // 创建io服务
            // 设置connect 监听
            this.socketService = io(httpsServer, SOCKET_CONFIG);
            this.socketService.on('connect', this.onConnect);
        }).catch(err => {
            console.log("Unable to create service, port occupied ... #", err)
        });
    }

    /**
     * 监听客户端
     * 创建连接
     * @param {*} socket 
     */
    onConnect(_socket) {
        console.log('onConnect socketid : ' + _socket.id);
        //如果当前socket已连接
        if (this.isConnected()) {
            _socket.emit('server-connect', { errCode: -1 });
            return;
        }
        // 赋值当前socket
        this.socket = _socket;
        // 设置socket监听
        this.socket.on('error', (error) => {
            this.onError(this.socket, error);
        });
        this.socket.on('disconnect', (reason) => {
            this.onDisconnect(this.socket, reason);
        });
        this.socket.on('disconnecting', (reason) => {
            this.onDisconnecting(this.socket, reason);
        });
        this.socket.on('message', (message) => {
            this.onMessage(this.socket, message);
        });
        this.socket.emit('server-connect', { errCode: 0 });
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    onRequest(req, res) {
        const url = req.url;
        const method = req.method;
        if (method == 'GET') {
            let params = getUrlParams(url);
            this.emit('request', {
                url,
                params
            });
        } else if (method == 'POST') {
            let data = '';
            req.on('data', chunk => { data += chunk });
            req.on('end', () => {
                //对url进行解码（url会对中文进行编码）
                let params = {};
                if (data && data != '') {
                    try {
                        params = JSON.parse(data);
                    } catch (error) {
                        console.log('parse error ... ')
                    }
                }
                this.emit('request', {
                    url,
                    params
                }, res);
            });
        }
    }

    /**
     * 消息接受
     * @param {*} socket 
     * @param {*} message 
     */
    onMessage(socket, message) {
        this.emit('message', message, socket);
    }

    /**
     * 发生异常时
     * 回调
     * @param {*} error 
     */
    onError(socket, error) {
        console.log('OnError  socketid : '
            + socket.id + ' error : '
            + error);
        this.emit('error', error, socket);
    }

    /**
     * 客户端断开时
     * 回调
     * @param {*} socket 
     * @param {*} reason 
     */
    onDisconnect(socket, reason) {
        console.log('OnDisconnect  socketid : '
            + socket.id + ' reason : '
            + reason);
        this.emit('disconnecting', reason, socket);
    }

    /**
     * 客户端正在断开时
     * 回调
     * @param {*} socket 
     * @param {*} reason 
     */
    onDisconnecting(socket, reason) {
        console.log('OnDisconnecting  socketid : '
            + socket.id + ' reason : '
            + reason);
        this.emit('disconnect', reason, socket);
    }

    /**
     * 发送消息
     * @param {*} message 
     */
    send(message) {
        if (this.isConnected()) {
            this.socket.send(message);
        }
    }

    /**
     * 判断当前socket
     * 连接状态
     */
    isConnected() {
        return this.socket ? this.socket.connected : false;
    }

    /**
     * 断开当前
     * socket
     */
    disconnect() {
        if (this.isConnected()) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    /**
     * 停止socket service
     */
    stopService() {
        // 断开当前socket client
        this.disconnect();
        // 关闭服务
        if (this.socketService) {
            this.socketService.close();
            this.socketService = null;
        }
    }

}

export default SocketCore;


