import BaseCanvas from './components/BaseCanvas'
import useInitialized from './hooks/useInitialized'

function App () {
  const { image, width, height } = useInitialized()

  const {
    canvas: background,
    renderer: setBackground,
    f
  } = BaseCanvas({
    width,
    height,
    id: 'background',
    useFabric: true
  })
  console.log(f)

  return (
    setBackground
  )
}

export default App
