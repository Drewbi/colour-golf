import React, { createContext, useState } from 'react';
import { ColourComponent, ColourHex, hexToColour } from './utils/colourUtils';
import { useControls } from 'leva';

const winMargin = 12

const defaultColour: ColourComponent = {
    r: 30,
    g: 30,
    b: 30,
}

interface GameContextData {
    guessList: ColourHex[]
    addGuess: (guess: ColourHex) => void
    goal: ColourComponent
    gameStarted: boolean
    startGame: () => void
    gameComplete: boolean
    completeGame: () => void
}

export const GameContext = createContext<GameContextData>({
    guessList: [],
    addGuess: () => { },
    goal: defaultColour,
    gameStarted: false,
    startGame: () => { },
    gameComplete: false,
    completeGame: () => { }
})

type GameProviderProps = {
    children: React.ReactNode
}

export const GameProvider = ({ children }: GameProviderProps) => {
    const [guessList, setGuessList] = useState<ColourHex[]>([])

    const [{ goal, gameComplete, gameStarted }, set] = useControls(() => ({
        goal: {...defaultColour},
        gameComplete: false,
        gameStarted: false,
    }))

    const setGameComplete = (completed: boolean) => set({ gameComplete: completed })
    const setGameStarted = (started: boolean) => set({ gameStarted: started })
    const setGoal = (colour: ColourComponent) => set({ goal: colour })

    const startGame = () => {
        setGameStarted(true)
        setGameComplete(false)
        const generateHexComponent = () => Math.floor(Math.random() * 255)
        const r = generateHexComponent()
        const g = generateHexComponent()
        const b = generateHexComponent()

        setGuessList([])
        setGoal({ r, g, b })
    }

    const completeGame = () => {
        setGameStarted(false)
        setGameComplete(true)
    }

    const evalGuess = (guess: ColourHex): ColourComponent => {
        const guessComp = hexToColour(guess)
        return {
            r: Math.abs(goal.r - guessComp.r),
            g: Math.abs(goal.g - guessComp.g),
            b: Math.abs(goal.b - guessComp.b),
        }
    }

    const addGuess = (guess: ColourHex) => {
        setGuessList([...guessList, guess]);
        const { r, g, b } = evalGuess(guess)
        console.log('Evaluation', {r,g,b})
        if (r < winMargin && g < winMargin && b < winMargin) completeGame()
    }

    const contextValue: GameContextData = {
        guessList,
        addGuess,
        goal,
        startGame,
        gameStarted,
        gameComplete,
        completeGame
    }

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}
