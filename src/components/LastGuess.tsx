import { ArrowDown, ArrowUp, Check } from "react-feather";

interface PropType {
    guess: string;
    correct: number[]
    dark: boolean;
}

export default function LastGuess({ guess, correct }: PropType) {
    const shortRegex = /^([a-zA-Z0-9])([a-zA-Z0-9])([a-zA-Z0-9])$/
    const longRegex = /^([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})$/

    const splitGuesses = (val: string): string[] => {
        let matches = null
        if (val.length === 3){
            matches = shortRegex.exec(val)
        } else if (val.length === 6) {
            matches = longRegex.exec(val)
        }
        return matches?.slice(1, 4) ?? []
    }

    const splitValues = (val: string): number[] => {
        const guesses = splitGuesses(val)
        if (!guesses.length) return []
        return guess.length === 3
            ? [
                parseInt(guesses[0] + guesses[0], 16),
                parseInt(guesses[1] + guesses[1], 16),
                parseInt(guesses[2] + guesses[2], 16)
            ] : [
                parseInt(guesses[0], 16),
                parseInt(guesses[1], 16),
                parseInt(guesses[2], 16)
            ]
    }

    const guessEvalBuffer = 5

    const evalGuessSegment = (guessValue: number, correctValue: number) => {
        return correctValue - guessValue
    }

    return (
        <div>
            <div className="mt-3 flex justify-around gap-6">
                {splitGuesses(guess).map((splitGuess, i) => <div key={`${splitGuess} + ${i}`} className='text-6xl font-extrabold' style={{ color: `#${guess}` }}>{ splitGuess }</div>)}
            </div>
            <div className="mt-3 flex justify-around">
                {splitValues(guess).map((splitVal, i) => {
                    const result = evalGuessSegment(splitVal, correct[i])
                    if (result + guessEvalBuffer < 0) return (<ArrowDown key={`${splitVal} + ${i}`} />)
                    if (result - guessEvalBuffer > 0) return (<ArrowUp key={`${splitVal} + ${i}`} />)
                    return (<Check key={`${splitVal} + ${i}`} />)
                })}
            </div>
        </div>
    )
}