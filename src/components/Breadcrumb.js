import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function Breadcrumb(props) {
  let show = ''
  let linkTo = ''
  let secondShow = ''
  let secondLinkTo = ''
  let thirdShow = ''
  let thirdLinkTo = ''
  const path = props.location.pathname
  let types = props.location.pathname.split('/')[2]
  let brands = props.location.pathname.split('/')[3]
  let ids = props.location.pathname.split('/')[4]

  switch (path) {
    case '/products':
      show = '產品'
      linkTo = '/products'
      break
    case '/about':
      show = '關於我們'
      linkTo = '/about'
      break
    case '/cart':
      show = '購物車'
      linkTo = '/cart'
      break
    case '/login':
      show = '登入'
      linkTo = '/login'
      break
    case '/register':
      show = '註冊'
      linkTo = '/register'
      break
    case '/counter':
      show = '伺服器資料送與接收'
      linkTo = '/counter'
      break
    case '/userlist':
      show = '會員列表'
      linkTo = '/userlist'
      break
    case '/usercenter':
      show = '會員中心'
      linkTo = '/usercenter'
      break
    case '/products/' + types:
      show = '產品'
      linkTo = '/products'
      secondShow = types
      secondLinkTo = '/products/' + types
      break
    case '/products/' + types + '/' + brands:
      show = '產品'
      linkTo = '/products'
      secondShow = types
      secondLinkTo = '/products/' + types
      thirdShow = brands
      thirdLinkTo = '/products/' + types + '/' + brands
      break
    case '/products/' + types + '/' + brands + '/' + ids:
      show = '產品'
      linkTo = '/products'
      secondShow = types
      secondLinkTo = '/products/' + types
      thirdShow = brands
      thirdLinkTo = '/products/' + types + '/' + brands
      break
    default:
      show = ''
      linkTo = ''
      secondShow = ''
      secondLinkTo = ''
      thirdShow = ''
      thirdLinkTo = ''
  }

  // console.log(types)
  // console.log(brands)
  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">首頁</Link>
            </li>
            {show === '' ? (
              ''
            ) : secondShow === '' ? (
              <li className="breadcrumb-item" aria-current="page">
                <Link to={linkTo}>{show}</Link>
              </li>
            ) : (
              <li className="breadcrumb-item">
                <Link to={linkTo}>{show}</Link>
              </li>
            )}
            {secondShow === '' ? (
              ''
            ) : (
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={secondLinkTo}>{secondShow}</Link>
              </li>
            )}
            {thirdShow === '' ? (
              ''
            ) : (
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={thirdLinkTo}>{thirdShow}</Link>
              </li>
            )}
          </ol>
        </nav>
      </div>
    </>
  )
}

export default withRouter(Breadcrumb)
