import { Fragment, useContext, useEffect } from 'react'
import ColourInput from './components/ColourInput'
import LastGuess from './components/LastGuess'
import { GameContext } from './GameContext'
import { ThemeContext } from './ThemeContext'
import { colourToHex } from './utils/colourUtils'
import { Results } from './components/Results'
import { Golf } from './components/Golf'

export default function App() {
    const { guessList, goal, startGame, gameComplete } = useContext(GameContext)
    const darkTheme = useContext(ThemeContext)

    const goalHex = colourToHex(goal)

    const lastGuess = guessList.at(-1)

    useEffect(() => {
        startGame()
    }, [])

    return (
        <>
            <div className={(darkTheme ? "dark " : "") + "py-20 container h-full flex flex-col items-center gap-10"}>
            {gameComplete 
                ? <Results />
                : lastGuess 
                ? <Fragment>
                        <ColourInput />
                        <LastGuess lastGuess={lastGuess} />
                    </Fragment>
                    : <ColourInput />
                }
            </div>
            <div className="absolute top-0 w-full h-full z-back" style={{ backgroundColor: goalHex }}></div>
            <div className="absolute top-0 w-full h-full z-back">
                <Golf></Golf>
            </div>
                
        </>
    )
}
