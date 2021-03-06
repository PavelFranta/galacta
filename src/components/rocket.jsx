const Rocket = ({ positionX, positionY }) => {
  const rocketCss = 'w-16 h-16 absolute'
  const styleCss = { top: positionY + 'px', left: positionX + 'px' }

  return <img src="rocket.png" className={rocketCss} style={styleCss} />
}

export default Rocket
