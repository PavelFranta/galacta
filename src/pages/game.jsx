import { React, useState, useEffect, useCallback } from 'react'
import { useSound } from 'use-sound'
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
  const [goAheadCommanderSound] = useSound(
    'sounds/talks/go-ahead-commander.mp3'
  )

  const [levelOneMusic, { stop: levelOneMusicStop }] = useSound(
    'sounds/music/level-one-music.mp3'
  )
  const [levelTwoMusic, { stop: levelTwoMusicStop }] = useSound(
    'sounds/music/level-two-music.mp3'
  )
  const [levelThreeMusic, { stop: levelThreeMusicStop }] = useSound(
    'sounds/music/level-three-music.mp3'
  )

  const musicStackForLevels = useCallback(
    () => [levelOneMusic, levelTwoMusic, levelThreeMusic],
    [levelOneMusic, levelTwoMusic, levelThreeMusic]
  )

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
  const stopAllMusic = useCallback(() => {
    levelOneMusicStop()
    levelTwoMusicStop()
    levelThreeMusicStop()
  }, [levelOneMusicStop, levelTwoMusicStop, levelThreeMusicStop])

  const restart = useCallback(() => {
    setActiveAliens(generateArmy(screenWidth, currentLevel))
    setShotsShot(0)
    setAliensKilled(0)
    setCurrentLevel(1)
    setWin(false)
    setLose('')
    setPausedGame(false)
    goAheadCommanderSound()
    setGameRunning(true)
  }, [])

  useEffect(() => {
    if (!win && !lose && !pausedGame && gameRunning) {
      stopAllMusic()
      musicStackForLevels()[currentLevel]()
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
  }, [])

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
          }
        }
      })
    })
  })

  const crashWithAlienDetector = () => {
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
  }

  const doesAlienBreakThru = () => {
    if (
      activeAliens.some(
        alien => alien.positionY > screenHeight - ALIEN_AND_ROCKET_ICON_SIZE
      )
    ) {
      loseSoundTwo()
      setLose(BREAK_THRU)
      setGameRunning(false)
    }
  }

  const processUserInput = useCallback(keyCode => {
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
  })

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
      { positionX: rocketPositionX + 30.5, positionY: rocketPositionY - 5 }
    ])
    setShotsShot(shotsShot + 1)
    shotSound()
  }

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
  }, [activeAliens])

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
      {hasSuitableViewport() && (
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
            <InGameScore aliensKilled={aliensKilled} shotsShot={shotsShot} />
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
