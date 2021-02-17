import React from 'react'
import { withRouter } from 'react-router-dom'

function Products(props) {
  console.log(props)
  return (
    <>
      <div className="container" style={{ margin: '100px auto 500px' }}>
        <h1>產品頁面</h1>
        <h2>目前產品的id(從網址上得到): {props.match.params.id}</h2>
      </div>
    </>
  )
}

export default withRouter(Products)
