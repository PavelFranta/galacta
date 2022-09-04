const Rocket = ({ rocketPositionX, rocketPositionY }) => {
  const rocketCss = 'w-16 h-16 absolute z-20'
  const styleCss = { top: rocketPositionY + 'px', left: rocketPositionX + 'px' }

  return (
    <img
      src="images\rocket\rocket.png"
      className={rocketCss}
      style={styleCss}
    />
  )
}

export default Rocket
