const generateArmy = (screenWidth, rows) => {
  let army = []
  for (let i = 0; i < screenWidth; i += 64) {
    for (let j = 1; j <= rows; j++) {
      army.push({
        positionX: i,
        positionY: -(j * 64),
        alienName: `alien${j}`,
        pulse: j === 2 ? true : false,
      })
    }
  }
  return army
}

export default generateArmy
