import { DisplayShotAndBounds } from './bridge'

export interface IElectronAPI {
  ecapInitialized: Promise<DisplayShotAndBounds>
  ecapFinished: () => void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
