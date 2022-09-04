import { useState, useEffect } from 'react'
import { useSound } from 'use-sound'

import Galacta from './pages/game'
import GameMenu from './pages/game-menu'

function App() {
  const [displayGame, setDisplayGame] = useState(false)
  const [themeMenuMusic, { stop }] = useSound(
    'sounds/music/theme-menu-music.mp3'
  )

  const shouldDisplayGame = value => {
    setDisplayGame(value)
  }

  useEffect(() => {
    if (displayGame) {
      stop()
    } else {
      themeMenuMusic()
    }
  }, [displayGame])

  return (
    <>
      {!displayGame && <GameMenu shouldDisplayGame={shouldDisplayGame} />}
      {displayGame && <Galacta shouldDisplayGame={shouldDisplayGame} />}
    </>
  )
}

export default App
