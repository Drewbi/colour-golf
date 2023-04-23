import React from 'react'
import ReactDOM from 'react-dom/client'
import GameProvider from './GameContext'
import App from './App'
import './index.css'
import ThemeProvider from './ThemeContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </GameProvider>
  </React.StrictMode>,
)
