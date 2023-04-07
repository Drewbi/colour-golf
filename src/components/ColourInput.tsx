import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react"
import { ArrowRight, Hash } from 'react-feather';

interface PropType {
    setGuess: (guess: string) => void;
    dark: boolean;
}

export default function Input({ setGuess, dark }: PropType) {
    const [input, setInput] = useState<string>('')
    const inputValid = input.length === 3 || input.length === 6

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
        const guessRegex = /^([0-9A-Fa-f]{3}){1,2}$/
        if (guessRegex.test(input)) {
            setGuess(input)
            setInput('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center px-4 border-2 rounded overflow-hidden bg-white border-white focus-within:outline-black focus-within:border-black dark:bg-black dark:border-black dark:focus-within:outline-black dark:focus-within:border-black ">
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