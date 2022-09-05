import { useCallback } from 'react'
import { useSound } from 'use-sound'

const useGameSounds = () => {
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

  const [startRocketOne] = useSound('sounds/talks/start-rocket-one.mp3')
  const [startRocketTwo] = useSound('sounds/talks/start-rocket-two.mp3')
  const [startRocketThree] = useSound('sounds/talks/start-rocket-three.mp3')
  const [startRocketFour] = useSound('sounds/talks/start-rocket-four.mp3')
  const [startRocketFive] = useSound('sounds/talks/start-rocket-five.mp3')
  const [startRocketSix] = useSound('sounds/talks/start-rocket-six.mp3')
  const [startRocketSeven] = useSound('sounds/talks/start-rocket-seven.mp3')

  const startRocketCryForLevels = useCallback(
    () => [
      startRocketOne,
      startRocketTwo,
      startRocketThree,
      startRocketFour,
      startRocketFive,
      startRocketSix,
      startRocketSeven
    ],
    [
      startRocketFive,
      startRocketFour,
      startRocketOne,
      startRocketSeven,
      startRocketSix,
      startRocketThree,
      startRocketTwo
    ]
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
  const [levelFourMusic, { stop: levelFourMusicStop }] = useSound(
    'sounds/music/level-four-music.mp3'
  )
  const [levelFiveMusic, { stop: levelFiveMusicStop }] = useSound(
    'sounds/music/level-five-music.mp3'
  )
  const [levelSixMusic, { stop: levelSixMusicStop }] = useSound(
    'sounds/music/level-six-music.mp3'
  )
  const [levelSevenMusic, { stop: levelSevenMusicStop }] = useSound(
    'sounds/music/level-seven-music.mp3'
  )

  const musicStackForLevels = useCallback(
    () => [
      levelOneMusic,
      levelTwoMusic,
      levelThreeMusic,
      levelFourMusic,
      levelFiveMusic,
      levelSixMusic,
      levelSevenMusic
    ],
    [
      levelOneMusic,
      levelTwoMusic,
      levelThreeMusic,
      levelFourMusic,
      levelFiveMusic,
      levelSixMusic,
      levelSevenMusic
    ]
  )

  const stopAllMusic = useCallback(() => {
    levelOneMusicStop()
    levelTwoMusicStop()
    levelThreeMusicStop()
    levelFourMusicStop()
    levelFiveMusicStop()
    levelSixMusicStop()
    levelSevenMusicStop()
  }, [
    levelOneMusicStop,
    levelTwoMusicStop,
    levelThreeMusicStop,
    levelFourMusicStop,
    levelFiveMusicStop,
    levelSixMusicStop,
    levelSevenMusicStop
  ])
  return {
    stopAllMusic,
    musicStackForLevels,
    levelOneMusic,
    levelOneMusicStop,
    levelTwoMusic,
    levelTwoMusicStop,
    levelThreeMusic,
    levelThreeMusicStop,
    levelFourMusic,
    levelFourMusicStop,
    levelFiveMusic,
    levelFiveMusicStop,
    levelSixMusic,
    levelSixMusicStop,
    levelSevenMusic,
    levelSevenMusicStop,
    startRocketCryForLevels,
    startRocketOne,
    startRocketTwo,
    startRocketThree,
    startRocketFour,
    startRocketFive,
    startRocketSix,
    startRocketSeven,
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
  }
}

export default useGameSounds
