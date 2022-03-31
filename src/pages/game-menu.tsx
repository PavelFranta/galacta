import { useState } from 'react'

function GameMenu() {
  const [displayGame, setDisplayGame] = useState(false)
  const shouldDisplayGame = () => {
    setDisplayGame(true)
  }
  return (
    <div className="flex justify-center items-center h-full flex-col">
      {!displayGame && (
        <div className="w-[150px] flex flex-col gap-8">
          <button
            className="border p-4 border-black"
            onClick={shouldDisplayGame}
          >
            Nová hra
          </button>
          <button className="border p-4 border-black">Ladder</button>
          <a
            className="border p-4 border-black no-underline text-center"
            href="https://www.youtube.com/watch?v=rMcEwaGz_64"
          >
            Konec
          </a>
        </div>
      )}
      {displayGame && <div>hra zacina</div>}
    </div>
  )
}

export default GameMenu
