import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function Breadcrumb(props) {
  console.log(props)
  return (
    <>
      <div className="container" style={{ marginTop: '55px' }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">首頁</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {props.location.pathname.substring(1)}
            </li>
          </ol>
        </nav>
      </div>
    </>
  )
}

export default withRouter(Breadcrumb)
