import { useEffect } from 'react'
import useCanvas from './hooks/useCanvas'

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

  return (
    setBackground()
  )
}

export default App
