import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl'
import PropTypes from 'prop-types'
import { BaseCanvasPropsType } from '../types'

const BaseCanvas = (props: BaseCanvasPropsType) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()
  const [f, setF] = useState<Canvas>()
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setCanvas(canvasRef.current)
      if (props.useFabric) {
        if (typeof props.width === 'number' && typeof props.height === 'number') {
          setF(new fabric.Canvas(props.id, {
            width: props.width,
            height: props.height
          }))
        }
      }
    }
    return () => {
      setCanvas(undefined)
    }
  }, [
    canvasRef,
    props.id,
    props.useFabric,
    props.width,
    props.height
  ])

  return {
    canvas,
    renderer: (
      <canvas
        ref={ canvasRef }
        id={props.id}
        width={props.width}
        height={props.height}>
      </canvas>
    ),
    f,
    setF
  }
}

BaseCanvas.propTypes = {
  id: PropTypes.string,
  width: PropTypes.number || PropTypes.string,
  height: PropTypes.number || PropTypes.string,
  useFabric: PropTypes.bool
}

export default BaseCanvas
