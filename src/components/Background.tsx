import { useContext } from "react"
import { GameContext } from "../GameContext"
import { colourToHex } from "../utils/colourUtils"

export default function Background() {
    const { goal } = useContext(GameContext)
    const goalHex = colourToHex(goal)

    return (
        <div className="absolute top-0 w-full h-full z-back" style={{ backgroundColor: goalHex }}></div>
    )
}