import { useContext, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ThemeContext } from '../../ThemeContext';
import Goal from './Goal';
import Ball from './Ball';

export function Golf() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

function Scene() {
    const { camera } = useThree()
    const darkTheme = useContext(ThemeContext)
    const elementColour = darkTheme ? '#252525' : 'white'
    useEffect(() => {
        camera.position.y = 1
        // camera.position.x = 0
        // camera.position.z = 0
        // camera.rotation.x = -1
    }, [])
    useFrame(() => {
        // camera.position.y += 0.001
    })
    return (
        <>
            <Goal position={[0, 0, 0]} colour={elementColour} />
            <Ball position={[1, 0, 1]} colour={elementColour} />
        </>
    )
}

