const InGameScore = ({ aliensKilled, shotsShot }) => {
  return (
    <div className="text-white flex flex-col absolute bottom-0 right-100 p-4 text-xl z-10">
      <div>Score: {aliensKilled}</div>
      <div>Shots: {shotsShot}</div>
    </div>
  )
}

export default InGameScore
