import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

const useCanvas = (customRef?: RefObject<HTMLCanvasElement>): [HTMLCanvasElement | undefined, () => JSX.Element] => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current)
    }
  }, [canvasRef])

  const renderer = () => (
    <canvas ref={customRef || canvasRef}></canvas>
  )

  const setCanvasRenderer = useCallback(
    () => renderer(),
    [customRef]
  )

  return [canvas, setCanvasRenderer]
}

export default useCanvas
