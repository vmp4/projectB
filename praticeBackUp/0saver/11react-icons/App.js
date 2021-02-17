import React from 'react'
import { Button } from 'react-bootstrap'
import { FaReact, FaApple } from 'react-icons/fa'

function App() {
  return (
    <>
      <Button variant="primary">
        <FaReact />
        React v16
      </Button>
      <FaApple style={{ color: 'red', fontSize: '900' }} />
    </>
  )
}

export default App
