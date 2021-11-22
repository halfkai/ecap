import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '.'
import { set } from '../store/rootStyleSlice'

const useInitialized = () => {
  const [image, setImage] = useState<Buffer>()
  const rootStyle = useAppSelector(state => state.rootStyle)
  const dispatch = useAppDispatch()

  useEffect(() => {
    window.electronAPI.ecapInitialized.then((data) => {
      dispatch(set(['height', data.bounds.height]))
      dispatch(set(['width', data.bounds.width]))
      setImage(data.data)
    })
  }, [])

  useEffect(() => {
    const root = document.getElementById('root')
    if (root && parseInt(rootStyle.width, 10) && parseInt(rootStyle.height, 10)) {
      root.style.width = rootStyle.width
      root.style.height = rootStyle.height
    }
  }, [rootStyle])

  return { image }
}

export default useInitialized
