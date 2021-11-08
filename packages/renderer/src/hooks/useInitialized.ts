import { useEffect, useState } from 'react'

const useInitialized = () => {
  const [image, setImage] = useState<Buffer>()
  const [width, setWidth] = useState<number>()
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    window.electronAPI.ecapInitialized.then((data) => {
      setWidth(data.bounds.width)
      setHeight(data.bounds.height)
      setImage(data.data)
      console.log(data.data)
    })
  }, [])

  return { image, width, height }
}

export default useInitialized
