import { useState, useEffect } from 'react'
import { useSound } from 'use-sound'
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

export const ALIEN_AND_ROCKET_ICON_SIZE = 64
function Galacta({ shouldDisplayGame }) {
  const [shotSound] = useSound('sounds/effects/shot.wav')
  const [hitSound] = useSound('sounds/effects/hit.wav')
  const [winSound] = useSound('sounds/talks/win.mp3', { volume: 1.5 })
  const [loseSoundTwo] = useSound('sounds/talks/hh-bitch.mp3')
  const [loseSoundThree] = useSound('sounds/talks/stupid-bitch.mp3')
  const [monsterKillSound] = useSound('sounds/talks/monster-kill.mp3')
  const [godlikeSound] = useSound('sounds/talks/godlike.mp3')
  const [killingSpreeSound] = useSound('sounds/talks/killing-spree.mp3')
  const [firstBloodSound] = useSound('sounds/talks/first-blood.mp3')
  const [holyShitSound] = useSound('sounds/talks/holy-shit.mp3')
  const [idiotSound] = useSound('sounds/talks/idiot.mp3')
  const [goAheadCommanderSound] = useSound(
    'sounds/talks/go-ahead-commander.mp3'
  )
  const [levelOneMusic] = useSound('sounds/music/level-one-music.mp3')
  const [levelTwoMusic] = useSound('sounds/music/level-two-music.mp3')
  const [levelThreeMusic] = useSound('sounds/music/level-three-music.mp3')

  const musicStackForLevels = [levelOneMusic, levelTwoMusic, levelThreeMusic]

  const [screenHeight, screenWidth] = useWindowDimensions()
  const [rocketPositionX, setRocketPositionX] = useState(screenWidth / 2)
  const [rocketPositionY, setRocketPositionY] = useState(
    screenHeight - screenHeight * 0.1
  )
  const [activeShots, setActiveShots] = useState([])
  const [currentLevel, setCurrentLevel] = useState(1)
  const [activeAliens, setActiveAliens] = useState([])
  const [aliensKilled, setAliensKilled] = useState(0)
  const [shotsShot, setShotsShot] = useState(0)
  const [win, setWin] = useState(false)
  const [lose, setLose] = useState('')
  const [pausedGame, setPausedGame] = useState(true)

  let pressedKey = useKeyboardReader()

  const restart = () => {
    setActiveAliens(generateArmy(screenWidth, 3))
    setShotsShot(0)
    setAliensKilled(0)
    setWin(false)
    setLose('')
    setPausedGame(false)
    goAheadCommanderSound()
  }

  const hitDetector = () => {
    activeShots.forEach(shot => {
      activeAliens.forEach(alien => {
        if (
          shot.positionX > alien.positionX &&
          shot.positionX < alien.positionX + ALIEN_AND_ROCKET_ICON_SIZE &&
          shot.positionY > alien.positionY &&
          shot.positionY < alien.positionY + ALIEN_AND_ROCKET_ICON_SIZE
        ) {
          hitSound()
          setActiveAliens(
            activeAliens.filter(currentAlien => currentAlien !== alien)
          )
          setActiveShots(
            activeShots.filter(currentShot => currentShot !== shot)
          )
          if (aliensKilled === 0) {
            firstBloodSound()
          }

          if (aliensKilled === 10) {
            killingSpreeSound()
          }

          if (aliensKilled === 20) {
            monsterKillSound()
          }

          if (aliensKilled === 30) {
            godlikeSound()
          }

          if (aliensKilled === 40) {
            holyShitSound()
          }
          setAliensKilled(aliensKilled + 1)
          if (activeAliens.length === 1) {
            winSound()
            setWin(true)
          }
        }
      })
    })
  }

  const crashWithAlienDetector = () => {
    activeAliens.forEach(alien => {
      if (
        rocketPositionX >= alien.positionX &&
        rocketPositionX <= alien.positionX + ALIEN_AND_ROCKET_ICON_SIZE &&
        rocketPositionY >= alien.positionY &&
        rocketPositionY <= alien.positionY + ALIEN_AND_ROCKET_ICON_SIZE
      ) {
        loseSoundThree()
        setLose('crash-with-rocket')
      }
    })
  }

  const processUserInput = keyCode => {
    if (
      (!pausedGame && !win && !lose) ||
      (pausedGame && keyCode === 'Escape') ||
      ((win || lose) && keyCode === 'Enter')
    ) {
      switch (keyCode) {
        case 'ArrowRight':
          moveRight()
          break
        case 'ArrowLeft':
          moveLeft()
          break
        case 'ArrowUp':
          moveUp()
          break
        case 'ArrowDown':
          moveDown()
          break
        case 'Space':
          console.log('shot')
          fireNewShot()
          break
        case 'Escape':
          setPausedGame(!pausedGame)
        case 'Enter':
        case 'NumpadEnter':
          if (win || lose) {
            restart()
          }
        default:
          break
      }
    }
  }

  const moveRight = () => {
    if (rocketPositionX + 20 + 60 < screenWidth) {
      setRocketPositionX(rocketPositionX + 30)
    }
  }
  const moveLeft = () => {
    if (rocketPositionX - 20 > 0) {
      setRocketPositionX(rocketPositionX - 30)
    }
  }
  const moveUp = () => {
    if (rocketPositionY - 20 > 0) {
      setRocketPositionY(rocketPositionY - 30)
    }
  }
  const moveDown = () => {
    if (rocketPositionY + 20 + ALIEN_AND_ROCKET_ICON_SIZE < screenHeight) {
      setRocketPositionY(rocketPositionY + 30)
    }
  }

  const fireNewShot = () => {
    setActiveShots([
      ...activeShots,
      { positionX: rocketPositionX + 30.5, positionY: rocketPositionY - 5 },
    ])
    setShotsShot(shotsShot + 1)
    shotSound()
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
    crashWithAlienDetector()
    doesAlienBreakThru()
  }

  const doesAlienBreakThru = () => {
    if (
      activeAliens.some(
        alien => alien.positionY > screenHeight - ALIEN_AND_ROCKET_ICON_SIZE
      )
    ) {
      loseSoundTwo()
      setLose('break-into-base')
    }
  }

  useEffect(() => {
    goAheadCommanderSound()
    setActiveAliens(generateArmy(screenWidth, 3))
    setPausedGame(false)
  }, [])

  useEffect(() => {
    processUserInput(pressedKey?.code)
  }, [pressedKey])

  useEffect(() => {
    hitDetector()
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
    <>
      {screenWidth >= 580 && screenHeight >= 580 && (
        <div className="w-full h-full bg-gray-900 relative z-10">
          <div className="w-full h-full flex justify-center items-center">
            {win && (
              <Win
                aliensKilled={aliensKilled}
                shotsShot={shotsShot}
                restart={restart}
                shouldDisplayGame={shouldDisplayGame}
              />
            )}
            {lose && (
              <Lose
                aliensKilled={aliensKilled}
                shotsShot={shotsShot}
                restart={restart}
                shouldDisplayGame={shouldDisplayGame}
              />
            )}
            {pausedGame && !win && (
              <Pause
                shouldDisplayGame={shouldDisplayGame}
                setPausedGame={setPausedGame}
              />
            )}
          </div>
          <Rocket
            rocketPositionX={rocketPositionX}
            rocketPositionY={rocketPositionY}
          />
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
      )}
      {(screenWidth < 580 || screenHeight < 580) && (
        <div className="h-full flex items-center justify-center flex-col">
          <h1 className="text-2xl text-center">
            Na mobilu to hrát nebudeš more !!!
          </h1>
          <button
            className="mt-8 border-2 border-black p-4"
            onClick={() => idiotSound()}
          >
            Učinit pokání
          </button>
        </div>
      )}
    </>
  )
}

export default Galacta
