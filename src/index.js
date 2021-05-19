import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
reportWebVitals()
