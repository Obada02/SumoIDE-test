const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    openFile: () => ipcRenderer.invoke('open-file'),
    saveFile: (data) => ipcRenderer.invoke('save-file', data),
});