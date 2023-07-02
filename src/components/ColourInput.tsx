import { ChangeEvent, FormEvent, KeyboardEvent, useContext, useState } from "react"
import { ArrowRight, Hash } from 'react-feather';
import { GameContext } from "../GameContext";
import { isColourHex } from "../utils/colourUtils";

export default function Input() {
    const { addGuess } = useContext(GameContext)

    const [input, setInput] = useState<string>('')
    const formattedInput = '#' + input
    const inputValid = isColourHex(formattedInput)

    function handleInput(event: ChangeEvent<HTMLInputElement>) {
        const hexRegex = /^[0-9A-Fa-f]{0,6}$/
        const inputValue = event.target.value
        if (hexRegex.test(inputValue)) {
            setInput(inputValue.toUpperCase())
        }
    }

    function handleKeyDown(event: KeyboardEvent) {    
        if (event.key === "Enter") {
            handleSubmit(event)
        }
    }

    function handleSubmit(event: FormEvent) {    
        event.preventDefault();
        if (isColourHex(formattedInput)) {
            addGuess(formattedInput)
            setInput('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center px-4 border-2 rounded overflow-hidden bg-white border-white focus-within:outline-black focus-within:border-black dark:bg-black dark:border-black dark:focus-within:outline-white dark:focus-within:border-white">
            <Hash className="mx-1 text-black dark:text-white" size={36} strokeWidth={3} />
            <input
                className="h-16 w-full bg-white dark:bg-black text-black dark:text-white text-center text-4xl font-extrabold outline-none"
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
            />
            <button style={{ visibility: inputValid ? 'visible' : 'hidden'}}>
                <ArrowRight className="mx-1 text-black dark:text-white" size={36} strokeWidth={3} />
            </button>
        </form>
    )
}