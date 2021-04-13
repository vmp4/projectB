import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { FaCartPlus } from 'react-icons/fa'

function ProductDisplay(props) {
  const [loading, setLoading] = useState(true)
  const [localCartData, setLocalCartData] = useState([])

  const [number, setNumber] = useState({})

  let numArr = {}

  // 增加產品數量
  const setLocalStorage = (value) => {
    // 設currentCart為從localStorage得到的資料 如果沒有為空陣列 再轉換為JavaScript的數值或是物件
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []

    // 設updateData為陣列包裹住的所有JavaScript的數值或是物件 加上傳入的參數
    const updateData = [...currentCart, value]

    // 將資料轉換成JSON字串 並設定到localStorage內
    localStorage.setItem('cart', JSON.stringify(updateData))

    // 將新的陣列設置到localCartData狀態
    setLocalCartData(updateData)
  }

  // 移除購物車產品數量
  function removeLocalStorage(num, value) {
    // 設data為從localStorage得到的資料 再轉換為JavaScript的數值或是物件
    const data = JSON.parse(localStorage.getItem('cart'))

    // 用for將小於等於number次數的傳入參數移除
    for (let i = 1; i <= num; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].id === value.id) {
          data.splice(j, 1)
          break
        }
      }
    }

    // 設deleteData為陣列包裹住的所有JavaScript的數值或是物件
    const deleteData = [...data]

    // 將資料轉換成JSON字串 並設定到localStorage內
    localStorage.setItem('cart', JSON.stringify(deleteData))

    // 將新的陣列設置到localCartData狀態
    setLocalCartData(deleteData)
  }

  // 計算下拉選單數量
  const optionCount = (value) => {
    // 設countNum等於空陣列
    let countNum = []

    // 用for迴圈 並判斷有多少個傳入參數的數量
    // 將每一次的值(最小為0)push進countNum
    for (let i = 0; i <= props.getLocalAmount(value); i++) {
      countNum.push(i)
    }

    // 回傳countNum陣列
    return countNum
  }

  // 得到即時的下拉選單數量 並設置到number裡
  const handleChange = (e) => {
    const { id, value } = e.target
    setNumber((prev) => ({ ...prev, [id]: value }))
  }

  // useEffect(() => {
  //   // props.products()
  // }, [])

  // 如果localCartData更動 設置0.5秒將spinner轉為false
  // 並獲取正確的產品數量
  useEffect(() => {
    setLoading(true)
    setNumber(numArr)
    setTimeout(() => {
      setLoading(false)
    }, 500)
    props.getLocalAmount()
  }, [props, localCartData])

  const spinner = (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

  const display = (
    <div className="row">
      {props.products.map((value) => {
        numArr[value.id] = '0'
        return (
          <Card key={value.id} className="text-center">
            <Card.Header
              as={Link}
              to={`/products/${value.type}/${value.brand}/${value.id}`}
            >
              <Card.Img
                // variant="top"
                src={value.picturepath}
                alt={value.name}
                title="點擊觀看詳細內容"
                onClick={() => {
                  props.getDetail()
                }}
              />
            </Card.Header>
            <Card.Body>
              <Card.Title>{value.name}</Card.Title>
              <Card.Text>{value.shotInfo}</Card.Text>
              <Card.Text>NTD {value.price}元</Card.Text>
            </Card.Body>
            <Card.Footer>
              {value.type === '書籍' ? (
                <p>請進入詳細頁面並選擇欲購入集數</p>
              ) : value.stock > 0 ? (
                <>
                  <Button
                    variant="success"
                    onClick={() => {
                      setLocalStorage({
                        id: value.id,
                        name: value.name,
                        amount: 1,
                        price: value.price,
                      })
                      props.getCart()
                    }}
                  >
                    加入購物車 <FaCartPlus />
                  </Button>
                  <p style={{ margin: 'auto 5px auto 5px' }}>
                    目前選購數量: {props.getLocalAmount(value.id)}
                  </p>
                  <Button
                    variant="danger"
                    onClick={() => {
                      parseInt(number[value.id]) > 0 &&
                        removeLocalStorage(parseInt(number[value.id]), {
                          id: value.id,
                          name: value.name,
                          amount: 1,
                          price: value.price,
                        })
                      props.getCart()
                    }}
                  >
                    取消
                  </Button>
                  <select
                    id={value.id}
                    value={number[value.id]}
                    onChange={handleChange}
                  >
                    {optionCount(value.id).map((i) => {
                      return (
                        <option value={i} key={i}>
                          {i}
                        </option>
                      )
                    })}
                  </select>
                </>
              ) : (
                <p>此商品已售罄</p>
              )}
            </Card.Footer>
          </Card>
        )
      })}
    </div>
  )

  const displayTwo = (
    <div>
      <h1>很抱歉，目前無此相關產品。</h1>
    </div>
  )

  return (
    <>
      {loading ? spinner : props.products.length === 0 ? displayTwo : display}
    </>
  )
}

export default ProductDisplay
