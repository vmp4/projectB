import React from 'react'
import { withRouter } from 'react-router-dom'

function NotFoundPage(props) {
  return (
    <>
      <div className="container">
        <h1>頁面不存在</h1>
        <h3>
          <button
            onClick={() => {
              props.history.goBack()
            }}
          >
            點此回到上一頁
          </button>
        </h3>
        <h3>
          <button
            onClick={() => {
              props.history.push('/')
            }}
          >
            點此回到首頁
          </button>
        </h3>
      </div>
    </>
  )
}

export default withRouter(NotFoundPage)
