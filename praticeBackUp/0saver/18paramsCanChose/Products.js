import React from 'react'
import { useParams } from 'react-router-dom'

function Products(props) {
  let { id } = useParams()
  let isId = id ? id : '找不到ID'
  return (
    <>
      <div className="container" style={{ margin: '100px auto 500px' }}>
        <h1>產品頁面</h1>
        <h2>目前產品的ID(從網址上得到): {isId}</h2>
      </div>
    </>
  )
}

export default Products
