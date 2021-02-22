import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Breadcrumb from './components/Breadcrumb'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './utils/ProtectedRoute'
import Cart from './pages/Cart'
import UserList from './pages/UserList'
import UserCenter from './pages/UserCenter'

import Menu from './components/Menu'
import Footer from './components/Footer'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isAuthMain, setIsAuthMain] = useState(false)

  return (
    <Router>
      <>
        <Menu
          isAuth={isAuth}
          logout={() => {
            setIsAuth(false)
          }}
          isAuthMain={isAuthMain}
          logoutMain={() => {
            setIsAuthMain(false)
          }}
        />
        <div
          className="container"
          style={{ marginTop: '55px', marginBottom: '60px' }}
        >
          <Breadcrumb />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/products/:type?/:id?">
              <Products isAuth={isAuth} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/cart">
              <Cart isAuth={isAuth} />
            </Route>
            {isAuth ? (
              <ProtectedRoute path="/usercenter">
                {/* 使用ProtectedRoute，一定要有傳入的props！ */}
                <UserCenter isAuth={isAuth} />
              </ProtectedRoute>
            ) : (
              <Route path="/register">
                <Register />
              </Route>
            )}
            {!isAuth ? (
              <Route path="/login">
                <Login
                  isAuth={isAuth}
                  login={() => {
                    setIsAuth(true)
                  }}
                  logout={() => {
                    setIsAuth(false)
                  }}
                />
              </Route>
            ) : (
              <Route>
                <Redirect to="/usercenter" />
              </Route>
            )}
            <ProtectedRoute to="/userlist">
              <UserList isAuth={isAuth} />
            </ProtectedRoute>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </>
    </Router>
  )
}

export default App
