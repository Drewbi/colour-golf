import { Shape, Vector3 } from "three"

type PositionProp = Vector3 | [x: number, y: number, z: number];

interface ObjectProps {
  position: PositionProp;
  colour: string
}

function Flag({ position, colour }: ObjectProps) {
    const path = new Shape()
    path.moveTo(0, 0)
    path.lineTo(0, 0.5)
    path.lineTo(0.5, 0.25)
    path.lineTo(0, 0)

    return (
        <mesh position={position}>
          <shapeGeometry args={[path]} />
          <meshBasicMaterial color={colour} />
        </mesh>
    )
}

function Pole({ position, colour }: ObjectProps) {
    return (
        <mesh position={position}>
          <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          <meshBasicMaterial color={colour} />
        </mesh>
    )
}

function Hole({ position, colour }: ObjectProps) {
    return (
        <mesh position={position}>
          <cylinderGeometry args={[0.5, 0.5, 0.01, 50]} />
          <meshBasicMaterial color={colour} />
        </mesh>
    )
}

export default function Goal({ position, colour }: ObjectProps) {
    
    return (
        <group position={position}>
            <Flag position={[0, 1.5, 0]} colour={colour} />
            <Pole position={[0, 1, 0]} colour={colour} />
            <Hole position={[0, 0, 0]} colour={colour} />
        </group>
    );
}