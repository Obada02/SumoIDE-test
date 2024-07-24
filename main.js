const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
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
