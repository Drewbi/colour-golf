import { useContext, useEffect } from 'react'
import ColourInput from '../components/ColourInput'
import LastGuess from '../components/LastGuess'
import { GameContext } from '../GameContext'
import { ThemeContext } from '../ThemeContext'
import { Results } from '../components/Results'

export default function Interface() {
    const { startGame, gameComplete } = useContext(GameContext)
    const darkTheme = useContext(ThemeContext)

    useEffect(() => {
        startGame()
    }, [])

    return (
        <>
            <div className={(darkTheme ? "dark " : "") + "py-20 container h-full flex flex-col items-center gap-10"}>
                { gameComplete ? <Results /> : <Game /> }
            </div>
        </>
    )
}

function Game() {
    const { guessList, } = useContext(GameContext)
    const lastGuess = guessList.at(-1)

    return (
        <>
            <ColourInput />
            {lastGuess && <LastGuess lastGuess={lastGuess} />} 
        </>
    )
}
