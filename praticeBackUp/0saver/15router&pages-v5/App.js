import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'

function App() {
  return (
    <>
      <Router>
        <>
          <Link to="/">首頁</Link>
          <Link to="/products">產品</Link>
          <Link to="/about">關於我</Link>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </>
      </Router>
    </>
  )
}

export default App
