import React, { useEffect, useState } from 'react'

function ProductDetail(props) {
  const [loading, setLoading] = useState(true)

  const spinner = (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const display = (
    <div>
      <h1>{props.detailData.name}</h1>
    </div>
  )

  return <>{loading ? spinner : display}</>
}

export default ProductDetail
