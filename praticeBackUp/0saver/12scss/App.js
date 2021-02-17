import React from 'react'
import { Button } from 'react-bootstrap'
import { FaReact, FaApple } from 'react-icons/fa'
import './styles/custom.scss'

function App() {
  return (
    <>
      <Button variant="primary">
        <FaReact />
        React v16
      </Button>
      <FaApple className="red-icon" />
      <FaReact className="pink-icon" />
    </>
  )
}

export default App
