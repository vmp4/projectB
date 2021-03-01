import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Col, Button } from 'react-bootstrap'

function Login(props) {
  const [validated, setValidated] = useState(false)

  const [userData, setUserData] = useState([])
  const [loginCount, setLoginCount] = useState('')
  const [loginPass, setLoginPass] = useState('')

  // 讀取資料
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

  // 登入確認帳號
  function checkDataForCount(value) {
    for (let i = 0; i < userData.length; i++) {
      if (value === userData[i].username || value === userData[i].mail) {
        return true
      }
    }
    return false
  }

  // 登入確認密碼
  function checkDataForPass(value) {
    for (let i = 0; i < userData.length; i++) {
      if (value === userData[i].password) {
        return true
      }
    }
    return false
  }

  // 登入確認帳號密碼
  const checkLogin = () => {
    const getUser = userData.find((value) => {
      if (
        (loginCount === value.username && loginPass === value.password) ||
        (loginCount === value.mail && loginPass === value.password)
      ) {
        props.history.push('/')
        return true
      } else {
        return false
      }
    })
    console.log(getUser)

    let setUser = [getUser]
    if (setUser !== undefined) {
      localStorage.setItem('logoUser', JSON.stringify(setUser))
    }

    return props.login
  }

  // 確認資料及送出
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      checkLogin()
    }

    setValidated(true)
  }

  useEffect(() => {
    loginMember()
  }, [])

  // useEffect(() => {
  //   checkDataForCount(loginCount)
  // }, [loginCount])

  console.log(userData)
  console.log(loginCount)
  console.log(loginPass)
  console.log(checkDataForCount(loginCount))
  console.log(checkDataForPass(loginPass))

  return (
    <>
      <h1>目前會員狀態：{props.isAuth ? '已登入' : '未登入'}</h1>
      <div style={{ display: 'flex' }}>
        {!props.isAuth ? (
          <button onClick={props.login}>登入</button>
        ) : (
          <button onClick={props.logout}>登出</button>
        )}
      </div>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="count">
            <Form.Label>帳號</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="請輸入帳號或信箱"
              onChange={(event) => {
                setLoginCount(event.target.value)
              }}
              pattern={userData.map(() => {
                return userData.username && userData.email
              })}
            />
            {loginCount === '' ? (
              <Form.Control.Feedback type="invalid">
                請輸入帳號！
              </Form.Control.Feedback>
            ) : !checkDataForCount(loginCount) ||
              !checkDataForPass(loginPass) ? (
              <Form.Control.Feedback type="invalid">
                帳號或密碼輸入錯誤！
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback type="invalid">
                帳號或密碼輸入錯誤！
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="6" controlId="password">
            <Form.Label>密碼</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="請輸入密碼"
              onChange={(event) => {
                setLoginPass(event.target.value)
              }}
              pattern={userData.map(() => {
                return userData.password
              })}
            />
            {loginPass === '' ? (
              <Form.Control.Feedback type="invalid">
                請輸入密碼！
              </Form.Control.Feedback>
            ) : !checkDataForPass(loginPass) ||
              !checkDataForCount(loginCount) ? (
              <Form.Control.Feedback type="invalid">
                帳號或密碼輸入錯誤！
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback type="invalid">
                帳號或密碼輸入錯誤！
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form.Row>

        {/* <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group> */}
        <Form.Row>
          <Button type="submit">登入</Button>
          {props.isAuth ? (
            ''
          ) : (
            <Form.Text as={Col} style={{ margin: '10px' }}>
              沒有會員？去<Link to="register">註冊</Link>
            </Form.Text>
          )}
        </Form.Row>
      </Form>
    </>
  )
}

export default withRouter(Login)
