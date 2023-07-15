import { Object3DNode, useFrame, useThree } from "@react-three/fiber";
import { useContext, useEffect, useRef } from "react";
import { Group, Mesh, Shape, Vector3 } from "three"
import { PositionContext } from "../../PositionContext";

interface MeshProps extends Object3DNode<Mesh, typeof Mesh> {
    colour: string
}

interface GroupProps extends Object3DNode<Group, typeof Group> {
    colour: string
}

function Flag({ position, colour, ...props }: MeshProps) {
    const path = new Shape()
    path.moveTo(0, 0)
    path.lineTo(0, 0.5)
    path.lineTo(0.4, 0.28)
    path.quadraticCurveTo(0.45, 0.25, 0.4, 0.22)
    path.lineTo(0.4, 0.22)
    path.lineTo(0, 0)

    return (
        <mesh position={position} {...props}>
          <shapeGeometry args={[path]} />
          <meshBasicMaterial color={colour} />
        </mesh>
    )
}

function Pole({ position, colour, ...props }: MeshProps) {
    return (
        <mesh position={position} {...props}>
          <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          <meshBasicMaterial color={colour} />
        </mesh>
    )
}

function Hole({ position, colour, ...props }: MeshProps) {
    return (
        <mesh position={position} {...props}>
          <cylinderGeometry args={[0.5, 0.5, 0.01, 50]} />
          <meshBasicMaterial color={colour} />
        </mesh>
    )
}

export default function Goal({ position, colour, ...props }: GroupProps) {
    const { camera } = useThree()
    const ref = useRef<Group>(null!)

    const flagLookat = new Vector3()
    useFrame(() => {
        flagLookat.set(camera.position.x, 0, camera.position.z)
        ref.current.lookAt(flagLookat)
    })

    return (
        <group ref={ref} position={[0, 0, 0]} {...props}>
            <Flag position={[0, 1.5, 0]} colour={colour} />
            <Pole position={[0, 1, 0]} colour={colour} />
            <Hole position={[0, 0, 0]} colour={colour} />
        </group>
    );
}