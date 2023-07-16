import { useContext, useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { Object3DNode, useFrame, useThree } from "@react-three/fiber";
import { PositionContext } from "../../PositionContext";
import { GameContext } from "../../GameContext";
import "../../utils/mapUtils"
import { hexToColour } from "../../utils/colourUtils";
import { getNextBallPos } from "../../utils/mapUtils";

interface BallProps extends Object3DNode<Mesh, typeof Mesh> {
    colour: string
}

export default function Ball({ position, colour, ...props }: BallProps) {
    const [size, setSize] = useState(0.1)
    const { gameStarted, guessList, goal } = useContext(GameContext)
    const { ballPosition, setBallPosition, ballEndPosition, setBallEndPosition } = useContext(PositionContext)
    const { camera, scene } = useThree()
    const ref = useRef<Mesh>(null!)

    useEffect(() => {
        console.log('ball', ref.current.position)
        console.log('end', ballEndPosition)

    }, [setBallPosition])

    useEffect(() => {
        const goalPos = new Vector3(goal.r, goal.g, goal.b)
        if (guessList.length > 1) {
            const currGuess = hexToColour(guessList.at(-2)!)
            const nextGuess = hexToColour(guessList.at(-1)!)
            const ballPos = new Vector3(currGuess.r, currGuess.b, currGuess.g)
            const nextPos = new Vector3(nextGuess.r, nextGuess.b, nextGuess.g)
            try {
                const ballEndPos = getNextBallPos(goalPos, ballPos, nextPos)
                setBallEndPosition(new Vector3(ballEndPos.x, 0, ballEndPos.y))
            } catch (error) {
                console.log('Ball not moved:' + error)
            }
        }
    }, [guessList])

    const cameraOffset = new Vector3()
    const originVector = new Vector3()

    useFrame(() => {
        ref.current.position.lerp(ballEndPosition, 0.005)
        
        cameraOffset.set(...ref.current.position.toArray()).sub(originVector).normalize()
        camera.position.set(
            ref.current.position.x + cameraOffset.x * 5 - 1,
            ref.current.position.y + cameraOffset.y * 5 + 2,
            ref.current.position.z + cameraOffset.z * 5 + 1 )
        camera.lookAt(originVector)
    })

    return (
        <mesh ref={ref} position={ballPosition} {...props}>
          <sphereGeometry args={[size, 10]} />
          <meshBasicMaterial color={colour} />
        </mesh>
    )
}
