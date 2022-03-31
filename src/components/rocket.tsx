import { FC } from 'react'
import classnames from 'classnames'

interface Props {
  positionX: number
  positionY: number
}

const Rocket: FC<Props> = ({ positionX, positionY }) => {
  const rocketCss = 'w-16 h-16 absolute'
  const styleCss: any = { top: positionY + 'px', left: positionX + 'px' }

  return <img src="rocket.png" className={rocketCss} style={styleCss} />
}

export default Rocket
