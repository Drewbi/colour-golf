import React from 'react'
import ReactDOM from 'react-dom/client'
import { GameProvider } from './GameContext'
import PositionProvider from './PositionContext'
import App from './App'
import './index.css'
import { ThemeProvider } from './ThemeContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
        <PositionProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </PositionProvider>
    </GameProvider>
  </React.StrictMode>,
)
