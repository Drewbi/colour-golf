import React, { createContext, useState } from 'react';
import { ColourComponent, ColourHex } from './utils/colourUtils';

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
}

export const GameContext = createContext<GameContextData>({
    guessList: [],
    addGuess: () => { },
    goal: defaultColour,
    startGame: () => { },
})

type GameProviderProps = {
    children: React.ReactNode
}

const GameProvider = ({ children }: GameProviderProps) => {
    const [guessList, setGuessList] = useState<ColourHex[]>([])
    const [goal, setGoal] = useState<ColourComponent>(defaultColour)

    const startGame = () => {
        const generateHexComponent = () => Math.floor(Math.random() * 255)
        const r = generateHexComponent()
        const g = generateHexComponent()
        const b = generateHexComponent()

        setGuessList([])
        setGoal({ r, g, b })
    }

    const addGuess = (guess: ColourHex) => {
        setGuessList([...guessList, guess]);
    }

    const contextValue: GameContextData = {
        guessList,
        addGuess,
        goal,
        startGame,
    }

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}

export default GameProvider