import { React } from 'react'
import PropTypes from 'prop-types'

export const CRASH = 'CRASH'
export const BREAK_THRU = 'BREAK_THRU'

const Lose = ({
  aliensKilled,
  shotsShot,
  restart,
  shouldDisplayGame,
  reason
}) => {
  return (
    <div className="text-white flex flex-col p-4 text-xl items-center gap-4 border z-20 relative bg-slate-900 border-white w-fit mx-auto">
      <div className="text-8xl p-4">
        {reason === CRASH ? 'LAMA SE SRAZILA' : 'DOSTALI TE'}
      </div>
      <div>Score: {aliensKilled}</div>
      <div>Shots: {shotsShot}</div>
      <div className="flex flex-col">
        <button className="border border-white p-2 mt-4" onClick={restart}>
          ZNOVA
        </button>
        <button
          className="border border-white p-2 mt-4"
          onClick={() => shouldDisplayGame(false)}
        >
          MAIN MENU
        </button>
      </div>
    </div>
  )
}

Lose.propTypes = {
  aliensKilled: PropTypes.number,
  shotsShot: PropTypes.number,
  restart: PropTypes.func.isRequired,
  shouldDisplayGame: PropTypes.func.isRequired,
  reason: PropTypes.string.isRequired
}

export default Lose
