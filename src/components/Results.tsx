import { useContext } from "react"
import { GameContext } from "../GameContext"
import { ThemeContext } from "../ThemeContext"

export function Results() {
    const { guessList } = useContext(GameContext)
    const darkTheme = useContext(ThemeContext)
    const lastGuess = guessList.at(-1)
    const colour = lastGuess ? lastGuess : darkTheme ? '#252525' : '#FFF'

    return (
        <div style={{ color: colour }} className='text-6xl font-extrabold'>
                You Win
        </div>
    )
}