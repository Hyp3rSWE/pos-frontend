const { contextBridge, ipcRenderer } = require("electron");
const {PosPrinter} = require('electron').remote.require("electron-pos-printer");


contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    }
});
