import { fabric } from 'fabric'

export const drawRect = (
  fabricCanvas: fabric.Canvas,
  once: boolean = true,
  rectOptions?: fabric.IRectOptions,
): Promise<fabric.Rect> => new Promise((resolve) => {
  let isDown: Boolean
  let startPoint: { x: number, y: number }
  let rect: fabric.Rect
  fabricCanvas.on('mouse:down', (o) => {
    isDown = true
    startPoint = fabricCanvas.getPointer(o.e)
    rect = new fabric.Rect({
      left: startPoint.x,
      top: startPoint.y,
      originX: 'left',
      originY: 'top',
      width: 0,
      height: 0,
      angle: 0,
      fill: 'rgba(0, 0, 0, 1)',
      borderColor: 'rgba(255, 255, 0)',
      transparentCorners: false,
      ...rectOptions
    })
  })
  fabricCanvas.on('mouse:move', (o) => {
    if (!isDown) return
    const pointer = fabricCanvas.getPointer(o.e)
    const [w, h] = [Math.abs(pointer.x - startPoint.x), Math.abs(pointer.y - startPoint.y)]
    if (!w || !h || !rect) return
    rect.set('width', w).set('height', h)
  })
  fabricCanvas.on('mouse:up', () => {
    if (isDown) isDown = false
    // fabricCanvas.add.bind(rect)
    // fabricCanvas.renderAll.bind(fabricCanvas)
    if (once && rect) {
      fabricCanvas.off('mouse:down')
      fabricCanvas.off('mouse:move')
      fabricCanvas.off('mouse:up')
      console.log('resolved')
      resolve(rect)
    }
  })
})
