const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
let win;

function isDev() {
    return process.mainModule.filename.indexOf('app.asar') === -1;
}

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname,'assets/favicon.png' )
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../dist/project-tracker/index.html'),
        protocol: 'file',
        slashes: true
    }));
    win.on('closed', () => {
        win = null;
    })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})