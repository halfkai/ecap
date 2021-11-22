import { useInitialized } from './hooks'

function App () {
  const { image } = useInitialized()
  return (
    <div id='background'></div>
  )
}

export default App
