import { React, useState, useEffect } from 'react'
import { useSound } from 'use-sound'

import Galacta from './pages/game'
import GameMenu from './pages/game-menu'

function App() {
  const [displayGame, setDisplayGame] = useState(false)
  const [menuThemeMusic, { stop: stopMenuThemeMusic }] = useSound(
    'sounds/music/menu-theme-music.mp3'
  )

  const shouldDisplayGame = value => {
    setDisplayGame(value)
  }

  useEffect(() => {
    if (displayGame) {
      stopMenuThemeMusic()
    }
  }, [displayGame])
  menuThemeMusic()

  return (
    <>
      {!displayGame && <GameMenu shouldDisplayGame={shouldDisplayGame} />}
      {displayGame && <Galacta shouldDisplayGame={shouldDisplayGame} />}
    </>
  )
}

export default App
