import { OrbitControls, Point, Points } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { useContext, useRef } from "react";
import { Mesh, PerspectiveCamera, TextureLoader } from "three";
import { GameContext } from "../GameContext";
import { hexToColour } from "../utils/colourUtils";
import goalImg from "../assets/dbug-flag.png"
import ballImg from "../assets/dbug-ball.png"
import nextImg from "../assets/dbug-next.png"

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
            <Indicators />
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

function Indicators() {
    const { goal, guessList } = useContext(GameContext)
    const nextGuess = guessList.at(-1)
    const currentGuess = guessList.at(-2)
    const nextGuessComp = hexToColour(nextGuess ? nextGuess : '#000')
    const currentGuessComp = hexToColour(currentGuess ? currentGuess : '#000')

    const goalIcon = useLoader(TextureLoader, goalImg);
    const ballIcon = useLoader(TextureLoader, ballImg);
    const nextIcon = useLoader(TextureLoader, nextImg);

    const offset = 255 / 2
    return (
        <>
            <Points limit={1} range={1000}>
                <pointsMaterial
                    map={goalIcon}
                    color={[255, 255, 255]}
                    size={50}
                    sizeAttenuation
                    transparent={false}
                    alphaTest={0.5}
                    opacity={1.0}
                ></pointsMaterial>
                <Point position={[goal.r - offset, goal.g - offset, goal.b - offset]} />
            </Points>
            <Points limit={1} range={1000}>
                <pointsMaterial
                    map={ballIcon}
                    color={[255, 255, 255]}
                    size={50}
                    sizeAttenuation
                    transparent={false}
                    alphaTest={0.5}
                    opacity={1.0}
                ></pointsMaterial>
                <Point position={[nextGuessComp.r - offset, nextGuessComp.g - offset, nextGuessComp.b - offset]} />
            </Points>
            <Points limit={1} range={1000}>
                <pointsMaterial
                    map={nextIcon}
                    color={[255, 255, 255]}
                    size={50}
                    sizeAttenuation
                    transparent={false}
                    alphaTest={0.5}
                    opacity={1.0}
                ></pointsMaterial>
                <Point position={[currentGuessComp.r - offset, currentGuessComp.g - offset, currentGuessComp.b - offset]} />
            </Points>
        </>
    )
}

function Box() {
    const ref = useRef<Mesh>(null!)
    const minCoord = -128
    const maxCoord = 128

    const lines = [
        { colour: 0xaa6666, points: new Float32Array([maxCoord, minCoord, minCoord, minCoord, minCoord, minCoord])},
        { colour: 0x66aa66, points: new Float32Array([minCoord, maxCoord, minCoord, minCoord, minCoord, minCoord])},
        { colour: 0x6666aa, points: new Float32Array([minCoord, minCoord, maxCoord, minCoord, minCoord, minCoord])}
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
