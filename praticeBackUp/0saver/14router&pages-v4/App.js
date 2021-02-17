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
            <Route exact path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/about" component={About} />
          </Switch>
        </>
      </Router>
    </>
  )
}

export default App
