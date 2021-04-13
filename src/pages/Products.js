import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import ProductList from '../components/ProductList'
import ProductDisplay from './ProductDispaly'
import ProductDetail from './ProductDetail'

import { Row, Col } from 'react-bootstrap'

function Products(props) {
  const [productData, setProductData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [detail, setDetail] = useState(false)
  const [detailData, setDetailData] = useState({})

  let types = props.match.params.type
  let brands = props.match.params.brand
  let ids = props.match.params.id

  // 讀取商品資料
  async function getProductsData() {
    const request = new Request('http://localhost:5556/products', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    setProductData(data)
  }

  // 計算加入購物車的產品數量
  const getLocalAmount = (value) => {
    // 設變數為從localStorage得到的資料 如果沒有為0 再轉換為JavaScript的數值或是物件
    const amount = JSON.parse(localStorage.getItem('cart') || 0)

    // 設數量為0
    let count = 0

    // 如果amount等於0 回傳count
    // 否則用for迴圈 並判斷如果amount[i].id等於傳入參數 count加 1
    // 然後回傳count
    if (amount === '0') {
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

  useEffect(() => {
    getProductsData()
    getLocalAmount()
  }, [])

  // 根據路徑過濾商品
  useEffect(() => {
    // 如果沒有種類和品牌，取消過濾
    if (!types && !brands) {
      setDetail(false)
      return props.setNotFilter()
    }

    // 如果抓到id 讀取商品資料，並把顯示商品細節設為true
    if (ids) {
      for (let i = 0; i < productData.length; i++) {
        if (productData[i].id === parseInt(ids)) {
          setDetailData(productData[i])
        }
      }
      return setDetail(true)
    }

    let newArr = []

    // 有品牌先過濾
    if (brands) {
      for (let i = 0; i < productData.length; i++) {
        if (productData[i].brand === brands) {
          newArr.push(productData[i])
        }
      }
      setDetail(false)
      setFilterData(newArr)
      return props.setFilter()
    }
    // 無品牌種類過濾
    if (types) {
      for (let i = 0; i < productData.length; i++) {
        if (productData[i].type === types) {
          newArr.push(productData[i])
        }
      }
      setDetail(false)
      setFilterData(newArr)
      return props.setFilter()
    }
  }, [props, ids, brands, types, productData])

  return (
    <>
      <div className="productTop">
        {/* <div className="productTopForFlex"> */}
        <h2>產品頁面</h2>
        <h6>
          目前會員狀態：
          {props.isAuth ? (
            <p style={{ color: 'green' }}>已登入</p>
          ) : (
            <p style={{ color: 'red' }}>
              未登入 <Link to="/login">去登入? </Link>
            </p>
          )}
        </h6>
        {/* </div> */}
      </div>

      <div className="productContent">
        <Row>
          <Col className="productList">
            <ProductList />
          </Col>

          {detail ? (
            <Col className="productMain" sm={10}>
              <ProductDetail detailData={detailData} />
            </Col>
          ) : (
            <Col className="productMain" sm={10}>
              <ProductDisplay
                // 是否有過濾？有的話傳給productDisplay過濾後的資料
                products={props.filterOrNot ? filterData : productData}
                // 將計算此商品數量的函式傳入
                getLocalAmount={getLocalAmount}
                // 更新購物車數量
                getCart={props.getCart}
                // 傳入點選後顯示單個商品細節
                getDetail={() => {
                  setDetail(true)
                }}
              />
            </Col>
          )}
        </Row>
      </div>
    </>
  )
}

export default withRouter(Products)
