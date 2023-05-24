import { useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { ThemeContext } from '../../ThemeContext';
import Goal from './Goal';
import Ball from './Ball';

export function Golf({ ...props }) {
  return (
    <Canvas {...props}>
      <Scene />
    </Canvas>
  );
}

function Scene() {
    const darkTheme = useContext(ThemeContext)
    const elementColour = darkTheme ? '#252525' : 'white'

    return (
        <>
            <Goal colour={elementColour} />
            <Ball colour={elementColour} />
        </>
    )
}

