import React, { useState } from 'react'

function LoginForm(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  if (props.isAuth)
    return (
      <>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            props.setIsAuth(false)
          }}
        >
          登出
        </button>
      </>
    )
  return (
    <>
      <div className="container">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className={
              emailMessage ? 'form-control is-invalid' : 'form-control is-valid'
            }
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          {emailMessage ? (
            <div className="invalid-feedback">{emailMessage}</div>
          ) : (
            ''
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">密碼</label>
          <input
            type="password"
            className={
              passwordMessage
                ? 'form-control is-invalid'
                : 'form-control is-valid'
            }
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          {passwordMessage ? (
            <div className="invalid-feedback">{passwordMessage}</div>
          ) : (
            ''
          )}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            let correct = true
            if (email) {
              setEmailMessage('')
            } else if (!email) {
              setEmailMessage('email沒填')
              correct = false
            }
            if (password) {
              setPasswordMessage('')
            }
            if (!password) {
              setPasswordMessage('密碼沒填')
              correct = false
            }
            if (correct) props.setIsAuth(true)
          }}
        >
          登入
        </button>
      </div>
    </>
  )
}

export default LoginForm
