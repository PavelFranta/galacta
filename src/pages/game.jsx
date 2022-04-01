import { useState, useEffect } from 'react'
import Rocket from '../components/rocket'
import Shot from '../components/shot'
import useKeyboardReader from '../hooks/keyboardReader'
import useWindowDimensions from '../hooks/windowDimensions'

function Galacta() {
  const { height, width } = useWindowDimensions()

  const [positionX, setPositionX] = useState(width / 2)
  const [positionY, setPositionY] = useState(height - height * .1)
  const [activeShots, setActiveShots] = useState([])
  let pressedKey = useKeyboardReader()

  useEffect(() => {
    processMove(pressedKey?.code)
  },[pressedKey])

  const processMove = (keyCode) => {
    switch (keyCode) {
      case 'ArrowRight':
        if (positionX + 20 + 60 < width) {
          setPositionX(positionX + 30)
        }
        break;
      case 'ArrowLeft':
        if (positionX - 20 > 0) {
          setPositionX(positionX - 30)
        }
      break;
      case 'ArrowUp':
        if (positionY - 20 > 0) {
          setPositionY(positionY - 30)
        }
        break;
      case 'ArrowDown':
        if (positionY + 20 + 64 < height) {
          setPositionY(positionY + 30)
        }
        break;
      case 'Space':
        setActiveShots([...activeShots, {positionX: positionX + 30.5, positionY: positionY - 5}])
        const audio = new Audio('shot.wav')
        audio.play()
        break;
      default:
        break;
   }
  }

  
  useEffect(() => {
    const intervalId = setInterval(() => {
     setActiveShots(activeShots
      .filter(shot => shot.positionY > -4000)
      .map(shot => {
      return {positionX: shot?.positionX, positionY: shot?.positionY - 8}}))
   }, 10);
   return () => clearInterval(intervalId);
  }, [activeShots])

  useEffect(() => {
    const audio = new Audio('game.mp3')
    audio.play()
  }, [])

  return (
    <div className="w-full h-full bg-gray-900 relative" id='battlefield'>
      <Rocket positionX={positionX} positionY={positionY} />
      {activeShots.map(shot => <Shot positionX={shot.positionX} positionY={shot.positionY} />)}
    </div>
  )
}

export default Galacta
