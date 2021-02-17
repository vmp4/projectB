import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Form, Button, FormControl } from 'react-bootstrap'

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
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-link"
                activeClassName="active"
                style={{ color: '#28a745' }}
              >
                {!props.isAuth ? (
                  '登入'
                ) : (
                  <NavLink to="/" onClick={props.logout}>
                    登出
                  </NavLink>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/register"
                className="nav-link"
                activeClassName="active"
              >
                註冊
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/counter"
                className="nav-link"
                activeClassName="active"
              >
                計算
              </NavLink>
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
