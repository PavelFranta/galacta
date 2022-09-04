import classNames from 'classnames'

const Alien = ({ positionX, positionY, alienName, pulse }) => {
  const alienPictureFullName = `images\\aliens\\${alienName}.png`
  const rocketCss = classNames('w-16 h-16 absolute', { 'animate-pulse': pulse })
  const styleCss = { top: positionY + 'px', left: positionX + 'px' }

  return (
    <img src={alienPictureFullName} className={rocketCss} style={styleCss} />
  )
}

export default Alien
