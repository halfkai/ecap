import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { DisplayShotAndBounds } from 'packages/typings/bridge'
import { IElectronAPI } from 'packages/typings/electron-api'
import channels from './channels'

contextBridge.exposeInMainWorld('electronAPI', {
  ecapInitialized: new Promise((resolve) => {
    ipcRenderer.once(channels.ECAP_INITIALIZED, (e: IpcRendererEvent, data: DisplayShotAndBounds) => {
      resolve(data)
    })
  })
} as IElectronAPI)
