import React from 'react'
import { withRouter, Link } from 'react-router-dom'

function Login(props) {
  //   console.log(props)
  return (
    <>
      <h1>目前會員狀態：{props.isAuth ? '已登入' : '未登入'}</h1>
      <div style={{ display: 'flex' }}>
        {!props.isAuth ? (
          <button onClick={props.login}>登入</button>
        ) : (
          <button onClick={props.logout}>登出</button>
        )}
        {props.isAuth ? (
          ''
        ) : (
          <p style={{ margin: 'auto auto auto 10px' }}>
            沒有會員？去<Link to="register">註冊</Link>
          </p>
        )}
      </div>
    </>
  )
}

export default withRouter(Login)
