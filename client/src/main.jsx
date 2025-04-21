import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LyricsProvider } from './components/Context/LyricsContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <LyricsProvider>
      <App />
    </LyricsProvider>
  </BrowserRouter>,
)
