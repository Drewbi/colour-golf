import { useContext } from "react"
import { GameContext } from "../GameContext"
import { ThemeContext } from "../ThemeContext"
import { colourToHex } from "../utils/colourUtils"

export function Results() {
    const { guessList, goal } = useContext(GameContext)
    const lastGuess = guessList.at(-1)

    return (
        <div className="text-white dark:text-black flex w-64 h-64 border-4">
            <div style={{ backgroundColor: lastGuess }} className='flex flex-col justify-end items-center h-full w-1/2'>
                <span className="text-xs">Your guess</span>
                <span className='font-extrabold'>{ lastGuess?.toUpperCase() }</span>
            </div>
            <div style={{ backgroundColor: colourToHex(goal) }} className="flex flex-col justify-end items-center h-full w-1/2">
                <span className="text-xs">Actual hex</span>
                <span className='font-extrabold'>{ colourToHex(goal).toUpperCase() }</span>
            </div>
        </div>
    )
}