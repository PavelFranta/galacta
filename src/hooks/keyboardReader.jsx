import { useState, useEffect } from 'react'

const useKeyboardReader = () => {
  const [pressedKey, setPressedKey] = useState()

  useEffect(() => {
    function handleResize(value) {
      setPressedKey(value)
    }

    window.addEventListener('keydown', handleResize)
    return () => window.removeEventListener('keydown', handleResize)
  }, [])

  return pressedKey
}

export default useKeyboardReader
