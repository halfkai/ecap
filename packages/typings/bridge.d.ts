import { Rectangle } from 'electron'

export interface DisplayShot {
  name: string
  data: Buffer
}

export interface DisplayAndBounds {
  index: number
  id: number
  bounds: Rectangle
}

export type DisplayShotAndBounds = DisplayShot & DisplayAndBounds
