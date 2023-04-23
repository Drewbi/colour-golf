import { Vector3 } from "three";

type PositionProp = Vector3 | [x: number, y: number, z: number];

interface ObjectProps {
  position: PositionProp;
  colour: string
}

const ballSize = 0.1

export default function Ball({ position, colour }: ObjectProps) {
    // I don't like this
    const newPosition = position instanceof Vector3 ? position.clone() : new Vector3().fromArray(position);
    newPosition.y += ballSize;
    return (
        <mesh position={newPosition}>
          <sphereGeometry args={[ballSize, 10]} />
          <meshBasicMaterial color={colour} />
        </mesh>
    )
}