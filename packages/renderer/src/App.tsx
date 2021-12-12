import { fabric } from 'fabric'

import { useInit } from './hooks'
import { drawRect } from './draws'
import { BaseCanvas, fabricCanvas } from './components'
import { download } from './utils'


let img = new Image()
function App () {
  const { image, width, height } = useInit()

  if (fabricCanvas && image) {
    console.log(Math.random())
    const tmp = fabricCanvas
    console.log('draw-background', fabricCanvas)
    img.src = URL.createObjectURL(new Blob([image]))
    img.onload = () => {
      const fabricImage = new fabric.Image(img)
      fabricCanvas.setBackgroundImage(
        fabricImage,
        () => fabricCanvas.renderAll(),
        {
          originX: 'left',
          originY: 'top'
        }
      )
      console.log(fabricCanvas)
    }
    drawRect(fabricCanvas).then((rect) => {
      console.log(fabricCanvas === tmp)
      // fabricCanvas.bringToFront.bind(rect)
      // const img = new Image()
      // img.src = fabricCanvas.toDataURL({
      //   left: rect.left,
      //   top: rect.top,
      //   width: rect.width,
      //   height: rect.height
      // })
      // download(fabricCanvas.toDataURL(), new Date().toTimeString())
      console.log(img)
      // download(img.src, new Date().toTimeString()).then(() => {
      //   window.electronAPI.ecapFinished()
      // })
    })
  }
  

  return (
    <BaseCanvas
      id='background'
      width={width}
      height={height}
      useFabric={true}
    />
  )
}

export default App
