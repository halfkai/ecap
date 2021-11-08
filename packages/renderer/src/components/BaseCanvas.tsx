import { CanvasHTMLAttributes, useEffect, useRef, useState } from 'react'

const BaseCanvas = (props?: CanvasHTMLAttributes<HTMLCanvasElement>) => {
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

  return <canvas ref={ canvasRef } {...props}></canvas>
}

export default BaseCanvas
