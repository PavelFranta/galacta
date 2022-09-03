import { useState, useEffect } from 'react'
import Alien from '../components/alien'
import Rocket from '../components/rocket'
import Shot from '../components/shot'
import useKeyboardReader from '../hooks/keyboardReader'
import useWindowDimensions from '../hooks/windowDimensions'
import generateArmy from '../generators/aliensArmy'

function Galacta({ shouldDisplayGame }) {
  const { height, width } = useWindowDimensions()

  const [positionX, setPositionX] = useState(width / 2)
  const [positionY, setPositionY] = useState(height - height * 0.1)
  const [activeShots, setActiveShots] = useState([])
  const [activeAliens, setActiveAliens] = useState([])
  const [aliensKilled, setAliensKilled] = useState(0)
  const [shotsShooted, setshotsShooted] = useState(0)
  const [win, setWin] = useState(false)
  const [pausedGame, setPausedGame] = useState(true)

  let pressedKey = useKeyboardReader()

  useEffect(() => {
    processMove(pressedKey?.code)
  }, [pressedKey])

  const restart = () => {
    setActiveAliens(generateArmy(width, 1))
    setshotsShooted(0)
    setAliensKilled(0)
    setWin(false)
    setPausedGame(false)
  }

  const processMove = keyCode => {
    if (
      (!pausedGame && !win) ||
      (pausedGame && keyCode === 'Escape') ||
      (win && keyCode === 'Enter')
    ) {
      switch (keyCode) {
        case 'ArrowRight':
          if (positionX + 20 + 60 < width) {
            setPositionX(positionX + 30)
          }
          break
        case 'ArrowLeft':
          if (positionX - 20 > 0) {
            setPositionX(positionX - 30)
          }
          break
        case 'ArrowUp':
          if (positionY - 20 > 0) {
            setPositionY(positionY - 30)
          }
          break
        case 'ArrowDown':
          if (positionY + 20 + 64 < height) {
            setPositionY(positionY + 30)
          }
          break
        case 'Space':
          setActiveShots([
            ...activeShots,
            { positionX: positionX + 30.5, positionY: positionY - 5 },
          ])
          setshotsShooted(shotsShooted + 1)
          const audio = new Audio('shot.wav')
          audio.play()
          break
        case 'Escape':
          setPausedGame(!pausedGame)
        case 'Enter':
          if (win) {
            restart()
          }
        default:
          break
      }
    }
  }

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (activeShots.length) {
          setActiveShots(
            activeShots
              .filter(shot => shot.positionY > -1500)
              .map(shot => {
                return {
                  positionX: shot?.positionX,
                  positionY: shot?.positionY - 8,
                }
              })
          )
        }
      },
      pausedGame ? 99999999 : 10
    )
    return () => clearInterval(intervalId)
  }, [activeShots, pausedGame])

  useEffect(() => {
    hit()
  }, [activeShots])

  const hit = () => {
    activeShots.forEach(shot => {
      activeAliens.forEach(alien => {
        if (
          shot.positionX > alien.positionX &&
          shot.positionX < alien.positionX + 64 &&
          shot.positionY > alien.positionY &&
          shot.positionY < alien.positionY + 64
        ) {
          setActiveAliens(
            activeAliens.filter(currentAlien => currentAlien !== alien)
          )
          setActiveShots(
            activeShots.filter(currentShot => currentShot !== shot)
          )
          setAliensKilled(aliensKilled + 1)
          if (activeAliens.length === 1) {
            setWin(true)
          }
        }
      })
    })
  }

  useEffect(() => {
    setActiveAliens(generateArmy(width, 1))
    setPausedGame(false)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        setActiveAliens(
          activeAliens.map(alien => {
            return {
              positionX: alien?.positionX,
              positionY: alien?.positionY + 2,
              alienName: alien?.alienName,
              pulse: alien?.pulse,
            }
          })
        )
      },
      pausedGame ? 99999999 : 100
    )
    return () => clearInterval(intervalId)
  }, [activeAliens, pausedGame])

  return (
    <div className="w-full h-full bg-gray-900 relative z-10" id="battlefield">
      {win && (
        <div className="text-white flex flex-col p-4 text-xl items-center gap-4">
          <div className="text-white text-8xl p-4">Vyhráls more</div>
          <div>Score: {aliensKilled}</div>
          <div>Shots: {shotsShooted}</div>
          <button
            className="border border-white p-2 mt-4"
            onClick={() => restart}
          >
            ZNOVA
          </button>
        </div>
      )}
      {pausedGame && !win && (
        <div className="text-white flex flex-col p-4 text-xl items-center gap-4 relative z-20 bg-gray-900 w-fit mx-auto border border-white">
          <div className="text-white text-8xl p-4">PAUSE</div>
          <div className="flex flex-col">
            <button
              className="border border-white p-2 mt-4"
              onClick={() => setPausedGame(false)}
            >
              Pokračovat
            </button>
            <button
              className="border border-white p-2 mt-4"
              onClick={() => shouldDisplayGame(false)}
            >
              Hlavní menu
            </button>
          </div>
        </div>
      )}
      <Rocket positionX={positionX} positionY={positionY} />
      {activeShots.map((shot, index) => (
        <Shot
          positionX={shot.positionX}
          positionY={shot.positionY}
          key={index + 'shot'}
        />
      ))}
      {activeAliens.map((alien, index) => (
        <Alien
          positionX={alien.positionX}
          positionY={alien.positionY}
          alienName={alien.alienName}
          pulse={alien.pulse}
          key={index + 'alien'}
        />
      ))}
      {!win && (
        <div className="text-white flex flex-col absolute bottom-0 right-100 p-4 text-xl">
          <div>Score: {aliensKilled}</div>
          <div>Shots: {shotsShooted}</div>
        </div>
      )}
    </div>
  )
}

export default Galacta
