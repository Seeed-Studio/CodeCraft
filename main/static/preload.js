const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electron", {
    send: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    on: (channel, callback) => {
        ipcRenderer.on(channel, (event, args) => {
            if (callback) {
                callback(args)
            }
        });
    },
    sendSync:(channel, data) => {
        return ipcRenderer.sendSync(channel, data);
    },
});