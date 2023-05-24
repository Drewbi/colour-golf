import { useContext, useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";
import { Object3DNode, useFrame, useThree } from "@react-three/fiber";
import { PositionContext } from "../../PositionContext";

interface BallProps extends Object3DNode<Mesh, typeof Mesh> {
    colour: string
}

export default function Ball({ position, colour, ...props }: BallProps) {
    const [size, setSize] = useState(0.1)
    const { goalPosition, ballPosition, setBallPosition, ballEndPosition, setBallEndPosition } = useContext(PositionContext)
    const { camera, scene } = useThree()
    const ref = useRef<Mesh>(null!)

    // useEffect(() => {
    //     setBallEndPosition(goalPosition)
    // }, [])

    useFrame(() => {
        const newVec = ballPosition.lerpVectors(ballPosition, ballEndPosition, 0.005)
        setBallPosition(newVec)
        ref.current.position.set(newVec.x, newVec.y, newVec.z)
        const cameraOffset = new Vector3()
        cameraOffset.subVectors(ballPosition, goalPosition).normalize()
        camera.position.set(
            ballPosition.x + cameraOffset.x * 5 - 1,
            ballPosition.y + cameraOffset.y * 5 + 2,
            ballPosition.z + cameraOffset.z * 5 + 1 )
        camera.lookAt(goalPosition)
    })

    return (
        <mesh ref={ref} position={ballPosition} {...props}>
          <sphereGeometry args={[size, 10]} />
          <meshBasicMaterial color={colour} />
        </mesh>
    )
}