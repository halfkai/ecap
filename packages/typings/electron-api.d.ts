import { DisplayShotAndBounds } from './bridge'

export interface IElectronAPI {
  ecapInitialized: Promise<DisplayShotAndBounds>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
