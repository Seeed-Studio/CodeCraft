
// import { ipcMain } from 'electron';
import path from 'path';
const fs = require("fs");

/**
 * 复制文件
 * @param {*} respath 
 */
const copyFile = (srcpath, dstpath) => {
    return new Promise((resolve, reject) => {
        // 创建读取流
        let readable = fs.createReadStream(srcpath);
        // 创建写入流
        let writable = fs.createWriteStream(dstpath);
        // 通过管道来传输流
        readable.pipe(writable);
        writable.on('finish', () => {
            setTimeout(resolve, 500);
        });
        writable.on('error', () => {
            reject()
        });
    })
}

/**
 * 删除文件
 * 注：暂不关注删除结果
 * @param {*} respath 
 */
const deleteFile = (respath) => {
    return new Promise(resolve => {
        fs.unlink(respath, resolve);
    })
}

class NetDownload {

    constructor() {
        /**
         * 应用程序上下文
         */
        this.context = null;
        /**
         * 下载api
         */
        this.webContents = null;
        /** 
         * 下载项
         */
        this.downloadItem = null;
        /**
         * 下载回调
         */
        this.resCallbacks = {};

        this.lastTotalBytes = 0;
    }

    /**
     * 初始化
     * @param {*} contents 
     */
    inject(context) {
        this.context = context;
        this.webContents = context.webContents;
        // ipcMain.on('net-status-changed', (event, status) => this.handleNetStatusChanged(status));
    }

    /**
     * 网络状态监听
     * @param {*} status 
     */
    // handleNetStatusChanged(status) {
    //     // 如果网络断开就取消所有下载项；
    //     if (!status) {
    //         // 取消当前下载项
    //         // 出发下载失败
    //         if (this.downloadItem) {
    //             const url = this.downloadItem.getURL();
    //             if(this.resCallbacks[url]){
    //                this.resCallbacks[url].onFail();
    //             }
    //             this.lastTotalBytes = 0;
    //             this.downloadItem.cancel();
    //             delete this.resCallbacks[url];
    //         }
    //     }
    // }

    /**
     * 下载
     * @param {*} url 
     * @param {*} packagedir 
     * @param {*} responseCallback 
     */
    download(url, fileName, packagedir, responseCallback) {
        //url判断
        if (!url
            || url.lastIndexOf(url) === -1) {
            return;
        }
        //是否正在下载
        if (this.resCallbacks[url]) {
            return;
        }
        // 捕获下载异常
        try {
            //触发下载
            this.webContents.downloadURL(url);
            //注册开始下载事件，触发下载
            this.webContents.session.once('will-download', (event, item, webContents) => {
                this.downloadItem = item;
                // will-download log 输出
                console.log('will-download ----');
                console.log('will-download  url : ' + url);
                let initialReceived = item.getReceivedBytes();
                let initialTotal = item.getTotalBytes();
                console.log(`will-download received : ${initialReceived}`);
                console.log(`will-download total : ${initialTotal}`);
                // 保存当前回调
                if (!this.resCallbacks[url]) {
                    this.resCallbacks[url] = responseCallback;
                }
                //获取后缀名
                let postfix = fileName.substring(fileName.lastIndexOf("."));
                let name = fileName.substring(0, fileName.lastIndexOf("."));
                let mills = new Date().getTime();
                //声明文件路径
                let filepath = path.join(packagedir, `${name}_${mills}${postfix}`);
                let timestamp = new Date().getTime();
                let tempFilePath = path.join(packagedir, `tempfile_${timestamp}`);
                //设置文件路径
                item.setSavePath(tempFilePath);
                // 设置下载监听
                item.on('updated', (event, state) => {
                    // updated log 输出
                    console.log(`updated : ${state}`);
                    // 下载中更新进度
                    if (state === 'progressing'
                        && !item.isPaused()) {
                        let received = item.getReceivedBytes();
                        let total = item.getTotalBytes();
                        if (total === 0) {
                            this.resCallbacks[url].onProgress(0);
                        } else {
                            this.resCallbacks[url].onProgress(parseInt(received / total * 100));
                        }
                    }
                    // 下载中断
                    else {
                        if (this.resCallbacks[url]) {
                            this.resCallbacks[url].onFail();
                            this.lastTotalBytes = 0;
                            delete this.resCallbacks[url];
                            this.downloadItem = null;
                        }
                    }
                });
                //设置下载完成监听
                item.on('done', (event, state) => {
                    if (!this.resCallbacks[url]) {
                        return;
                    }
                    // done log 输出
                    console.log(`done : ${state}`);
                    // 获取接受到字节数和总共的字节数
                    let received = item.getReceivedBytes();
                    let total = this.lastTotalBytes;
                    console.log(`done received : ${received}`);
                    console.log(`done total : ${total}`);
                    //下载完成
                    if (state === 'completed'
                        && received === total) {
                        //获取临时文件保存目录
                        let savePath = item.getSavePath();
                        //文件下载完成，复制临时文件生成实际文件
                        copyFile(savePath, filepath).then(() => {
                            //删除临时文件
                            deleteFile(savePath).then(() => {
                                //下载成功，返回路径
                                this.resCallbacks[url].onSucc(filepath);
                                this.lastTotalBytes = 0;
                                delete this.resCallbacks[url];
                                this.downloadItem = null;
                            });
                        }).catch(() => {
                            this.resCallbacks[url].onFail();
                            this.lastTotalBytes = 0;
                            delete this.resCallbacks[url];
                            this.downloadItem = null;
                        });
                    } else {
                        this.resCallbacks[url].onFail();
                        this.lastTotalBytes = 0;
                        delete this.resCallbacks[url];
                        this.downloadItem = null;
                    }
                });
                // 赋值文件总字节数
                this.lastTotalBytes = initialTotal;
            });
        } catch (error) {
            if (responseCallback) {
                responseCallback.onFail();
                this.lastTotalBytes = 0;
            }
            if (this.downloadItem) {
                this.downloadItem = null
            }
        }
    }

    /**
     * 取消下载
     */
    cancelDownload() {
        if (this.downloadItem) {
            try {
                this.downloadItem.cancel();
            } catch (error) { }
            this.downloadItem = null;
        }
    }

    /**
     * 暂停下载
     */
    pauseDownload() {
        if (this.downloadItem) {
            try {
                this.downloadItem.pause();
            } catch (error) { }
        }
    }

    /**
     * 恢复下载
     */
    resumeDownload() {
        if (this.downloadItem) {
            try {
                this.downloadItem.resume();
            } catch (error) { }
        }
    }

    /**
     * 释放下载资源
     */
    release() {
        this.cancelDownload();
        this.resCallbacks = {};
        this.lastTotalBytes = 0;
    }

}

export default new NetDownload();