import { useState } from 'react'
import ColourInput from './components/ColourInput'

export default function App() {
    const [colour, setColour] = useState('#ff9071')
    return (
        <div className='py-20 container h-full flex flex-col items-center justify-between'>
            <div className='text-4xl font-extrabold text-white'>FF 90 3E</div>
            <ColourInput />
            <div className='absolute top-0 w-full h-full z-back' style={{ backgroundColor: colour }}></div>
        </div>
    )
}
