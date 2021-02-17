import React from 'react'
import { withRouter } from 'react-router-dom'

function Products(props) {
  console.log(props)
  var searchParams = new URLSearchParams(props.location.search)
  console.log(searchParams.get('id'))
  // 另一種取得字串的方式 ↓
  console.log(document.location.search)
  return (
    <>
      <div className="container" style={{ margin: '100px auto 500px' }}>
        <h1>產品頁面</h1>
        <h2>產品ID:{searchParams.get('id')}</h2>
        <h2>產品類別:{searchParams.get('type')}</h2>
      </div>
    </>
  )
}

export default withRouter(Products)
