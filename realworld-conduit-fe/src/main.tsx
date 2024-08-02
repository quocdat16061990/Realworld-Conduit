import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import ReactQueryProvider from 'src/core/context/ReactQueryProvider'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './core/context/AppContext'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ReactQueryProvider>
    </BrowserRouter>
  </React.StrictMode>
)
