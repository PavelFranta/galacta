const Lose = ({ aliensKilled, shotsShot, restart }) => {
  return (
    <div className="text-white flex flex-col p-4 text-xl items-center gap-4 border border-white w-fit mx-auto">
      <div className="text-8xl p-4">BUSTED</div>
      <div>Score: {aliensKilled}</div>
      <div>Shots: {shotsShot}</div>
      <button className="border border-white p-2 mt-4" onClick={restart}>
        ZNOVA
      </button>
    </div>
  )
}

export default Lose
