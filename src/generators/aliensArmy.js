import { ALIEN_AND_ROCKET_ICON_SIZE } from '../pages/game'

const generateArmy = (screenWidth, rows) => {
  let army = []
  let maxAliensInLine = Math.floor(screenWidth / ALIEN_AND_ROCKET_ICON_SIZE)
  console.log(maxAliensInLine)
  for (let i = 0; i < maxAliensInLine; i++) {
    for (let j = 1; j <= rows; j++) {
      army.push({
        positionX: i * ALIEN_AND_ROCKET_ICON_SIZE,
        positionY: -(j * ALIEN_AND_ROCKET_ICON_SIZE),
        alienName: `alien${j}`,
        pulse: j === 2 ? true : false,
      })
    }
  }
  return army
}

export default generateArmy
