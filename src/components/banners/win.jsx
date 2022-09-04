import { React } from 'react'
import PropTypes from 'prop-types'

const Win = ({ aliensKilled, shotsShot, restart, shouldDisplayGame }) => {
  return (
    <div className="text-white flex flex-col p-4 text-xl items-center gap-4 border border-white w-fit mx-auto">
      <div className="text-8xl p-4">Vyhráls more</div>
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

Win.propTypes = {
  aliensKilled: PropTypes.number,
  shotsShot: PropTypes.number,
  restart: PropTypes.func.isRequired,
  shouldDisplayGame: PropTypes.func.isRequired
}

export default Win
