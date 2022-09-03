import { useState, useEffect } from 'react'
import Alien from '../components/alien'
import Rocket from '../components/rocket'
import Shot from '../components/shot'
import Pause from '../components/banners/pause'
import Win from '../components/banners/win'
import Lose from '../components/banners/lose'
import InGameScore from '../components/banners/ingame-score'

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
  const [shotsShot, setshotsShot] = useState(0)
  const [win, setWin] = useState(false)
  const [lose, setLose] = useState(false)
  const [pausedGame, setPausedGame] = useState(true)

  let pressedKey = useKeyboardReader()

  const restart = () => {
    setActiveAliens(generateArmy(width, 1))
    setshotsShot(0)
    setAliensKilled(0)
    setWin(false)
    setLose(false)
    setPausedGame(false)
  }

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
          setshotsShot(shotsShot + 1)
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

  const shotsMoverMapping = () => {
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

  const aliensMoverMapping = () => {
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

    doesAlienBreakThru()
  }

  const doesAlienBreakThru = () => {
    if (activeAliens.some(alien => alien.positionY > height - 64)) {
      setLose(true)
    }
  }

  useEffect(() => {
    setActiveAliens(generateArmy(width, 1))
    setPausedGame(false)
  }, [])

  useEffect(() => {
    processMove(pressedKey?.code)
  }, [pressedKey])

  useEffect(() => {
    hit()
    const interval = setInterval(
      () => {
        if (activeShots.length) {
          shotsMoverMapping()
        } else {
          clearInterval(interval)
        }
      },
      pausedGame || lose ? 99999999 : 10
    )
    return () => clearInterval(interval)
  }, [activeShots, pausedGame])

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        aliensMoverMapping()
      },
      pausedGame || lose ? 99999999 : 100
    )
    return () => clearInterval(intervalId)
  }, [activeAliens, pausedGame])

  return (
    <div className="w-full h-full bg-gray-900 relative z-10">
      {win && (
        <Win
          aliensKilled={aliensKilled}
          shotsShot={shotsShot}
          restart={restart}
        />
      )}
      {lose && (
        <Lose
          aliensKilled={aliensKilled}
          shotsShot={shotsShot}
          restart={restart}
        />
      )}
      {pausedGame && !win && (
        <Pause
          shouldDisplayGame={shouldDisplayGame}
          setPausedGame={setPausedGame}
        />
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
        <InGameScore aliensKilled={aliensKilled} shotsShot={shotsShot} />
      )}
    </div>
  )
}

export default Galacta
