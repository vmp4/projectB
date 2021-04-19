import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BreakpointProvider } from './breakpoint'

const queries = {
  sm: '(max-width: 708px)',
  md: '(max-width: 1399px)',
  lg: '(max-width: 1745px)',
  // 直向(手機)為TRUE，橫向為FALSE
  or: '(orientation: portrait)',
}

ReactDOM.render(
  <React.StrictMode>
    <BreakpointProvider queries={queries}>
      <App />
    </BreakpointProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
