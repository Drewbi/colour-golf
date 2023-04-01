import { useState } from "react"
import './style.css'

export default function Input() {
    const [input, setInput] = useState('')
    return (
        <div id="input-container">
            <span
                className="input-text"
                id="hex-prefix"
            >#</span>
            <input
                id="colour-input"
                className="input-text"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
        </div>
    )
}