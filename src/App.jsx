import { useState } from 'react'
import Galacta from './pages/game'
import GameMenu from './pages/game-menu'

function App() {
  const [displayGame, setDisplayGame] = useState(false)
  const shouldDisplayGame = () => {
    setDisplayGame(true)
  }
  return (
    <>
      {!displayGame && <GameMenu onClick={shouldDisplayGame} />}
      {displayGame && <Galacta />}
    </>
  )
}

export default App
