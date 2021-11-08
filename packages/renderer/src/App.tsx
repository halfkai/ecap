import BaseCanvas from './components/BaseCanvas'
import useInitialized from './hooks/useInitialized'

function App () {
  const { image, width, height } = useInitialized()

  const background = BaseCanvas(
    { width, height }
  )

  console.log(background)

  return (
    background
  )
}

export default App
