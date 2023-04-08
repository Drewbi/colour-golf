import { useEffect, useState } from 'react'
import ColourInput from './components/ColourInput'
import LastGuess from './components/LastGuess'

export default function App() {
    const [colourComponents, setColourComponents] = useState([0, 0, 0]) 
    const [lastGuess, setLastGuess] = useState('')

    const darkTheme = colourComponents.reduce((acc, curr) => acc + curr) > (255 * 3) / 2

    const colourHex = calcHexCode(colourComponents)

    function calcHexCode(colourVals: number[]) {
        const formatHex = (val: number) => val.toString(16).padStart(2, '0');
        return colourVals.reduce((acc, curr) => acc + formatHex(curr), '#')
    }

    function startGame() {
        const generateHexComponent = () => Math.floor(Math.random() * 255)
        const r = generateHexComponent()
        const g = generateHexComponent()
        const b = generateHexComponent()

        setColourComponents([r, g, b])
    }

    useEffect(() => {
        startGame()
    }, [])

    function handleGuess(guess: string) {
        setLastGuess(guess)
    }

    return (
        <div className={(darkTheme ? "dark " : "") + "py-20 container h-full flex flex-col items-center justify-between"}>
            <ColourInput setGuess={handleGuess} dark={darkTheme} />
            <LastGuess guess={lastGuess} correct={colourComponents} dark={darkTheme} />
            <div className="absolute top-0 w-full h-full z-back" style={{ backgroundColor: colourHex }}></div>
        </div>
    )
}
