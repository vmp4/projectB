import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Form, Button, FormControl } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'

function Menu(props) {
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
                onClick={() => {
                  props.setNotFilter()
                }}
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
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Menu
