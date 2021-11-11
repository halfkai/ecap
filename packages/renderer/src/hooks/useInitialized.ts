import { useEffect, useState } from 'react'

const useInitialized = () => {
  const [image, setImage] = useState<Buffer>()
  const [width, setWidth] = useState<number | string>('100%')
  const [height, setHeight] = useState<number | string>('100%')

  useEffect(() => {
    window.electronAPI.ecapInitialized.then((data) => {
      setWidth(data.bounds.width)
      setHeight(data.bounds.height)
      setImage(data.data)
    })
  }, [])

  return { image, width, height }
}

export default useInitialized
