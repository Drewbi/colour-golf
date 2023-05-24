import React, { createContext, useState } from 'react';
import { Vector3 } from 'three';

interface PositionContextData {
    ballEndPosition: Vector3
    setBallEndPosition: (position: Vector3) => void
    ballPosition: Vector3
    setBallPosition: (position: Vector3) => void
    goalPosition: Vector3
    setGoalPosition: (position: Vector3) => void
}

export const PositionContext = createContext<PositionContextData>({
    ballEndPosition: new Vector3(),
    setBallEndPosition: () => {},
    ballPosition: new Vector3(),
    setBallPosition: () => {},
    goalPosition: new Vector3(),
    setGoalPosition: () => {},
})

type PositionProviderProps = {
    children: React.ReactNode
}

const PositionProvider = ({ children }: PositionProviderProps) => {
    const [ballEndPosition, setBallEndPosition] = useState<Vector3>(new Vector3())
    const [ballPosition, setBallPosition] = useState<Vector3>(new Vector3())
    const [goalPosition, setGoalPosition] = useState<Vector3>(new Vector3(10, 0, 8))

    const contextValue: PositionContextData = {
        ballEndPosition,
        setBallEndPosition,
        ballPosition,
        setBallPosition,
        goalPosition,
        setGoalPosition
    }

    return (
        <PositionContext.Provider value={contextValue}>
            {children}
        </PositionContext.Provider>
    )
}

export default PositionProvider