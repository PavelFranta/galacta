import { useState, useEffect } from 'react'

const useKeyboardReader = () => {
  const [pressedKey, setPressedKey] = useState()

  useEffect(() => {
    function handleResize(value) {
      switch (value.code) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'Space':
        case 'Escape':
        case 'Enter':
          setPressedKey(value)
          break;     
        default:
          break;
      }
    }

    window.addEventListener('keydown', handleResize)
    return () => window.removeEventListener('keydown', handleResize)
  }, [])
  return pressedKey
}

export default useKeyboardReader
