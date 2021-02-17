import React from 'react'
import { useParams } from 'react-router-dom'

function ProductsUseParams(props) {
  let { id } = useParams()
  console.log(props)
  return (
    <>
      <div className="container" style={{ margin: '100px auto 500px' }}>
        <h1>產品頁面</h1>
        <h2>目前產品的id(從網址上得到): {id}</h2>
      </div>
    </>
  )
}

export default ProductsUseParams
