// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

app.commandLine.appendSwitch('enable-features', 'ElectronSerialChooser')

async function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableBlinkFeatures: 'Serial',
      nodeIntegration: true
    }
  })



  // and load the index.html of the app.
  await mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()


  mainWindow.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {
    event.preventDefault()
    if (portList && portList.length > 0) {
      callback(portList[0].portId)
    } else {
      callback('') //Could not find any matching devices
    }
  })

  // mainWindow.webContents.session.on('serial-port-added', (event, port) => {
  //   console.log('serial-port-added FIRED WITH', port)
  // })

  // mainWindow.webContents.session.on('serial-port-removed', (event, port) => {
  //   console.log('serial-port-removed FIRED WITH', port)
  // })

  // mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
  //   if (permission === 'serial' && details.securityOrigin === 'file:///') {
  //     return true
  //   }
  // })

  // mainWindow.webContents.session.setDevicePermissionHandler((details) => {
  //   if (details.deviceType === 'serial' && details.origin === 'file://') {
  //     return true
  //   }
  // })

  // Open Serial Port without user gesture.
  // Reference: https://github.com/electron/electron/issues/27625
  const portSelected = await mainWindow.webContents.executeJavaScript(
    `navigator.serial.requestPort().then(port => port.toString()).catch(err => err.toString());`, true)
  mainWindow.webContents.executeJavaScript(`beginSerial();`);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
