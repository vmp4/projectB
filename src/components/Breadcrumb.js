import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function Breadcrumb(props) {
  let show = ''
  const path = props.location.pathname

  switch (path) {
    case '/products':
      show = '產品'
      break
    case '/about':
      show = '關於我們'
      break
    case '/cart':
      show = '購物車'
      break
    case '/login':
      show = '登入'
      break
    case '/register':
      show = '註冊'
      break
    case '/counter':
      show = '伺服器資料送與接收'
      break
    case '/userlist':
      show = '會員列表'
      break
    case '/usercenter':
      show = '會員中心'
      break
    default:
      show = ''
  }

  return (
    <>
      <div className="container" style={{ marginTop: '55px' }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">首頁</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {show}
            </li>
          </ol>
        </nav>
      </div>
    </>
  )
}

export default withRouter(Breadcrumb)
