import { app, ipcMain } from 'electron'
import { init } from './ecap'
import channels from '../preload/channels'

// const isDevelopment = process.env.NODE_ENV === 'development'

app.whenReady().then(() => {
  init()
  ipcMain.on(channels.ECAP_FINISHED, () => {
    // app.quit()
  })
})
