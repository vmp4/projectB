import React, { useState } from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { Navbar, Form, Button, FormControl } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import { GoSearch } from 'react-icons/go'

function Menu(props) {
  const [searchValue, setSearchValue] = useState('')

  const path = props.location.pathname

  function filterText(value) {
    return value.name.toLowerCase().includes(searchValue.toLowerCase())
  }

  return (
    <>
      <Navbar bg="light" expand="lg" className="fixed-top">
        <NavLink className="navbar-brand" to="#">
          LOGO
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                className="nav-link"
                activeClassName="active"
              >
                首頁
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products"
                className="nav-link"
                activeClassName="active"
                onClick={() => props.setSearchText('')}
              >
                產品
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link"
                activeClassName="active"
              >
                關於我
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/cart" className="nav-link" activeClassName="active">
                購物車
                <Badge variant="danger">{props.number}</Badge>
              </NavLink>
            </li>

            {props.isAuth ? (
              <li className="nav-item">
                <NavLink
                  to="/usercenter"
                  className="nav-link"
                  activeClassName="active"
                >
                  會員中心
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="nav-link"
                  activeClassName="active"
                >
                  註冊
                </NavLink>
              </li>
            )}

            {!props.isAuth ? (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link"
                  activeClassName="active"
                  style={{ color: '#28a745' }}
                >
                  登入
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  to="/"
                  onClick={props.logout}
                  className="nav-link"
                  activeClassName="active"
                  style={{ color: '#d81f1f' }}
                >
                  登出
                </NavLink>
              </li>
            )}

            {props.isAuthMain ? (
              <li className="nav-item">
                <NavLink
                  to="/userlist"
                  className="nav-link"
                  activeClassName="active"
                >
                  會員列表
                </NavLink>
              </li>
            ) : (
              ''
            )}

            <li
              className="nav-item"
              style={{ marginTop: 'auto', marginBottom: 'auto' }}
            >
              歡迎！
              {props.isAuth
                ? props.lastName
                : props.isAuthMain
                ? '主管'
                : '訪客'}
              {props.isAuth ? (props.logSex === '男' ? '先生' : '小姐') : ''}
            </li>
          </ul>
          <Form inline className="form-inline my-2 my-lg-0">
            <FormControl
              type="text"
              name="search"
              list="searchProduct"
              value={searchValue}
              placeholder="搜尋商品"
              className="mr-sm-2"
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <datalist id="searchProduct">
              {props.productData
                .filter((item, index) => {
                  // 沒有搜尋文字，只顯示index小於5的(可改成最熱門商品)
                  return !searchValue ? index < 5 : filterText(item)
                })
                .map((item) => {
                  return <option key={item.id} value={item.name} />
                })}
            </datalist>

            {path.split('/')[1] === 'products' ? (
              <Button
                variant="outline-success"
                onClick={() => {
                  props.setSearchText(searchValue)
                  setSearchValue('')
                }}
              >
                <GoSearch />
              </Button>
            ) : (
              <Button
                variant="outline-success"
                as={Link}
                to="/products"
                onClick={() => {
                  props.setSearchText(searchValue)
                  setSearchValue('')
                }}
              >
                <GoSearch />
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default withRouter(Menu)
