const generateArmy = (screenWidth, rows) => {
  let army = []
  for (let i = 0; i < screenWidth; i += 64) {
    for (let j = 0; j < rows; j++) {
      army.push({ positionX: i, positionY: -(j * 100), alienName: 'alien' })
    }
  }
  return army
}

export default generateArmy
