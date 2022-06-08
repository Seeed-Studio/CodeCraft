
import net from './common/net';
import netDownload from './common/net-download';
import appConfig from './common/store';
import { injectImageCache } from './common/image-cache';
import { initCCLibrariesDir } from './common/utils';
import { exec } from 'child_process';
import path from 'path';
import url from 'url';
import { Menu, Tray, BrowserWindow, ipcMain, app, nativeImage } from 'electron';
import os from 'os';
import fs from 'fs';
import AutoLaunch from 'auto-launch';
import SocketIOService from './service/socketio-service';
import UpgradeModule from './modules/upgarde-module'
import ProjectSaveModule from './modules/projectSave-module'
import WindowModule from './modules/window-module'
import packageJson from './config/package.json'
import localMenuMessages from './l10n/message';

const menuMessages = {
  version: "app.menu.version",
  startUp: "app.menu.startUp",
  checkVersion: "app.menu.checkVersion",
  exit: "app.menu.exit",
}

const osType = os.platform()
// 定义驱动目录
const DRIVERS_DIR = path.join($dirname, '../../drivers/');

// 自启动对象 兼容Mac Win Linux 
let autoLaunch = new AutoLaunch({
  name: packageJson.productName
});

// 窗口对象
var window = null;
// 生命socket服务
var socketService = null;
var upgradeModule = null;
var projectSaveModule = null;
var windowModule = null;
// 默认语言为中文
var local = 'zh-cn';

//初始化cc 库目录
initCCLibrariesDir();

// 安装驱动
const installDrivers = () => {
  console.log('installDrive ................ ')
  // g0驱动路径
  const g0DriverPath = path.join(DRIVERS_DIR, './main-board-ble/');
  let cmd = '';
  if (os.platform() === 'darwin') {
    cmd = `cd ${g0DriverPath}/mac && open Driver.pkg`;
  } else {
    cmd = `cd ${g0DriverPath} && install.bat`;
  }
  // 触发安装g0驱动， 暂不关注成功失败
  exec(cmd, (error) => {
    console.log('installDrivers ', error);
  });
}

// 注册开机启动事件
const regeditStartUp = () => {
  autoLaunch.isEnabled().then(isEnabled => {
    if (isEnabled) return;
    autoLaunch.enable();
    appConfig.setValue('isStartUp', true);
  });
}

// 反注册开机启动事件
const unRegeditStartUp = () => {
  autoLaunch.isEnabled().then(isEnabled => {
    if (!isEnabled) return;
    autoLaunch.disable();
    appConfig.setValue('isStartUp', false);
  });
}

/**
 * 事件: 'ready'
 * 当 Electron 完成初始化时被触发。 
 * 在 macOS 中, 如果从通知中心中启
 * 动，那么 launchInfo 中的 userInfo
 *  包含用来打开应用程序的 NSUserNotification 
 * 信息。 你可以通过调用 app.isReady() 方法来
 * 检查此事件是否已触发。
 * @param {*} launchInfo 
 */
const onAppReady = (launchInfo) => {
  const appLocal = app.getLocale();
  if (appLocal && appLocal.toLocaleLowerCase().startsWith("zh")) {
    local = "zh-cn";
  }
  else if (appLocal && appLocal.toLocaleLowerCase().startsWith("cs")) {
    local = "cs";
  }
  else {
    local = "en";
  }

  const messages = localMenuMessages[local];

  console.log('app language : ' + local);

  // 判断是否开机启动
  const isStartUp = appConfig.getValue('isStartUp',false);
  if (isStartUp) {
    regeditStartUp();
  } else {
    unRegeditStartUp();
  }
  // 判断是否首次启动
  const isFirstStart = appConfig.getValue('isFirstStart', true);
  console.log('isFirstStart : ' + isFirstStart);
  if (isFirstStart) {
    installDrivers();
    appConfig.setValue('isFirstStart', false);
    console.log('isFirstStart : ' + appConfig.getValue('isFirstStart', true));
  }

  // xcode-select --install
  if(os.platform() === 'darwin') {
    exec('xcode-select --install');
  }

  // 注册app退出事件
  // ipcMain.on('app-exit', () => app.exit());
  ipcMain.on('get-applocal', event => event.returnValue = local);

  //创建托盘程序右键菜单
  //定义托盘菜单
  const trayMenus = [
    {
      label: `${messages[menuMessages.version]}${packageJson.version}`
    },
    {
      label: `${messages[menuMessages.checkVersion]}`,
      click: function () {
        if (upgradeModule) upgradeModule.handleCheckUpgarde({ checkUpdateType: 'handle' });
      },
    },
    {
      label: `${messages[menuMessages.startUp]}`,
      type: 'checkbox',
      checked: isStartUp,
      click: function (menu) {
        if (menu.checked) {
          //打开
          regeditStartUp();
        } else {
          //关闭
          unRegeditStartUp();
        }
      }
    },
    {
      label: `${messages[menuMessages.exit]}`,
      click: function () {
        if (socketService) {
          socketService.sendMessage({
            method: 'before-quit',
          });
        }
      }
    }
  ];
  //系统托盘图标文件路径
  let trayIconPath = path.join($dirname, '../../static/logo.ico');
  if (osType === 'darwin') {
    trayIconPath = path.join($dirname, '../../static/mac-tray-icon.png');
    let trayIconBuffer = fs.readFileSync(trayIconPath);
    trayIconPath = nativeImage.createFromBuffer(
      trayIconBuffer,
      {
        scaleFactor: 2.2
      }
    );
  } else {
    trayIconPath = path.join($dirname, '../../static/logo.ico');
  }
  //定义托盘对象
  const appTray = new Tray(trayIconPath);
  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenus);
  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
  //注册appTray点击事件
  appTray.on('click', () => {
    if (window &&
      window.isVisible() &&
      window.isMinimized()) {
      window.restore();
    }
  });

  // 实例化window
  window = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    title: packageJson.productName,
    webPreferences: { webSecurity: false },
  });
  window.maximize();

  //window监听
  // window.on('show', () => appTray.setHighlightMode('selection'))
  // window.on('hide', () => appTray.setHighlightMode('never'));
  window.once('ready-to-show', () => window.show());

  /**-------------页面加载------------**/
  //URL地址
  const loadURL = url.format({
    pathname: path.join($dirname, '../gui/index.html'),
    slashes: true,
    protocol: 'file:'
  })
  // window.loadURL('http://localhost:8601');
  // window.webContents.openDevTools();
  window.loadURL(loadURL);
  /**-------------页面加载------------**/
  //初始化图片缓存
  injectImageCache();
  //初始化公共组件
  net.inject(window);
  netDownload.inject(window);
  //初始化SocketIO服务
  socketService = new SocketIOService();
  socketService.startServer();
  //初始化更新模块
  //初始化 upgradeModule 的 send 方法
  upgradeModule = new UpgradeModule(window);
  upgradeModule.send = (action, response) => {
    socketService.sendMessage({
      method: 'versionupgrade',
      data: {
        action,
        actionData: response
      }
    });
  }
  //为服务添加版本更新管理对象
  socketService.attachVersionUpgradeMgr(upgradeModule);
  // 文件保存到本地
  projectSaveModule = new ProjectSaveModule(window);
  projectSaveModule.send = (action, response) => {
    socketService.sendMessage({
      method: 'projectSave',
      data: {
        action,
        actionData: response
      }
    });
  }
  socketService.attachProjectSaveMgr(projectSaveModule);

  // 窗口关闭
  windowModule = new WindowModule(window);
  windowModule.send = (action, response) => {
    if (action === 'close') {
      app.exit();
      return
    }
  }
  socketService.attachWindowMgr(windowModule);


  //监听窗口关闭事件
  window.on('close', (event) => {
    // 判断socket是否连接，未连接直接退出
    if (socketService.socketCore.socket) {
      socketService.sendMessage({
        method: 'before-quit',
      });
      window.focus();
      event.preventDefault();
    } else {
      app.exit();
    }
  });
};

/**
 * 应用程序二次
 * 启动时触发
 */
const onResume = () => {
  console.log('onResume --------- ');
}

/**
 * 当所有的窗口都被关闭时触发。
 * 如果你没有监听此事件并且所有窗口都关闭了，
 * 默认的行为是控制退出程序；但如果你监听了
 * 此事件，你可以控制是否退出程序。 如果用户
 * 按下了 Cmd + Q，或者开发者调用了 app.quit()，
 * Electron 会首先关闭所有的窗口然后触发 will-quit 事件，
 * 在这种情况下 window-all-closed 事件不会被触发。
 */
const onWindowAllClosed = () => {
  console.log('onWindowAllClosed ---------');
}

/**
 * 在应用程序开始关闭窗口之前触发。 
 * 调用 event.preventDefault() 会阻
 * 止默认的行为。默认的行为是终结应用程序。
 * @param {*} event 
 */
const onBeforeQuit = (event) => {
  console.log('onBeforeQuit ---------');

}

/**
 * 当所有窗口都已关闭并且应用程序将退出
 * 时发出。调用 event. preventDefault () 
 * 将阻止终止应用程序的默认行为。
 * @param {*} event 
 */
const onWillQuit = (event) => {
  console.log('onWillQuit ---------');
}

/**
 * 在应用程序退出时发出
 * @param {*} event 
 * @param {*} exitCode 
 */
const onQuit = (event, exitCode) => {
  console.log('onQuit --------- exitCode : ' + exitCode);
  // 释放下载任务资源
  if (netDownload) {
      netDownload.release();   
  }
  // 释放socket service资源
  if (socketService) {
    socketService.stopServer();
    socketService = null;
  }
}

/**
 * 在 browserWindow 获得焦点时发出。
 * @param {*} event 
 * @param {*} window 
 */
const onBrowserWindowFocus = (event, window) => {
  console.log('onBrowserWindowFocus --------- ');

}

/**
 * 在 browserWindow 失去焦点时发出。
 * @param {*} event 
 * @param {*} window 
 */
const onBrowserWindowBlur = (event, window) => {
  console.log('onBrowserWindowBlur --------- ');
}

// 导出Application生
// 命周期函数
export {
  onAppReady,
  onResume,
  onWindowAllClosed,
  onBeforeQuit,
  onWillQuit,
  onQuit,
  onBrowserWindowBlur,
  onBrowserWindowFocus
}