import { useEffect, useRef, useState } from 'react'
import useFabric from '../hooks/useFabric'
import { BaseCanvasPropsType } from '../types'

const BaseCanvas = (props?: BaseCanvasPropsType) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCanvas(canvasRef.current)
    }
    return () => {
      setCanvas(undefined)
    }
  }, [canvasRef])

  useFabric(props)

  return {
    canvas,
    setCanvas: () => <canvas ref={ canvasRef } {...props}></canvas>
  }
}

export default BaseCanvas
