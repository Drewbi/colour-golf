import { useState } from 'react'
import './App.css'
import Input from './components/input'

function App() {
    const [colour, setColour] = useState('#ff9071')
    return (
        <div className='container'>
            <div className='last-guess'>FF 90 3E</div>
            <Input />
            <div className='bg' style={{ backgroundColor: colour }}></div>
        </div>
    )
}

export default App
