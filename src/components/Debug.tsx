import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { useMemo, useRef } from "react";
import { BufferAttribute, Mesh, PerspectiveCamera } from "three";

export function Debug({ ...props }) {
    const [{ debug }, set] = useControls(() => ({ debug: false }))

    return (
        <>
            { debug ?
                <Visualisation { ...props } /> :
                <button 
                    className="absolute bottom-0 right-0 px-2
                    text-white dark:text-black text-center text-sm font-extrabold
                    border-2 rounded 
                    bg-black border-black  hover:border-black dark:bg-black dark:border-white dark:hover:border-black"
                    onClick={() => set({ debug: true })}
                >{"{}"}</button> }
            <Leva
                hidden={!debug}
            />
        </>
    )
}

function Visualisation({ ...props }) {
    const camera = new PerspectiveCamera()
    camera.position.z = 500
    return (
        <Canvas
            orthographic={true}
            camera={camera}
            {...props}
        >
            <Box />
            <Points />
            <OrbitControls
                autoRotateSpeed={0.5}
                autoRotate={true}
                rotateSpeed={0.5}
                enableZoom={false}
                enablePan={false}
            />
        </Canvas>
    );
}

function Points() {
    const points = useMemo(() => {
        return new BufferAttribute(new Float32Array(new Array(9).fill(0).map((v) => (0.5 - Math.random()) * 255)), 3)
    }, [])

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" {...points} />
            </bufferGeometry>
            <pointsMaterial
                color={[255, 255, 255]}
                size={20}
                sizeAttenuation={true}
            ></pointsMaterial>
        </points>
    )
}

function Box() {
    const ref = useRef<Mesh>(null!)
    const minCoord = -128
    const maxCoord = 128

    const lines = [
        { colour: 0x6666aa, points: new Float32Array([minCoord, minCoord, maxCoord, maxCoord, minCoord, maxCoord])},
        { colour: 0x66aa66, points: new Float32Array([minCoord, minCoord, maxCoord, minCoord, maxCoord, maxCoord])},
        { colour: 0xaa6666, points: new Float32Array([minCoord, minCoord, maxCoord, minCoord, minCoord, minCoord])}
    ]
    
    return (
        <group>
            <mesh ref={ref} position={[0, 0, 0]}>
                <boxGeometry args={[255, 255, 255]} />
                <meshBasicMaterial transparent={true} opacity={0.5} color={[255, 255, 255]} />
            </mesh>
            {lines.map(l => 
                <line key={l.colour}>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" count={l.points.length / 3} array={l.points} itemSize={3} />
                    </bufferGeometry>
                    <lineBasicMaterial color={l.colour}>
                    </lineBasicMaterial>
                </line>
            )}
        </group>
    )
}
