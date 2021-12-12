import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  screen
} from 'electron'
import { exec } from 'child_process'
import fsPromises from 'fs/promises'
import path from 'path'
import { DisplayAndBounds, DisplayShot } from 'packages/typings/bridge'
import channels from '../preload/channels'

const isDevelopment = process.env.NODE_ENV === 'development'

export const getDisplayShots: () => Promise<DisplayShot[]> = () => new Promise((resolve, reject) => {
  const binPath = path.resolve(__dirname, `./bin/screenshot-${process.platform}`)
  const tmpPath = path.resolve(__dirname, './bin/tmp')
  fsPromises.stat(binPath).then(() => {
    exec(`${binPath}`, async (err, stdout, stderr) => {
      if (err || stderr) reject(err || stderr)
      console.log(stdout)
      const result: DisplayShot[] = []
      const fileNames = await fsPromises.readdir(tmpPath)
      for await (const name of fileNames) {
        const data = await fsPromises.readFile(path.resolve(tmpPath, name))
        result.push({ name, data })
      }
      resolve(result)
    })
  }).catch((err) => {
    console.error(err)
    console.error(`${process.platform} is not supported`)
  })
})

export const getDisplayAndBounds: () => Promise<DisplayAndBounds[]> = () => new Promise((resolve, reject) => {
  const displays = screen.getAllDisplays()
  if (displays && displays.length) {
    resolve(displays.map((disp, index) => ({ index, id: disp.id, bounds: disp.bounds })))
  } else {
    reject(new Error('could not find displays'))
  }
})

export const setBackgroundWindow = (options: BrowserWindowConstructorOptions) => new BrowserWindow({
  transparent: true,
  fullscreen: true,
  simpleFullscreen: true,
  focusable: true,
  alwaysOnTop: !isDevelopment,
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
    getDisplayShots(),
    getDisplayAndBounds()
  ]).then(([displayShots, displayAndBounds]) => {
    if (displayShots.length !== displayAndBounds.length) {
      reject(new Error('the numbers of display and screenshot does not match'))
    }
    const wins: BrowserWindow[] = []
    for (const dispBounds of displayAndBounds) {
      console.log(dispBounds.bounds)
      const win = setBackgroundWindow({ ...dispBounds.bounds })
      const shot = displayShots.find(
        s => s.name === `${dispBounds.index}_${dispBounds.bounds.width}x${dispBounds.bounds.height}.png`
      )
      if (isDevelopment) {
        win.webContents.loadURL('http://127.0.0.1:5000')
        win.webContents.openDevTools()
      }
      win.webContents.send(
        channels.ECAP_INITIALIZED,
        {
          ...shot,
          ...dispBounds
        }
      )
      win.on('ready-to-show', () => {
        win.show()
      })
      wins.push(win)
    }
    resolve(wins)
  })
})
