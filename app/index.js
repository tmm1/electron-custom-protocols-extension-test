const path = require('path')
const { app, BrowserWindow, protocol, session } = require('electron')

const scheme = 'example'

protocol.registerSchemesAsPrivileged([
  {
    scheme,
    privileges: {
      standard: true,
      secure: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      bypassCSP: false,
      corsEnabled: true,
      stream: true
    }
  }
])

app.whenReady().then(async () => {
  const ses = session.defaultSession

  console.log(ses.protocol)

  ses.protocol.registerStringProtocol(scheme, ({ url }, callback) => {
    callback(url)
  })

  const ext = await ses.loadExtension(path.join(__dirname, '../extension'), { allowFileAccess: true })

  console.log(ext)

  const win = new BrowserWindow()

  win.loadURL(`${scheme}://example/hello/world.txt`)

  //const win2 = new BrowserWindow()

  //win2.loadURL('https://example.com/')

  win.webContents.openDevTools()

  //win2.webContents.openDevTools()
})
