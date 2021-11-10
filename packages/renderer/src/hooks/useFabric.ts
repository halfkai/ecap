import { useState } from 'react'

import { BaseCanvasPropsType } from '../types'

// TODO: es6 import fabric doesn't supportted in vite
// const fabric = require('fabric').fabric

const useFabric = (props?: BaseCanvasPropsType) => {
  const [fabric, setFabric] = useState()
  if (props?.id && props?.useFabric) {
    // setFabric(new fabric.Canvas({
    // }))
  }
}

export default useFabric
