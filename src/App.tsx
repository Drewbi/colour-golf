import { Golf } from './components/Golf'
import { Debug } from './components/Debug'
import Interface from './components/Interface'
import Background from './components/Background'

export default function App() {
    return (
        <>
            <Interface />
            <Background />
            <div className="absolute bottom-0 right-0 w-64 h-64">
                <Debug></Debug>
            </div>
            <div className="absolute top-0 w-full h-full z-back">
                <Golf></Golf>
            </div>
        </>
    )
}
