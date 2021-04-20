import React, { useEffect } from 'react'

function ProductDetail(props) {
  // const [loading, setLoading] = useState(false)

  const spinner = (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )

  useEffect(() => {}, [])

  const display = (
    <div>
      <h1>{props.detailData.name}</h1>
    </div>
  )

  return <>{props.loading ? spinner : display}</>
}

export default ProductDetail
