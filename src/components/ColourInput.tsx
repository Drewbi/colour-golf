import { ChangeEvent, useState } from "react"

export default function Input() {
    const [input, setInput] = useState<string>('')

    function handleInput(event: ChangeEvent<HTMLInputElement>) {
        const hexRegex = /^[0-9A-Fa-f]{0,6}$/;
        const inputValue = event.target.value;
        if (hexRegex.test(inputValue)) {
            setInput(inputValue.toUpperCase());
        }
    }

    return (
        <div className="bg-black rounded overflow-hidden flex items-center px-4">
            <span className="mx-2 text-white text-4xl font-extrabold">#</span>
            <input
                className="h-16 w-full bg-black text-white text-center text-4xl font-extrabold "
                value={input}
                onChange={handleInput}
            />
        </div>
    )
}