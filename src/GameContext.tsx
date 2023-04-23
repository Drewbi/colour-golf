import React, { createContext, useState } from 'react';
import { ColourComponent, ColourHex, hexToColour } from './utils/colourUtils';

const winMargin = 30

const defaultColour: ColourComponent = {
    r: 10,
    b: 10,
    g: 10,
}

interface GameContextData {
    guessList: ColourHex[]
    addGuess: (guess: ColourHex) => void
    goal: ColourComponent
    startGame: () => void
    gameComplete: boolean
    completeGame: () => void
}

export const GameContext = createContext<GameContextData>({
    guessList: [],
    addGuess: () => { },
    goal: defaultColour,
    startGame: () => { },
    gameComplete: false,
    completeGame: () => { }
})

type GameProviderProps = {
    children: React.ReactNode
}

const GameProvider = ({ children }: GameProviderProps) => {
    const [guessList, setGuessList] = useState<ColourHex[]>([])
    const [goal, setGoal] = useState<ColourComponent>(defaultColour)
    const [gameComplete, setGameComplete] = useState<boolean>(false)

    const startGame = () => {
        setGameComplete(false)
        const generateHexComponent = () => Math.floor(Math.random() * 255)
        const r = generateHexComponent()
        const g = generateHexComponent()
        const b = generateHexComponent()

        setGuessList([])
        setGoal({ r, g, b })
    }

    const completeGame = () => {
        setGameComplete(true)
    }

    const evalGuess = (guess: ColourHex): ColourComponent => {
        const guessComp = hexToColour(guess)
        return {
            r: goal.r - guessComp.r,
            g: goal.g - guessComp.g,
            b: goal.b - guessComp.b,
        }
    }

    const addGuess = (guess: ColourHex) => {
        setGuessList([...guessList, guess]);
        const { r, g, b } = evalGuess(guess)
        if (r < winMargin && g < winMargin && b < winMargin) completeGame()
    }

    const contextValue: GameContextData = {
        guessList,
        addGuess,
        goal,
        startGame,
        gameComplete,
        completeGame
    }

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider