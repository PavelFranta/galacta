import useKeyboardReader from './../hooks/keyboardReader'
import { useEffect } from 'react'
import { useSound } from 'use-sound'

const GameMenu = ({ shouldDisplayGame }) => {
  let pressedKey = useKeyboardReader()
  const [goAheadCommanderSound] = useSound('go-ahead-commander.mp3')
  const [menuThemeMusic] = useSound('menu-theme-music.mp3')

  useEffect(() => {
    processUserInput(pressedKey?.code)
  }, [pressedKey])

  useEffect(() => {
    processUserInput(pressedKey?.code)
  }, [pressedKey])

  const processUserInput = keyCode => {
    switch (keyCode) {
      case 'Escape':
        window.location.replace('https://www.youtube.com/watch?v=rMcEwaGz_64')
        break
      case 'Enter':
      case 'NumpadEnter':
        startGame()
        break
      default:
        break
    }
  }

  const startGame = () => {
    shouldDisplayGame(true)
    goAheadCommanderSound()
  }

  return (
    <div className="flex justify-center items-center h-full flex-col">
      <h1 className="text-5xl lg:text-9xl mb-28">
        厶卂乚卂匚丅
        <span className="animate-pulse">卂</span>
      </h1>
      <div className="w-[180px] flex flex-col gap-8">
        <button
          className="border-2 p-4 font-semibold border-black hover:animate-pulse"
          onClick={() => startGame()}
        >
          NEW GAME
        </button>
        <a
          className="border-2 p-4 font-semibold border-black no-underline text-center  hover:animate-pulse"
          href="https://www.youtube.com/watch?v=rMcEwaGz_64"
        >
          EXIT
        </a>
      </div>
    </div>
  )
}

export default GameMenu
