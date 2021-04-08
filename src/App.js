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

  const [productFilter, setProductFilter] = useState(false)

  const [userData, setUserData] = useState([])

  const [cartNum, setCartNum] = useState(0)

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

  // 從localStorage讀取資料 判斷購物車內商品數量
  const getCartAmount = () => {
    const Amount = JSON.parse(localStorage.getItem('cart')) || []
    setCartNum(Amount.length)
  }

  useEffect(() => {
    getLocalLogoUser()

    loginMember()

    getCartAmount()
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
          // 登入與否、登出移除資料
          isAuth={isAuth}
          logout={() => {
            localStorage.removeItem('logoUser')
            setIsAuth(false)
          }}
          // 購物車數量
          number={cartNum}
          // 登入後顯示
          lastName={logName}
          logSex={logSex}
          isAuthMain={isAuthMain}
          logoutMain={() => {
            setIsAuthMain(false)
          }}
          // 解除產品過濾
          setNotFilter={() => {
            setProductFilter(false)
          }}
        />

        <div className="forBread">
          <Breadcrumb
            // 解除產品過濾
            setNotFilter={() => {
              setProductFilter(false)
            }}
          />
        </div>

        <div className="forSpace">
          <div className="underBread">
            <Switch>
              {/* 首頁 */}
              <Route exact path="/">
                <Home />
              </Route>

              {/* 產品頁 */}
              <Route path="/products/:type?/:brand?/:id?">
                <Products
                  isAuth={isAuth}
                  // 產品加入購物車 計算數量
                  getCart={getCartAmount}
                  // 產品過濾 初始為不過濾
                  filterOrNot={productFilter}
                  // 產品過濾
                  setFilter={() => {
                    setProductFilter(true)
                  }}
                  // 取消產品過濾
                  setNotFilter={() => {
                    setProductFilter(false)
                  }}
                />
              </Route>

              <Route path="/about">
                <About />
              </Route>

              {/* 購物車 */}
              <Route path="/cart">
                <Cart isAuth={isAuth} />
              </Route>

              {/* 會員中心　＆　註冊 */}
              {isAuth ? (
                <ProtectedRoute path="/usercenter">
                  <UserCenter
                    // 使用ProtectedRoute，一定要有傳入的props！
                    isAuth={isAuth}
                    id={logID}
                    // 判斷姓氏
                    setName={(value) => {
                      setLogName(value.slice(0, 1))
                    }}
                    // 判斷性別 用來分辨先生或小姐
                    setSex={(value) => {
                      setLogSex(value)
                    }}
                  />
                </ProtectedRoute>
              ) : (
                <Route path="/register">
                  <Register
                    userData={userData}
                    addUserToData={(value) => {
                      userData.push(value)
                    }}
                  />
                </Route>
              )}

              {/* 登入頁面　＆　登入後跳轉到首頁 */}
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

              {/* 管理員用的頁面、未完成 */}
              {isAuthMain ? (
                <ProtectedRoute to="/userlist/:id?">
                  <UserList isAuthMain={isAuthMain} />
                </ProtectedRoute>
              ) : (
                ''
              )}

              {/* 無此網址 */}
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
          </div>
        </div>
        <Footer />
      </>
    </Router>
  )
}

export default App
