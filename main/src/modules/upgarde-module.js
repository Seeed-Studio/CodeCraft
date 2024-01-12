import os from 'os';
import process from 'child_process';
import packageJson from '../config/package.json';
import net from '../common/net.js';
import netDownload from '../common/net-download.js';
import { getCCPkgsDir } from '../common/utils';

const UPGARDE_STATUS_IDLE = 0;

const UPGARDE_STATUS_LASTVERSION = 1;
const UPGARDE_STATUS_CONFIRM = 2;
const UPGARDE_STATUS_DOWNLOADING = 3;
const UPGARDE_STATUS_DOWNLOAD_FAIL = 4;
const UPGARDE_STATUS_DOWNLOAD_SUCC = 5;
const UPGARDE_STATUS_INSTALL = 6;
const UPGARDE_STATUS_PAUSE = 7;
const UPGARDE_STATUS_DOWNLOAD_CANCEL = 8;


/**
 * 获取操作系统平台
 * 
 * 'aix'、'darwin'、'freebsd'、'linux'、'openbsd'、'sunos'、'win32'
 * 
 * @param {*} platform  
 */
const getPlatformType = () => {
    const arch = os.arch();
    const platform = os.platform();
    if (platform == 'darwin') {
        return 'MAC';
    } else if (platform == 'win32') {
        if (arch === 'ia32') {
            return 'WIN32'
        } else if (arch === 'x64') {
            return 'WIN64'
        }
    } else if (platform == 'linux') {
        return 'LINUX'
    }
}

//版本更新接口
const URL_CHECK_VERSION = '/ResourceServiceCenter/cctool/QueryCCToolPkgVersion';

class UpgradeModule {

    constructor(window) {
        /**
         * window窗口对象
         */
        this.window = window;

        // 当前更新状态
        this.upgardeStatus = UPGARDE_STATUS_IDLE;
    }

    /**
     * 处理版本更新相关动作
     * @param {*} response 
     */
    onVersionUpgrade({ action, args = {} }) {
        // 检查更新
        if (action == 'check-upgrade') {
            this.handleCheckUpgarde(args)
        }
        // 文件下载
        else if (action == 'pkg-download') {
            this.handlePkgDownload(args)
        }
        // 暂停下载
        else if (action == 'pkg-pause') {
            this.handlePkgPause()
        }
        // 恢复下载
        else if (action == 'pkg-resume') {
            this.handlePkgResume()
        }
        // 安装包取消下载
        else if (action == 'pkg-cancel') {
            this.handleCancelUpgrade()
        }
        // 安装包安装
        else if (action == 'pkg-install') {
            this.handleInstall(args)
        }
    }

    /**
     * 检查更新
     */
    handleCheckUpgarde(args) {
        const params = {
            toolType: 'CCPC2',
            osType: getPlatformType(),
            version: packageJson.version
        }
        net.request_Post(URL_CHECK_VERSION, params).then(
            (data) => {
                // 版本无需升级
                if (data.errorCode !== 0 || data.isNewVersion === 0) {
                    // 显示window
                    this.send('latest-version', {
                        version: packageJson.version,
                        checkUpdateType: args.checkUpdateType
                    });
                    this.upgardeStatus = UPGARDE_STATUS_LASTVERSION;
                } else {
                    this.send('upgrade-version', data);
                    this.upgardeStatus = UPGARDE_STATUS_CONFIRM;
                }
            }, () => {
                console.log('检测版本请求失败.....');
            });
    }

    /**
     * 下载安装
     * @param {*} arg 
     */
    handlePkgDownload(arg) {
        // 触发文件下载
        // 定义安装包路径
        let ccLibrariesDir = getCCPkgsDir();
        netDownload.download(arg.url, arg.fileName, ccLibrariesDir, {
            onSucc: (localpath) => {
                // 发送成功事件
                this.send('download-succ', localpath);
                // 当前更新状态
                this.upgardeStatus = UPGARDE_STATUS_DOWNLOAD_SUCC;
            },
            onProgress: (percent) => {
                // 发送进度事件
                this.send('download-progress', percent);
            },
            onFail: () => {
                // 发送失败事件
                this.send('download-fail');
                // 当前更新状态
                this.upgardeStatus = UPGARDE_STATUS_DOWNLOAD_FAIL;
            },
            onCancel: () => {
                // 发送取消事件
                this.send('download-cancel');
                // 当前更新状态
                this.upgardeStatus = UPGARDE_STATUS_DOWNLOAD_CANCEL;
            }
        });
        // 当前更新状态
        this.upgardeStatus = UPGARDE_STATUS_DOWNLOADING;
    }

    /**
     * hdiutil attach
     * 自动安装
     * @param {*} arg 
     */
    handleInstall(arg) {
        let command = '';
        let type = getPlatformType();
        // window
        if (type === 'WIN32' || type === 'WIN64') {
            command = `start ${arg.localpath}`;
        }
        //mac
        else if (type === 'MAC') {
            command = `open ${arg.localpath}`;
        }
        else if (type === 'LINUX') {
            command = `dpkg -i ${arg.localpath}`;
        }
        console.log('command-----', command);
        // 执行 command命令
        process.exec(command,
            (error, stdout, stderr) => {
                if (!error) {
                    console.log('Install succ');
                    this.send('install-succ');
                    this.upgardeStatus = UPGARDE_STATUS_IDLE;
                    this.window.close(); // 关闭window
                } else {
                    console.log('Install fail');
                    this.send('install-fail');
                    this.upgardeStatus = UPGARDE_STATUS_IDLE;
                }
            });
        // 当前更新状态
        // this.window.close(); // 关闭window
        this.upgardeStatus = UPGARDE_STATUS_INSTALL;
    }


    /**
     * 取消下载
     */
    handleCancelUpgrade() {
        // 下载中状态取消下载
        if (this.upgardeStatus === UPGARDE_STATUS_DOWNLOADING) {
            netDownload.cancelDownload();
            this.upgardeStatus = UPGARDE_STATUS_IDLE;
        }
    }

}

export default UpgradeModule;