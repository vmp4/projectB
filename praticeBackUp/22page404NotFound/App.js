import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Breadcrumb from './components/Breadcrumb'
import NotFoundPage from './pages/NotFoundPage'

import Menu from './components/Menu'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <>
        <Menu />
        <Breadcrumb />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products/:type?/:id?">
            <Products />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>

        <Footer />
      </>
    </Router>
  )
}

export default App
