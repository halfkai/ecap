import { fabric } from 'fabric'

interface PropType {
  id: string
  width: string
  height: string
  useFabric?: boolean
}

export let fabricCanvas

export const BaseCanvas = (prop: PropType = {
  id: 'baseCanvas',
  width: '100vw',
  height: '100vh',
  useFabric: true
}) => {
  fabricCanvas = prop.useFabric ? new fabric.Canvas(prop.id) : undefined
  if (fabricCanvas) {
    fabricCanvas.setHeight(parseInt(prop.height, 10))
    fabricCanvas.setWidth(parseInt(prop.width, 10))
  }
  return (
    <canvas
      id={prop.id}
      width={prop.width}
      height={prop.height}
    ></canvas>
  )
}