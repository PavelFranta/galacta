import { React } from 'react'
import { useSound } from 'use-sound'

const NotOnPhone = () => {
  const [idiotSound] = useSound('sounds/talks/idiot.mp3')
  return (
    <div className="h-full flex items-center justify-center flex-col">
      <h1 className="text-2xl text-center">
        Na mobilu to hrát nebudeš more !!!
      </h1>
      <button
        className="mt-8 border-2 border-black p-4"
        onClick={() => idiotSound()}
      >
        Učinit pokání
      </button>
    </div>
  )
}

export default NotOnPhone
