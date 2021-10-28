import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import { IElectronAPI } from 'packages/typings/renderer'

contextBridge.exposeInMainWorld('electronAPI', {
  ecapInitialized: new Promise((resolve) => {
    ipcRenderer.on('ECAP::INITIALIZED', (e: IpcRendererEvent, data: string) => {
      resolve(data)
    })
  })
} as IElectronAPI)
