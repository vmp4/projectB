import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './utils/ProtectedRoute'
import Cart from './pages/Cart'
import UserList from './pages/UserList'
import UserCenter from './pages/UserCenter'

import Menu from './components/Menu'
import Breadcrumb from './components/Breadcrumb'
import Footer from './components/Footer'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isAuthMain, setIsAuthMain] = useState(false)

  const [userData, setUserData] = useState([])
  const [loger, setLoger] = useState('')
  const [logID, setLogID] = useState('')
  const [logName, setLogName] = useState('')
  const [logSex, setLogSex] = useState('')

  // 進入首頁讀取資料
  async function loginMember() {
    const requert = new Request('http://localhost:5555/user', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(requert)
    const data = await response.json()

    setUserData(data)
  }

  // 從localStorage讀取資料 判斷是否登入過
  const getLocalLogoUser = () => {
    if (localStorage.getItem('logoUser') !== null) {
      const newLoger = localStorage.getItem('logoUser')
      setLoger(newLoger)
    }
  }

  useEffect(() => {
    getLocalLogoUser()

    loginMember()
  }, [])

  // 登入成功不會因為重整頁面而取消
  useEffect(() => {
    getLocalLogoUser()
    if (loger !== '' && loger !== null) {
      const data = JSON.parse(loger)
      setIsAuth(true)
      setLogID(data[0].id)
      setLogName(data[0].name.slice(0, 1))
      setLogSex(data[0].sex)
    }
  }, [loger])

  return (
    <Router>
      <>
        <Menu
          isAuth={isAuth}
          logout={() => {
            localStorage.removeItem('logoUser')
            setIsAuth(false)
          }}
          lastName={logName}
          logSex={logSex}
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
                <UserCenter
                  isAuth={isAuth}
                  id={logID}
                  setName={(value) => {
                    setLogName(value.slice(0, 1))
                  }}
                  setSex={(value) => {
                    setLogSex(value)
                  }}
                />
              </ProtectedRoute>
            ) : (
              <Route path="/register">
                <Register userData={userData} />
              </Route>
            )}
            {!isAuth ? (
              <Route path="/login">
                <Login
                  isAuth={isAuth}
                  login={() => {
                    setIsAuth(true)
                  }}
                  userData={userData}
                  getID={(value) => {
                    setLogID(value)
                  }}
                  getName={(value) => {
                    setLogName(value.slice(0, 1))
                  }}
                  getSex={(value) => {
                    setLogSex(value)
                  }}
                />
              </Route>
            ) : (
              <Route>
                <Redirect to="/" />
              </Route>
            )}
            {isAuthMain ? (
              <ProtectedRoute to="/userlist/:id?">
                <UserList isAuthMain={isAuthMain} />
              </ProtectedRoute>
            ) : (
              ''
            )}
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
