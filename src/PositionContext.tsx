import React, { createContext, useContext, useEffect, useState } from 'react';
import { Vector3 } from 'three';
import { GameContext } from './GameContext';

interface PositionContextData {
    ballEndPosition: Vector3
    setBallEndPosition: (position: Vector3) => void
    ballPosition: Vector3
    setBallPosition: (position: Vector3) => void
}

export const PositionContext = createContext<PositionContextData>({
    ballEndPosition: new Vector3(),
    setBallEndPosition: () => {},
    ballPosition: new Vector3(),
    setBallPosition: () => {},
})

type PositionProviderProps = {
    children: React.ReactNode
}

const PositionProvider = ({ children }: PositionProviderProps) => {
    const { guessList, gameStarted } = useContext(GameContext)
    const [ballEndPosition, setBallEndPosition] = useState<Vector3>(new Vector3(10, 0, 10))
    const [ballPosition, setBallPosition] = useState<Vector3>(new Vector3(10, 0, 10))

    useEffect(() => {
        console.log('Guessed: ' + guessList.at(-1))
    }, [guessList])

    useEffect(() => {
        console.log({ gameStarted })
        if(gameStarted) {
            setBallPosition(new Vector3(20, 0, 20))
            setBallEndPosition(new Vector3(20, 0, 20))
        }
    }, [gameStarted])

    const contextValue: PositionContextData = {
        ballEndPosition,
        setBallEndPosition,
        ballPosition,
        setBallPosition,
    }

    return (
        <PositionContext.Provider value={contextValue}>
            {children}
        </PositionContext.Provider>
    )
}

export default PositionProvider