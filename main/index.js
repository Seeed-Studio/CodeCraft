import {
    onAppReady,
    onResume,
    onWindowAllClosed,
    onBeforeQuit,
    onWillQuit,
    onQuit,
    onBrowserWindowBlur,
    onBrowserWindowFocus
} from './src/application';

import { app } from 'electron';
import path from 'path';

import { injectStorage } from './src/common/local-storage';

import { ProgId, ShellOption, Regedit } from 'electron-regedit';

const inject = () => {
    // app icon
    let icoImage = path.join($dirname, '../../static/logo.ico');

    // ... uninstall cc-assistant regedit
    let assiCC = new ProgId({
        appName: "CodecraftAssistant",
        description: 'cc-assistant',
        icon: icoImage,
        extensions: ['cdc'],
        shell: [
            new ShellOption({ verb: ShellOption.OPEN }),
            new ShellOption({ verb: ShellOption.EDIT, args: ['--edit'] }),
            new ShellOption({ verb: ShellOption.PRINT, args: ['--print'] })
        ]
    });
    assiCC.uninstall();
    // ... instantiate your ProgIds
    let ccPC = new ProgId({
        description: 'Codecraft',
        icon: icoImage,
        extensions: ['cdc'],
        shell: [
            new ShellOption({ verb: ShellOption.OPEN }),
            new ShellOption({ verb: ShellOption.EDIT, args: ['--edit'] }),
            new ShellOption({ verb: ShellOption.PRINT, args: ['--print'] })
        ]
    });
    ccPC.install();
    const lock = app.requestSingleInstanceLock()
    //... the rest of your application code
    //防止创建多个对象
    if (!lock) {
        //二次启动，执行onResume
        app.exit();
    } else {
        //Chrome浏览器和Electron支持的命令行开关
        app.commandLine.appendSwitch('ignore-gpu-blacklist');
        //注册app生命周期事件函数
        app.on('ready', (launchInfo) => {
            injectStorage();
            onAppReady(launchInfo)
        });
        app.on('window-all-closed', onWindowAllClosed);
        app.on('before-quit', onBeforeQuit);
        app.on('will-quit', onWillQuit);
        app.on('quit', onQuit);
        app.on('browser-window-blur', onBrowserWindowBlur);
        app.on('browser-window-focus', onBrowserWindowFocus);
    }
}
//应用入口
inject();

