import { app } from 'electron'
import { init } from './ecap'

// const isDevelopment = process.env.NODE_ENV === 'development'

app.whenReady().then(() => {
  init()
})
