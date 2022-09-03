import { useState } from 'react'
import Galacta from './pages/game'
import GameMenu from './pages/game-menu'

function App() {
  const [displayGame, setDisplayGame] = useState(false)
  const shouldDisplayGame = (value) => {
    setDisplayGame(value)
  }
  return (
    <>
      {!displayGame && <GameMenu shouldDisplayGame={shouldDisplayGame} />}
      {displayGame && <Galacta shouldDisplayGame={shouldDisplayGame} />}
    </>
  )
}

export default App
