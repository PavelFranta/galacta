import { React } from 'react'
import PropTypes from 'prop-types'

const InGameScore = ({ aliensKilled, shotsShot, level }) => {
  return (
    <div className="text-white flex flex-col absolute bottom-0 right-100 p-4 text-xl z-10">
      <div>Level: {level}/7</div>
      <div>Score: {aliensKilled}</div>
      <div>Shots: {shotsShot}</div>
    </div>
  )
}

InGameScore.propTypes = {
  aliensKilled: PropTypes.number,
  shotsShot: PropTypes.number,
  level: PropTypes.number
}

export default InGameScore
