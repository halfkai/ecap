import { useState } from 'react'

function App () {
  const [backgroundURL, setBackgroundURL] = useState('')
  window.electronAPI.ecapInitialized.then((data) => {
    console.log(data)
    setBackgroundURL(data)
  })
  return (
    <div style={{
      width: '100%',
      height: '100%'
      // background: `url(${backgroundURL}) center/100%` // transparent window doesn't need background
    }}>
      <a href={backgroundURL} download>download</a>
    </div>
  )
}

export default App
