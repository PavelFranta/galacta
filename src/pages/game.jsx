import { useState, useEffect } from 'react'
import Alien from '../components/alien'
import Rocket from '../components/rocket'
import Shot from '../components/shot'
import useKeyboardReader from '../hooks/keyboardReader'
import useWindowDimensions from '../hooks/windowDimensions'

function Galacta() {
  const { height, width } = useWindowDimensions()

  const [positionX, setPositionX] = useState(width / 2)
  const [positionY, setPositionY] = useState(height - height * .1)
  const [activeShots, setActiveShots] = useState([])
  const [activeAliens, setActiveAliens] = useState([])
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
    const audio = new Audio('game.mp3')
    audio.play()
  }, [])

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (activeShots.length) {
        setActiveShots(activeShots
         .filter(shot => shot.positionY > -1500)
         .map(shot => {
         return {positionX: shot?.positionX, positionY: shot?.positionY - 8}}))
      }
   }, 10);
   return () => clearInterval(intervalId);
  }, [activeShots])

  useEffect(() => {
    hit()
  }, [activeShots])
  
  const hit = () => {
    activeShots.forEach(shot => {
      activeAliens.forEach(alien => {
        if (shot.positionX > alien.positionX && shot.positionX < alien.positionX + 64 && shot.positionY > alien.positionY  && shot.positionY < alien.positionY  + 64 ) {
          setActiveAliens(activeAliens.filter(currentAlient => currentAlient !== alien))
          setActiveShots(activeShots.filter(currentShot => currentShot !== shot))
        }
      })
    })
  }

  useEffect(() => {setActiveAliens([
    {positionX: 100, positionY: 20, alienName: 'alien3'},
    {positionX: 200, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 300, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 400, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 500, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 600, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 700, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 800, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 900, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 1000, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 1100, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 1200, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 1300, positionY: 20, alienName: 'alien2', pulse: true},
    {positionX: 1400, positionY: 20, alienName: 'alien3'},
    {positionX: 100, positionY: 100, alienName: 'alien3'},
    {positionX: 200, positionY: 100, alienName: 'alien4'},
    {positionX: 300, positionY: 100, alienName: 'alien4'},
    {positionX: 400, positionY: 100, alienName: 'alien4'},
    {positionX: 500, positionY: 100, alienName: 'alien4'},
    {positionX: 600, positionY: 100, alienName: 'alien4'},
    {positionX: 700, positionY: 100, alienName: 'alien4'},
    {positionX: 800, positionY: 100, alienName: 'alien4'},
    {positionX: 900, positionY: 100, alienName: 'alien4'},
    {positionX: 1000, positionY: 100, alienName: 'alien4'},
    {positionX: 1100, positionY: 100, alienName: 'alien4'},
    {positionX: 1200, positionY: 100, alienName: 'alien4'},
    {positionX: 1300, positionY: 100, alienName: 'alien4'},
    {positionX: 1400, positionY: 100, alienName: 'alien3'},
    {positionX: 100, positionY: 200, alienName: 'alien3'},
    {positionX: 200, positionY: 200, alienName: 'alien'},
    {positionX: 300, positionY: 200, alienName: 'alien'},
    {positionX: 400, positionY: 200, alienName: 'alien'},
    {positionX: 500, positionY: 200, alienName: 'alien'},
    {positionX: 600, positionY: 200, alienName: 'alien'},
    {positionX: 700, positionY: 200, alienName: 'alien'},
    {positionX: 800, positionY: 200, alienName: 'alien'},
    {positionX: 900, positionY: 200, alienName: 'alien'},
    {positionX: 1000, positionY: 200, alienName: 'alien'},
    {positionX: 1100, positionY: 200, alienName: 'alien'},
    {positionX: 1200, positionY: 200, alienName: 'alien'},
    {positionX: 1300, positionY: 200, alienName: 'alien'},
    {positionX: 1400, positionY: 200, alienName: 'alien3'},
    {positionX: 100, positionY: 300, alienName: 'alien3'},
    {positionX: 200, positionY: 300, alienName: 'alien3'},
    {positionX: 300, positionY: 300, alienName: 'alien3'},
    {positionX: 400, positionY: 300, alienName: 'alien3'},
    {positionX: 500, positionY: 300, alienName: 'alien3'},
    {positionX: 600, positionY: 300, alienName: 'alien3'},
    {positionX: 700, positionY: 300, alienName: 'alien3'},
    {positionX: 800, positionY: 300, alienName: 'alien3'},
    {positionX: 900, positionY: 300, alienName: 'alien3'},
    {positionX: 1000, positionY: 300, alienName: 'alien3'},
    {positionX: 1100, positionY: 300, alienName: 'alien3'},
    {positionX: 1200, positionY: 300, alienName: 'alien3'},
    {positionX: 1300, positionY: 300, alienName: 'alien3'},
    {positionX: 1400, positionY: 300, alienName: 'alien3'},
   ])}, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveAliens(activeAliens
       .map(alien => {
       return {positionX: alien?.positionX, positionY: alien?.positionY + 2, alienName: alien?.alienName, pulse: alien?.pulse}
      }))
    }, 1000);
    return () => clearInterval(intervalId);
  }, [activeAliens])

  return (
    <div className="w-full h-full bg-gray-900 relative" id='battlefield'>
      <Rocket positionX={positionX} positionY={positionY} />
      {activeShots.map(shot => <Shot positionX={shot.positionX} positionY={shot.positionY} />)}
      {activeAliens.map(alien => <Alien positionX={alien.positionX} positionY={alien.positionY} alienName={alien.alienName} pulse={alien.pulse} />)}
    </div>
  )
}

export default Galacta
