import { useCallback, useEffect, useMemo, useState } from 'react'

import { gsap, Power3 } from 'gsap'

import './styles/global.css'

const App: React.FC = () => {
  const [text, setText] = useState('SPLIT IT')

  const letters = useMemo(() => text?.split(''), [text])

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (text !== event.target.value) setText(event.target.value)
    },
    [text]
  )

  const handleAnimate = useCallback(() => {
    gsap.fromTo(
      '.letter-stagger',
      {
        opacity: 0,
        duration: 0.8,
        y: 50,
        stagger: 0.1,
        ease: Power3.easeOut,
      },
      {
        opacity: 1,
        duration: 0.8,
        y: 0,
        stagger: 0.1,
        ease: Power3.easeOut,
      }
    )
  }, [])

  useEffect(() => {
    handleAnimate()
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
      <div className="basic-font flex gap-4 items-center">
        <label htmlFor="custom-text">Custom text</label>
        <input
          id="custom-text"
          type="text"
          value={text}
          className="text-zinc-900 px-4 h-10 rounded-md"
          onChange={handleTextChange}
        />
        <button
          className="bg-emerald-500 hover:bg-emerald-600 transition-all h-10 w-32 rounded-md"
          onClick={handleAnimate}
        >
          Animate
        </button>
      </div>
      <h1 className="text-[2.5vw] font-black italic wide-font text-center">
        {letters?.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className={
              letter !== ' ' ? 'letter-stagger inline-block' : undefined
            }
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  )
}

export default App
