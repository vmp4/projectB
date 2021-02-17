import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'

import Menu from './components/Menu'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <>
        <Menu />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products/:id">
            <Products />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>

        <Footer />
      </>
    </Router>
  )
}

export default App
