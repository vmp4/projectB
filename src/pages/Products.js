import React, { useEffect, useState } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

function Products(props) {
  const [localCartData, setLocalCartData] = useState([])
  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState(0)

  // 增加產品數量
  function setLocalStorage(value) {
    // 設定spinner為true
    setLoading(true)

    // 設currentCart為從localStorage得到的資料 如果沒有為空陣列 再轉換為JavaScript的數值或是物件
    const currentCart = JSON.parse(localStorage.getItem('cart') || [])

    // 設updateData為陣列包裹住的所有JavaScript的數值或是物件 加上傳入得參數
    const updateData = [...currentCart, value]

    // 將資料轉換成JSON字串 並設定到localStorage內
    localStorage.setItem('cart', JSON.stringify(updateData))

    // 將新的陣列設置到localCartData狀態
    setLocalCartData(updateData)
  }

  // 移除產品數量
  function removeLocalStorage(value) {
    // 設定spinner為true
    setLoading(true)

    // 設data為從localStorage得到的資料 再轉換為JavaScript的數值或是物件
    const data = JSON.parse(localStorage.getItem('cart'))

    // 如果number大於0 則用for將小於等於number次數的傳入參數移除
    if (number > 0) {
      for (let i = 1; i <= number; i++) {
        data.splice(value, 1)
      }
    }

    // 設deleteData為陣列包裹住的所有JavaScript的數值或是物件
    const deleteData = [...data]

    // 將資料轉換成JSON字串 並設定到localStorage內
    localStorage.setItem('cart', JSON.stringify(deleteData))

    // 將新的陣列設置到localCartData狀態
    setLocalCartData(deleteData)
  }

  // 計算產品數量
  const getLocalAmount = (value) => {
    // 設變數為從localStorage得到的資料 如果沒有為0 再轉換為JavaScript的數值或是物件
    const amount = JSON.parse(localStorage.getItem('cart')) || 0

    // 設數量為0
    let count = 0

    // 如果amount等於0 回傳count
    // 否則用for迴圈 並判斷如果amount[i].id等於傳入參數 count加 1
    // 然後回傳count
    if (amount === 0) {
      return count
    } else {
      for (let i = 0; i < amount.length; i++) {
        if (amount[i].id === value) {
          count++
        }
      }
      return count
    }
  }

  // 計算下拉選單數量
  const optionCount = (value) => {
    // 設countNum等於空陣列
    let countNum = []

    // 用for迴圈 並判斷有多少個傳入參數的數量
    // 將每一次的值(最小為0)push進countNum
    for (let i = 0; i <= getLocalAmount(value); i++) {
      countNum.push(i)
    }

    // 回傳countNum陣列
    return countNum
  }

  // 得到即時的下拉選單數量 並設置到number裡
  function handleChange(e) {
    setNumber(e.target.value)
  }

  useEffect(() => {
    setLoading(true)
    getLocalAmount()
  }, [])

  // 如果localCartData更動 設置0.5秒將spinner轉為false
  // 並獲取正確的產品數量
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
    getLocalAmount()
  }, [localCartData])

  const spinner = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const display = (
    <>
      <div className="card-deck">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="http://via.placeholder.com/250x150" />
          <Card.Body>
            <Card.Title>iPad</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Text>NTD 25000元</Card.Text>
          </Card.Body>
          <Card.Footer style={{ display: 'flex' }}>
            <Button
              variant="success"
              onClick={() => {
                setLocalStorage({
                  id: 1,
                  name: 'iPad',
                  amount: 1,
                  price: 25000,
                })
              }}
            >
              加入購物車
            </Button>
            <p style={{ margin: 'auto auto auto 10px' }}>
              目前數量: {getLocalAmount(1)}
            </p>
            <Button
              variant="danger"
              onClick={() => {
                number > 0 &&
                  removeLocalStorage({
                    id: 1,
                    name: 'iPad',
                    amount: 1,
                    price: 25000,
                  })
              }}
            >
              取消
            </Button>
            <select
              value={number}
              onChange={(e) => {
                handleChange(e)
              }}
            >
              {optionCount(1).map((i) => {
                return (
                  <option value={i} key={i}>
                    {i}
                  </option>
                )
              })}
            </select>
          </Card.Footer>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="http://via.placeholder.com/250x150" />
          <Card.Body>
            <Card.Title>Book</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Text>NTD 200元</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="success"
              onClick={() => {
                setLocalStorage({
                  id: 2,
                  name: 'Book',
                  amount: 1,
                  price: 200,
                })
              }}
            >
              加入購物車
            </Button>
          </Card.Footer>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="http://via.placeholder.com/250x150" />
          <Card.Body>
            <Card.Title>iPhone 12</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Text>NTD 20000元</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              variant="success"
              onClick={() => {
                setLocalStorage({
                  id: 3,
                  name: 'iPhone',
                  amount: 1,
                  price: 20000,
                })
              }}
            >
              加入購物車
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  )

  return (
    <>
      <div style={{ display: 'flex' }}>
        <h2>產品頁面</h2>
        <h6 style={{ display: 'flex', marginLeft: 'auto', marginTop: 'auto' }}>
          目前會員狀態：
          {props.isAuth ? (
            <p style={{ color: 'green' }}>已登入</p>
          ) : (
            <p style={{ color: 'red' }}>
              未登入 <NavLink to="/login">去登入?</NavLink>
            </p>
          )}
        </h6>
      </div>
      {loading ? spinner : display}
    </>
  )
}

export default withRouter(Products)
