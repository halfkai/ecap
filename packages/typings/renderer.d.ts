export interface IElectronAPI {
  ecapInitialized: Promise<string>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
