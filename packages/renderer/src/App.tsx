import { useEffect } from 'react'
import useCanvas from './hooks/useCanvas'
import useDraw from './hooks/useDraw'

function App () {
  const [background, setBackground] = useCanvas()
  useEffect(() => {
    window.electronAPI.ecapInitialized.then((data) => {
      if (background) {
        background.width = data.bounds.width
        background.height = data.bounds.height
      }
    })
  }, [background])

  // const [corpRect] = useCanvas()
  useDraw({ onMouseDown: () => { console.log('e') } })

  return (
    setBackground()
  )
}

export default App
