import { useState, useEffect } from 'react'
import Rocket from '../components/rocket'
import useKeyboardReader from '../hooks/keyboardReader'
import useWindowDimensions from '../hooks/windowDimensions'

function Galacta() {
  const { height, width } = useWindowDimensions()

  const [positionX, setPositionX] = useState(width / 2)
  const [positionY, setPositionY] = useState(height - height * .1)
  let pressedKey = useKeyboardReader()

  useEffect(() => {
    processMove(pressedKey?.code)
  },[pressedKey])

  const processMove = (keyCode) => {
    switch (keyCode) {
      case 'ArrowRight':
        if (positionX + 20 + 60 < width) {
          setPositionX(positionX + 20)
        }
        break;
      case 'ArrowLeft':
        if (positionX - 20 > 0) {
          setPositionX(positionX - 20)
        }
      break;
      case 'ArrowUp':
        if (positionY - 20 > 0) {
          setPositionY(positionY - 20)
        }
        break;
      case 'ArrowDown':
        if (positionY + 20 + 64 < height) {
          setPositionY(positionY + 20)
        }
        break;
      case 'Space':
          console.log('space');
        break;
      default:
        break;
   }
  }

 useEffect(() => {
  //  const audio = new Audio('game.mp3')
  //  audio.play()
  }, [])


  return (
    <div className="w-full h-full bg-gray-900 relative">
      <Rocket positionX={positionX} positionY={positionY} />
    </div>
  )
}

export default Galacta
