const { app, BrowserWindow, webContents, screen } = require('electron')

function createWindow () {
  let windowNumber = 4

  app.whenReady().then(() => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    for (let i=0; i<windowNumber; i++) {
      let windowWidth = width / windowNumber
      let windowTitle = `Janela ${(i+1)}`

      const win = new BrowserWindow({
        title: windowTitle,
        width: windowWidth,
        height: height,
        show: false,
        y: 0,
        x: windowWidth * i,
        backgroundColor: randomColor(),
        webPreferences: {
          nodeIntegration: true
        }
      })
    
      win.loadFile('index.html')
    
      win.once("ready-to-show", () => {
        win.show()
      })

      win.webContents.on('console-message', (e, lvl, message, line) => {
        console.log(`[Mensagem]: ${message} emitida por ${windowTitle}`)
      });

      win.on('close', () => {
        app.quit();
      })
    }
  })

}

function randomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('browser-window-blur', (e, window) => {
  console.log(`A janela ${window.getTitle()} recebeu foco`);
})



