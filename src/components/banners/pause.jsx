const Pause = ({ setPausedGame, shouldDisplayGame }) => {
  return (
    <div className="text-white flex flex-col p-4 text-xl items-center gap-4 relative z-20 bg-gray-900 w-fit mx-auto border border-white">
      <div className="text-white text-8xl p-4">PAUSE</div>
      <div className="flex flex-col">
        <button
          className="border border-white p-2 mt-4"
          onClick={() => setPausedGame(false)}
        >
          Pokračovat
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

export default Pause
