import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <>
      <NavBar isAuth={isAuth} />
      <LoginForm isAuth={isAuth} setIsAuth={setIsAuth} />
    </>
  )
}

export default App
