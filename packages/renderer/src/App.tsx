import BaseCanvas from './components/BaseCanvas'
import useInitialized from './hooks/useInitialized'

function App () {
  const { image, width, height } = useInitialized()

  const {
    canvas: background,
    setCanvas: setBackground
  } = BaseCanvas({
    width,
    height,
    id: 'background',
    useFabric: true
  })

  console.log(background)

  return (
    setBackground()
  )
}

export default App
