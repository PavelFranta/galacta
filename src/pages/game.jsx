import { useState, useEffect } from 'react'
import Rocket from '../components/rocket'
import useKeyboardReader from '../hooks/keyboardReader'
import useWindowDimensions from '../hooks/windowDimensions'

function Galacta() {
  const { height, width } = useWindowDimensions()
  const [positionX, setPositionX] = useState(width)
  const [positionY, setPositionY] = useState(height)
  let pressedKey = useKeyboardReader()

  useEffect(() => {
    switch (pressedKey?.key) {
      case 'ArrowRight':
        setPositionX(positionX + 16)
        break;
      case 'ArrowLeft':
        setPositionX(positionX - 16)
      break;
      case 'ArrowUp':
        setPositionY(positionY - 16)
        break;
      case 'ArrowDown':
        setPositionY(positionY + 16)
        break;
      default:
        break;
    }
  },[pressedKey])

 useEffect(() => {
   const audio = new Audio('game.mp3')
   audio.play()
  }, [])


  return (
    <div className="w-full h-full bg-gray-900 relative">
      <Rocket positionX={positionX / 2 - 64} positionY={positionY-(positionY * .1)} />
    </div>
  )
}

export default Galacta
