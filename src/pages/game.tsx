import { useState, useEffect } from 'react'
import Rocket from '../components/rocket'
import useWindowDimensions from '../hooks/windowDimensions'

function Galacta() {
  const { height, width } = useWindowDimensions()

  return (
    <div className="w-full h-full bg-gray-900 relative">
      <Rocket positionX={width / 2 - 64} positionY={height / 2 - 64} />
    </div>
  )
}

export default Galacta
