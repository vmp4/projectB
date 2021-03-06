import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Col, Button } from 'react-bootstrap'

function Login(props) {
  const [loading, setLoading] = useState(true)
  const [validated, setValidated] = useState(false)

  const [loginAccount, setLoginAccount] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [rememberAccount, setRememberAccount] = useState(false)

  // 登入確認帳號密碼
  const checkLogin = () => {
    const getUser = props.userData.find((value) => {
      if (
        (loginAccount === value.username && loginPass === value.password) ||
        (loginAccount === value.mail && loginPass === value.password)
      ) {
        // 登入成功設進localStorage 確保狀態不會因為重整而消失
        let setUser = [{ name: value.name, id: value.id, sex: value.sex }]
        if (setUser !== undefined) {
          localStorage.setItem('logoUser', JSON.stringify(setUser))
        }

        return true
      } else {
        return false
      }
    })

    // 沒有getUser顯示輸入錯誤 有則登入並顯示登入成功
    if (!getUser) {
      setLoading(true)

      props.history.push('/login')

      setTimeout(() => {
        alert('帳號或密碼輸入錯誤！')
        setLoading(false)
        setValidated(false)
      })
    } else {
      alert('登入成功！')
      props.getID(getUser.id)
      props.getName(getUser.name)
      props.getSex(getUser.sex)
      props.login()
      props.history.push('/')
    }
  }

  // 進入頁面後確認是否有資料在localstorage 有則讀取
  const checkSave = () => {
    const localData = JSON.parse(localStorage.getItem('saveAccount'))
    if (localData === null) {
      // setRememberAccount(false)
      // setLoginAccount('')
      return false
    }
    if (localData.check && localData.username !== '') {
      setRememberAccount(localData.check)
      setLoginAccount(localData.username)
    }
  }

  // 確認資料及送出
  const handleSubmit = (event) => {
    const form = event.currentTarget
    // 送出時如有勾選記住帳號 則存入localstorage 否則清除掉
    if (rememberAccount && loginAccount !== '') {
      localStorage.setItem(
        'saveAccount',
        JSON.stringify({ username: loginAccount, check: rememberAccount })
      )
    } else {
      localStorage.removeItem('saveAccount')
    }

    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      checkLogin()
    }
    setValidated(true)
  }

  useEffect(() => {
    checkSave()

    setTimeout(() => {
      setLoading(false)
    }, 100)
  }, [])

  const spinner = (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
  const display = (
    <div className="d-flex justify-content-center">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1>登入</h1>
        <Form.Row>
          <Form.Group controlId="Account">
            <Form.Label>帳號</Form.Label>
            <Form.Control
              required
              type="text"
              value={loginAccount}
              placeholder="請輸入帳號或信箱"
              onChange={(event) => {
                setLoginAccount(event.target.value)
              }}
              autoFocus={rememberAccount ? false : true}
            />
            <Form.Control.Feedback type="invalid">
              請輸入帳號！
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId="password">
            <Form.Label>密碼</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="請輸入密碼"
              onChange={(event) => {
                setLoginPass(event.target.value)
              }}
              autoFocus={rememberAccount ? true : false}
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              請輸入密碼！
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="saveAccountCheckbox">
          <Form.Check
            type="checkbox"
            label="記住帳號"
            onChange={(e) => {
              setRememberAccount(e.target.checked)
            }}
            checked={rememberAccount}
          />
        </Form.Group>

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
    </div>
  )

  return (
    <>
      <div className="forSpinnerTop">{loading ? spinner : display}</div>
    </>
  )
}

export default withRouter(Login)
