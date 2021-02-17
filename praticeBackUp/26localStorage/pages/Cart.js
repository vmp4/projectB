import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function Cart(props) {
  const [myCart, setMyCart] = useState([])
  const [myCartDisplay, setMyCartDisplay] = useState([])
  const [loading, setLoading] = useState(false)

  function getLocalStorage() {
    setLoading(true)
    const getCart = localStorage.getItem('cart') || []
    const newCartArray = JSON.parse(getCart)
    setMyCart(newCartArray)
  }

  useEffect(() => {
    getLocalStorage()
  }, [])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)

    let newCartDispaly = [] // 新增一個空陣列
    for (let i = 0; i < myCart.length; i++) {
      // 使用findIndex方法
      const index = newCartDispaly.findIndex(
        // 如果傳入參數(value(物件))的id不等於購物車資料的第i筆則回傳-1，
        // 如果傳入參數(value(物件))的id等於購物車資料的第i筆則回傳value的index。
        (value) => value.id === myCart[i].id
      )
      //   console.log(index)

      // 當index不等於-1，表示newCartDispaly與myCart有相同的物件
      if (index !== -1) {
        // 將newCartDispaly[index].amount加上myCart[i].amount
        newCartDispaly[index].amount += myCart[i].amount
        // 如果index等於-1，表示newCartDispaly裡面沒有myCart[i]
      } else {
        // 則新增一個newItem的物件，物件裡繼承myCart[i]元素
        const newItem = { ...myCart[i] }
        // 然後將newCartDispaly繼承原本陣列裡的元素，再加上newItem的物件
        newCartDispaly = [...newCartDispaly, newItem]
      }
    }
    setMyCartDisplay(newCartDispaly)
  }, [myCart])

  //   useEffect(() => {}, [])
  function sum() {
    let total = 0
    myCart.map((obj) => {
      total += obj.price
      return total
    })
    return total
  }

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
      <ul className="list-group">
        {myCartDisplay.map((obj, index) => {
          return (
            <li key={index} className="list-group-item">
              ID:{obj.id} / 產品名:{obj.name} / 數量:{obj.amount} / 單價:
              {obj.price} 小計: {obj.amount * obj.price}
            </li>
          )
        })}
      </ul>
      <div>
        <h3>總價: {sum()}</h3>
        <button type="submit">結帳</button>
      </div>
    </>
  )

  return (
    <>
      {!props.isAuth ? ( // 不是登入狀態顯示下面
        <h3>
          還沒登入<NavLink to="/login">點此去登入</NavLink>
        </h3>
      ) : (
        // 是登入狀態顯示下面
        <div>
          {loading ? ( // 是否是讀取？是的話跑spinner
            spinner
          ) : sum() === 0 ? ( // 總價i是否等於0
            <h3>
              還沒購物？<NavLink to="/products">點此去看商品</NavLink>
            </h3>
          ) : (
            // 否則跑下面這行
            display
          )}
        </div>
      )}
    </>
  )
}

export default Cart
