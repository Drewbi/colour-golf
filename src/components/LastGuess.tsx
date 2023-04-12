import { ColourHex, hexToColour, hexToSplitHex } from "../utils/colourUtils";

interface PropType {
    lastGuess: ColourHex
}

export default function LastGuess({ lastGuess }: PropType) {
    return (
        <div>
            <div className="mt-3 flex justify-around gap-6">
                {hexToSplitHex(lastGuess).map((splitHex, i) => <div key={`${splitHex}${i}`} className='text-6xl font-extrabold' style={{ color: lastGuess }}>{ splitHex }</div>)}
            </div>
        </div>
    )
}