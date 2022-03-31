import { FC } from 'react'

interface Props {
  onClick: (event: any) => void
}

const GameMenu: FC<Props> = ({ onClick }) => {
  return (
    <div className="flex justify-center items-center h-full flex-col">
      <h1 className="text-9xl mb-28">
        厶卂乚卂匚丅
        <span className="animate-pulse">卂</span>
      </h1>
      <div className="w-[180px] flex flex-col gap-8">
        <button
          className="border p-4 border-black hover:animate-pulse"
          onClick={onClick}
        >
          𠘨乇山 厶卂从乇
        </button>
        <button className="border p-4 border-black  hover:animate-pulse">
          丅口尸 丂匚口尺乇
        </button>
        <a
          className="border p-4 border-black no-underline text-center  hover:animate-pulse"
          href="https://www.youtube.com/watch?v=rMcEwaGz_64"
        >
          乇乂工丅
        </a>
      </div>
    </div>
  )
}

export default GameMenu
