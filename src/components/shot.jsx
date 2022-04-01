const Shot = ({ positionX, positionY }) => {
  const shotCss = 'block absolute w-1 h-3 bg-white'
  const styleCss = { top: positionY + 'px', left: positionX + 'px' }

  return <div className={shotCss} style={styleCss}></div>
}

export default Shot
