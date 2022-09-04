import useKeyboardReader from './../hooks/keyboardReader'
import PropTypes from 'prop-types'
import { React, useEffect, useCallback } from 'react'

const GameMenu = ({ shouldDisplayGame }) => {
  const pressedKey = useKeyboardReader()

  const processUserInput = useCallback(
    keyCode => {
      switch (keyCode) {
        case 'Escape':
          window.location.replace('https://www.youtube.com/watch?v=rMcEwaGz_64')
          break
        case 'Enter':
        case 'NumpadEnter':
          shouldDisplayGame(true)
          break
        default:
          break
      }
    },
    [shouldDisplayGame]
  )
  useEffect(() => {
    processUserInput(pressedKey?.code)
  }, [pressedKey, processUserInput])

  return (
    <div className="flex justify-center items-center h-full flex-col">
      <h1 className="text-2xl sm:text-6xl xl:text-8xl mb-28">
        ＳＴＡＲ&nbsp;&nbsp;&nbsp;ＧＡＬＡＣＴ
        <span className="animate-pulse">Ａ</span>
      </h1>
      <div className="w-[180px] flex flex-col gap-8">
        <button
          className="border-2 p-4 font-semibold border-black hover:animate-pulse"
          onClick={() => shouldDisplayGame(true)}
        >
          ＮＥＷ ＧＡＭＥ
        </button>
        <a
          className="border-2 p-4 font-semibold border-black no-underline text-center  hover:animate-pulse"
          href="https://www.youtube.com/watch?v=rMcEwaGz_64"
        >
          ＥＸＩＴ
        </a>
      </div>
      <span className="mt-4">v0.3.1 - 4.9.2022</span>
    </div>
  )
}

GameMenu.propTypes = {
  shouldDisplayGame: PropTypes.func
}

export default GameMenu
