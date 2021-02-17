import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'

function Products(props) {
  console.log(props)
  var searchParams = new URLSearchParams(props.location.search)
  // 另一種取得字串的方式 ↓
  console.log(document.location.search)
  if (!props.isAuth) return <Redirect to="/register" />

  return (
    <>
      <h1>目前會員狀態：{props.isAuth ? '已登入' : '未登入'}</h1>
      <h1>產品頁面</h1>
      <h2>產品ID:{searchParams.get('id')}</h2>
      <h2>產品類別:{searchParams.get('type')}</h2>
    </>
  )
}

export default withRouter(Products)
