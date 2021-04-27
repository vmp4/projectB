import React, { useEffect, useState } from 'react'
import Paginate from '../components/Paginate'
import { withRouter, Link } from 'react-router-dom'
import ProductList from '../components/ProductList'
import ProductDisplay from './ProductDispaly'
import ProductDetail from './ProductDetail'

import { Row, Col } from 'react-bootstrap'
import { useBreakpoint } from '../breakpoint'

function Products(props) {
  const [loading, setLoading] = useState(false)

  const [pageOfProduct, setPageOfProduct] = useState([])

  // 是否顯示詳細資料
  const [detail, setDetail] = useState(false)
  // 詳細資料
  const [detailData, setDetailData] = useState({})

  // 總頁數
  const [peginationTotal, setPeginationTotal] = useState(1)
  // 第幾頁點亮
  const [pageActive, setPageActive] = useState(1)

  // 自定義鉤子，判斷螢幕寬度大小
  const breakpoints = useBreakpoint()

  let types = props.match.params.type
  let brands = props.match.params.brand
  let ids = props.match.params.id

  // 計算不同商品加入購物車的產品數量
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

  // 根據選擇頁數顯示不同商品
  function showProductByPegination(product, amount, value) {
    // 將商品以amount件為一頁進行分頁
    const filterProduct = product.filter((item, index) => {
      return index < value * amount && index >= (value - 1) * amount
    })

    setPageOfProduct(filterProduct)
  }

  // 文字過濾函式
  const searchForFilter = (searchText) => (x) => {
    return (
      x.name.toLowerCase().includes(searchText.toLowerCase()) || !searchText
    )
  }

  // 讀取產品
  useEffect(() => {
    getLocalAmount()
  }, [])

  // 根據路徑過濾商品、並設置0.2秒將spinner轉為false
  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 200)
    // 根據螢幕寬度大小改變一頁的產品數量
    let amount
    if (breakpoints.sm) {
      amount = 4
    } else if (breakpoints.md) {
      amount = 6
    } else if (breakpoints.lg) {
      amount = 8
    } else {
      amount = 10
    }

    // 如果抓到id 讀取商品資料，並把顯示商品細節設為true
    if (ids) {
      for (let i = 0; i < props.productData.length; i++) {
        if (props.productData[i].id === parseInt(ids)) {
          setDetailData(props.productData[i])
        }
      }
      return setDetail(true)
    }

    let newArr = []

    // 有品牌先過濾
    if (brands) {
      for (let i = 0; i < props.productData.length; i++) {
        if (props.productData[i].brand === brands) {
          newArr.push(props.productData[i])
        }
      }
      // 品牌過濾完後，若輸入搜尋文字優先過濾
      if (props.searchText) {
        let searchArr = newArr.filter(searchForFilter(props.searchText))
        let secondArr = []
        for (let i = 0; i < searchArr.length; i++) {
          secondArr.push(searchArr[i])
        }
        // 顯示產品的頁數
        const showData = Math.ceil(secondArr.length / amount)
        setPeginationTotal(showData)

        // 根據選擇頁數顯示不同商品
        showProductByPegination(secondArr, amount, pageActive)

        return setDetail(false)
      }
      // 顯示產品的頁數
      const showData = Math.ceil(newArr.length / amount)
      setPeginationTotal(showData)

      // 根據選擇頁數顯示不同商品
      showProductByPegination(newArr, amount, pageActive)

      return setDetail(false)
    }

    // 無品牌種類過濾
    if (types) {
      for (let i = 0; i < props.productData.length; i++) {
        if (props.productData[i].type === types) {
          newArr.push(props.productData[i])
        }
      }
      // 無品牌種類過濾完後，若輸入搜尋文字優先過濾
      if (props.searchText) {
        let searchArr = newArr.filter(searchForFilter(props.searchText))
        let secondArr = []
        for (let i = 0; i < searchArr.length; i++) {
          secondArr.push(searchArr[i])
        }
        // 顯示產品的頁數
        const showData = Math.ceil(secondArr.length / amount)
        setPeginationTotal(showData)

        // 根據選擇頁數顯示不同商品
        showProductByPegination(secondArr, amount, pageActive)

        return setDetail(false)
      }
      // 顯示產品的頁數
      const showData = Math.ceil(newArr.length / amount)
      setPeginationTotal(showData)

      // 根據選擇頁數顯示不同商品
      showProductByPegination(newArr, amount, pageActive)

      return setDetail(false)
    }

    // 有搜尋文字先過濾
    if (props.searchText) {
      let searchArr = props.productData.filter(
        searchForFilter(props.searchText)
      )
      for (let i = 0; i < searchArr.length; i++) {
        newArr.push(searchArr[i])
      }
      // 顯示產品的頁數
      const showData = Math.ceil(newArr.length / amount)
      setPeginationTotal(showData)

      // 根據選擇頁數顯示不同商品
      showProductByPegination(newArr, amount, pageActive)

      return setDetail(false)
    }

    // 如果沒有種類和品牌，取消過濾
    if (!types && !brands) {
      // 顯示產品的頁數
      const showData = Math.ceil(props.productData.length / amount)
      setPeginationTotal(showData)

      // 根據選擇頁數顯示不同商品
      showProductByPegination(props.productData, amount, pageActive)

      return setDetail(false)
    }
  }, [props, ids, brands, types, pageActive, breakpoints])

  // 若總頁數改變，將pageActive設為1
  useEffect(() => {
    if (peginationTotal) {
      setPageActive(1)
    }
  }, [peginationTotal])

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
            <ProductList
              screen={breakpoints.sm}
              setSearchText={() => props.setSearchText('')}
            />
          </Col>

          {detail ? (
            <Col className="productMain" sm={10}>
              <ProductDetail
                // 將點擊的單筆資料傳入「詳細元件」
                detailData={detailData}
                // 將是否跑讀條，統一由這個父元件傳給子元件
                loading={loading}
              />
            </Col>
          ) : (
            <Col className="productMain" sm={10}>
              <ProductDisplay
                // 傳給productDisplay資料
                products={pageOfProduct}
                // 將計算此商品數量的函式傳入
                getLocalAmount={getLocalAmount}
                // 更新購物車數量
                getCart={props.getCart}
                // 傳入點選後顯示單個商品細節
                getDetail={() => {
                  setDetail(true)
                }}
                // 將是否跑讀條，統一由這個父元件傳給子元件
                loading={loading}
              />

              <Paginate
                // 將總頁數傳入子元件
                pages={peginationTotal}
                // 將第幾頁點亮傳入子元件，也是頁數的值
                pageActive={pageActive}
                // 在子元件點選頁數後，改變頁數的值
                setPageActive={(e) => {
                  setPageActive(e)
                }}
                // 將是否跑讀條，統一由這個父元件傳給子元件
                loading={loading}
              />
            </Col>
          )}
        </Row>
      </div>
    </>
  )
}

export default withRouter(Products)
