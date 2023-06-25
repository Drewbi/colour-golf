import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, OrthographicCamera, PerspectiveCamera } from "three";

export function Debug({ ...props }) {
  const camera = new PerspectiveCamera()
  camera.position.z = 500
  return (
    <Canvas 
      orthographic={true} 
      camera={camera}
      {...props}
    >
      <Box />
    </Canvas>
  );
}

function Box() {
  useFrame(() => {
    ref.current.rotation.y += 0.001
    ref.current.rotation.x += 0.001
    ref.current.rotation.z += 0.001
  });
  const ref = useRef<Mesh>(null!)
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
        <boxGeometry args={[255, 255, 255]} />
        <meshBasicMaterial transparent={true} opacity={0.5} color={[200, 200, 200]} />
    </mesh>
  )
}
