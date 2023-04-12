import { useContext, useEffect, useState } from 'react'
import ColourInput from './components/ColourInput'
import LastGuess from './components/LastGuess'
import { GameContext } from './GameContext'
import { ThemeContext } from './ThemeContext'
import { colourToHex } from './utils/colourUtils'

export default function App() {
    const { guessList, goal, startGame } = useContext(GameContext)
    const darkTheme = useContext(ThemeContext)

    const goalHex = colourToHex(goal)

    const lastGuess = guessList.at(-1)

    useEffect(() => {
        startGame()
    }, [])

    return (
        <div className={(darkTheme ? "dark " : "") + "py-20 container h-full flex flex-col items-center justify-between"}>
            <ColourInput />
            {lastGuess && <LastGuess lastGuess={lastGuess} />}
            <div className="absolute top-0 w-full h-full z-back" style={{ backgroundColor: goalHex }}></div>
        </div>
    )
}
