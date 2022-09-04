const Win = ({ aliensKilled, shotsShot, restart, shouldDisplayGame }) => {
  return (
    <div className="text-white flex flex-col p-4 text-xl items-center gap-4 border border-white w-fit mx-auto">
      <div className="text-8xl p-4">Vyhráls more</div>
      <div>Score: {aliensKilled}</div>
      <div>Shots: {shotsShot}</div>
      <div className="flex flex-col">
        <button className="border border-white p-2 mt-4" onClick={restart}>
          ZNOVA
        </button>
        <button
          className="border border-white p-2 mt-4"
          onClick={() => shouldDisplayGame(false)}
        >
          Hlavní menu
        </button>
      </div>
    </div>
  )
}

export default Win
