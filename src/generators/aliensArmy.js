import { ALIEN_AND_ROCKET_ICON_SIZE } from '../pages/game'

const generateArmy = (screenWidth, rows) => {
  const army = []
  const maxAliensInLine = Math.floor(screenWidth / ALIEN_AND_ROCKET_ICON_SIZE)

  for (let i = 0; i < maxAliensInLine; i++) {
    for (let j = 1; j <= rows; j++) {
      army.push({
        positionX: i * ALIEN_AND_ROCKET_ICON_SIZE,
        positionY: -(j * ALIEN_AND_ROCKET_ICON_SIZE),
        alienName: `alien${j}`,
        pulse: j === 2
      })
    }
  }
  return army
}

export default generateArmy
