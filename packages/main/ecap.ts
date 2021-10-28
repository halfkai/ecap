import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  desktopCapturer,
  Display,
  NativeImage,
  screen
} from 'electron'
import path from 'path'

interface DisplayShot {
  displayId: string
  shot: NativeImage
}

const isDevelopment = process.env.NODE_ENV === 'development'

export const getDisplayShot: () => Promise<DisplayShot[]> = () => new Promise((resolve, reject) => {
  desktopCapturer.getSources({
    types: ['screen'], // TODO: type 'window', build region selection
    thumbnailSize: { width: 7680, height: 4320 } // set resolution to 8K, if higher may cause storage breakdown
  }).then((sources) => {
    const filtered = sources.filter(s => s.display_id)
    if (filtered && filtered.length) {
      resolve(filtered.map(s => ({ displayId: s.display_id, shot: s.thumbnail })))
    } else {
      reject(new Error('could not match shot'))
    }
  })
})

export const getDisplays: () => Promise<Display[]> = () => new Promise((resolve, reject) => {
  const displays = screen.getAllDisplays().filter(({ id }) => id)
  if (displays && displays.length) {
    resolve(displays)
  } else {
    reject(new Error('could not find displays'))
  }
})

export const setBackgroundWindow = (options: BrowserWindowConstructorOptions) => new BrowserWindow({
  transparent: true,
  fullscreen: false,
  simpleFullscreen: true,
  focusable: true,
  alwaysOnTop: true,
  movable: false,
  useContentSize: true,
  enableLargerThanScreen: true,
  show: false,
  backgroundColor: '#00000000', // setup transparent window
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.resolve(__dirname, '../preload/index')
  },
  ...options
})

export const init = () => new Promise((resolve, reject) => {
  Promise.all([
    getDisplayShot(),
    getDisplays()
  ]).then(([displayShot, displays]) => {
    if (displayShot.length !== displays.length) {
      reject(new Error('the numbers of display and screenshot does not match'))
    }
    const wins = []
    for (const disp of displays) {
      console.log(disp.bounds)
      const win = setBackgroundWindow({ ...disp.bounds })
      const shot = displayShot.find(s => disp.id.toString() === s.displayId)?.shot
      win.webContents.loadURL('http://127.0.0.1:5000')
      win.webContents.send(
        'ECAP::INITIALIZED',
        shot?.resize({ width: disp.bounds.width, height: disp.bounds.height })
          .toDataURL({ scaleFactor: disp.scaleFactor }))
      win.on('ready-to-show', () => {
        win.show()
      })
      if (isDevelopment) {
        win.webContents.openDevTools()
      }
      wins.push(win)
    }
    resolve(wins)
  })
})
