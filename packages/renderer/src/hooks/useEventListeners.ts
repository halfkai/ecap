import { useEffect, useState } from 'react'

export type Listeners = GlobalEventHandlersEventMap | Record<string, unknown>

const useEventListeners = (target?: HTMLElement): [Listeners, React.Dispatch<React.SetStateAction<GlobalEventHandlersEventMap|Record<string, unknown>>>] => {
  const [listeners, setListeners] = useState<Listeners>({})

  useEffect(() => {
    if (target && listeners) {
      Object.entries(listeners).forEach(([event, listener]) => {
        target.addEventListener(event, listener)
      })
    }
    if (target && listeners) {
      Object.entries(listeners).forEach(([event, listener]) => {
        target.removeEventListener(event, listener)
      })
    }
    return () => {
      if (target && listeners) {
        Object.entries(listeners).forEach(([event, listener]) => {
          target.removeEventListener(event, listener)
        })
      }
    }
  })

  return [listeners, setListeners]
}

export default useEventListeners
