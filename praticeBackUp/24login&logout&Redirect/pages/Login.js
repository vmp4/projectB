import React from 'react'

function Login(props) {
  console.log(props)
  return (
    <>
      <h1>目前會員狀態：{props.isAuth ? '已登入' : '未登入'}</h1>
      <button onClick={props.login}>登入</button>
      <button onClick={props.logout}>登出</button>
    </>
  )
}

export default Login
