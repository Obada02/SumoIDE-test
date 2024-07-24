const { app, BrowserWindow, ipcMain, dialog,Menu, MenuItem } = require('electron');
const path = require('path');
const fs = require('fs');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  win.loadFile('index.html');

  // Right-click context menu
  const contextMenu = new Menu();
  contextMenu.append(new MenuItem({
    label: 'Toggle Developer Tools',
    click: () => win.webContents.toggleDevTools()
  }));

  win.webContents.on('context-menu', (e, params) => {
    contextMenu.popup(win, params.x, params.y);
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('open-file', async () => {
  const { filePaths } = await dialog.showOpenDialog({ properties: ['openFile'] });
  if (filePaths.length > 0) {
    const fileContent = fs.readFileSync(filePaths[0], 'utf-8');
    return { content: fileContent, path: filePaths[0] };
  }
  return { content: '', path: '' };
});

ipcMain.handle('save-file', async (event, { path, content }) => {
  fs.writeFileSync(path, content, 'utf-8');
});
