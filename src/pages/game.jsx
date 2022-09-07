import { React, useState, useEffect, useCallback } from 'react'
import useGameSounds from '../hooks/gameSounds'
import PropTypes from 'prop-types'

import Alien from '../components/alien'
import Rocket from '../components/rocket'
import Shot from '../components/shot'
import Pause from '../components/banners/pause'
import Win from '../components/banners/win'
import Lose, { BREAK_THRU, CRASH } from '../components/banners/lose'
import InGameScore from '../components/banners/ingame-score'

import useKeyboardReader from '../hooks/keyboardReader'
import useWindowDimensions from '../hooks/windowDimensions'

import generateArmy from '../generators/aliensArmy'
import NotOnPhone from '../components/banners/not-on-phone'

export const ALIEN_AND_ROCKET_ICON_SIZE = 64

function Galacta({ shouldDisplayGame }) {
  const {
    stopAllMusic,
    musicStackForLevels,
    levelOneMusicStop,
    levelTwoMusicStop,
    levelThreeMusicStop,
    startRocketCryForLevels,
    shotSound,
    hitSound,
    winSound,
    loseSoundTwo,
    loseSoundThree,
    monsterKillSound,
    godlikeSound,
    killingSpreeSound,
    firstBloodSound,
    holyShitSound
  } = useGameSounds()

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
  const [pausedGame, setPausedGame] = useState(false)
  const [gameRunning, setGameRunning] = useState(false)

  const pressedKey = useKeyboardReader()

  const restart = useCallback(() => {
    if (hasSuitableViewport) {
      setActiveAliens(generateArmy(screenWidth, currentLevel))
    }
    setShotsShot(0)
    setAliensKilled(0)
    setCurrentLevel(currentLevel)
    setWin(false)
    setLose('')
    setPausedGame(false)
    startRocketCryForLevels()[currentLevel - 1]()
    setGameRunning(true)
  }, [currentLevel, screenWidth, startRocketCryForLevels])

  const moveRight = useCallback(() => {
    if (rocketPositionX + 20 + 60 < screenWidth) {
      setRocketPositionX(rocketPositionX + 30)
    }
  }, [rocketPositionX, screenWidth])

  const moveLeft = useCallback(() => {
    if (rocketPositionX - 20 > 0) {
      setRocketPositionX(rocketPositionX - 30)
    }
  }, [rocketPositionX])

  const moveUp = useCallback(() => {
    if (rocketPositionY - 20 > 0) {
      setRocketPositionY(rocketPositionY - 30)
    }
  }, [rocketPositionY])
  const moveDown = useCallback(() => {
    if (rocketPositionY + 20 + ALIEN_AND_ROCKET_ICON_SIZE < screenHeight) {
      setRocketPositionY(rocketPositionY + 30)
    }
  }, [rocketPositionY, screenHeight])

  const fireNewShot = useCallback(() => {
    setActiveShots([
      ...activeShots,
      { positionX: rocketPositionX + 30.5, positionY: rocketPositionY - 5 }
    ])
    setShotsShot(shotsShot + 1)
    shotSound()
  }, [activeShots, rocketPositionX, rocketPositionY, shotSound, shotsShot])

  useEffect(() => {
    if (!win && !lose && !pausedGame && gameRunning) {
      stopAllMusic()
      musicStackForLevels()[currentLevel - 1]()
    } else {
      stopAllMusic()
    }
  }, [
    win,
    lose,
    pausedGame,
    gameRunning,
    currentLevel,
    levelOneMusicStop,
    levelTwoMusicStop,
    levelThreeMusicStop,
    musicStackForLevels,
    stopAllMusic
  ])

  useEffect(() => {
    restart()
  }, [restart])

  const hasSuitableViewport = useCallback(() => {
    return screenWidth >= 580 && screenHeight >= 580
  }, [screenHeight, screenWidth])

  const hitDetector = useCallback(() => {
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
            if (currentLevel < 8) {
              setTimeout(() => {
                setCurrentLevel(() => currentLevel + 1)
              }, 3000)
            }
          }
        }
      })
    })
  }, [
    activeAliens,
    activeShots,
    aliensKilled,
    firstBloodSound,
    godlikeSound,
    hitSound,
    holyShitSound,
    killingSpreeSound,
    monsterKillSound,
    winSound,
    currentLevel
  ])

  const crashWithAlienDetector = useCallback(() => {
    activeAliens.forEach(alien => {
      if (
        rocketPositionX >= alien.positionX &&
        rocketPositionX <= alien.positionX + ALIEN_AND_ROCKET_ICON_SIZE &&
        rocketPositionY >= alien.positionY &&
        rocketPositionY <= alien.positionY + ALIEN_AND_ROCKET_ICON_SIZE
      ) {
        loseSoundThree()
        setLose(CRASH)
        setGameRunning(false)
      }
    })
  }, [activeAliens, loseSoundThree, rocketPositionX, rocketPositionY])

  const doesAlienBreakThru = useCallback(() => {
    if (
      activeAliens.some(
        alien => alien.positionY > screenHeight - ALIEN_AND_ROCKET_ICON_SIZE
      )
    ) {
      loseSoundTwo()
      setLose(BREAK_THRU)
      setGameRunning(false)
    }
  }, [activeAliens, loseSoundTwo, screenHeight])

  const processUserInput = useCallback(
    keyCode => {
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
            fireNewShot()
            break
          case 'Escape':
            setPausedGame(!pausedGame)
            break
          case 'Enter':
          case 'NumpadEnter':
            if (win || lose) {
              restart()
            }
            break
          default:
            break
        }
      }
    },
    [
      fireNewShot,
      lose,
      moveDown,
      moveLeft,
      moveRight,
      moveUp,
      pausedGame,
      restart,
      win
    ]
  )

  const shotsMoverMapping = useCallback(() => {
    setActiveShots(
      activeShots
        .filter(shot => shot.positionY > -1500)
        .map(shot => {
          return {
            positionX: shot?.positionX,
            positionY: shot?.positionY - 8
          }
        })
    )
  }, [activeShots])

  const aliensMoverMapping = useCallback(() => {
    setActiveAliens(
      activeAliens.map(alien => {
        return {
          positionX: alien?.positionX,
          positionY: alien?.positionY + 2,
          alienName: alien?.alienName,
          pulse: alien?.pulse
        }
      })
    )
    crashWithAlienDetector()
    doesAlienBreakThru()
  }, [activeAliens, crashWithAlienDetector, doesAlienBreakThru])

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
  }, [activeShots, hitDetector, lose, pausedGame, shotsMoverMapping])

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        aliensMoverMapping()
      },
      pausedGame || lose ? 99999999 : 100 - currentLevel * 8
    )
    return () => clearInterval(intervalId)
  }, [activeAliens, pausedGame, lose])

  return (
    <>
      {hasSuitableViewport() && (
        <div className="w-full h-full bg-gray-900 relative z-10">
          <div className="w-full h-full flex justify-center items-center">
            {win && (
              <Win
                aliensKilled={aliensKilled}
                shotsShot={shotsShot}
                restart={restart}
                shouldDisplayGame={shouldDisplayGame}
                level={currentLevel}
              />
            )}
            {lose && (
              <Lose
                reason={lose}
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
            <InGameScore
              aliensKilled={aliensKilled}
              shotsShot={shotsShot}
              level={currentLevel}
            />
          )}
        </div>
      )}
      {!hasSuitableViewport() && <NotOnPhone />}
    </>
  )
}

Galacta.propTypes = {
  shouldDisplayGame: PropTypes.func.isRequired
}

export default Galacta
