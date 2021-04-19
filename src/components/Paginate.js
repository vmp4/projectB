import React, { useState, useEffect } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { withRouter } from 'react-router'

function Paginate(props) {
  const [loading, setLoading] = useState(true)

  const [pages, setPages] = useState([])

  // 將pegination頁數設為陣列
  function countPages(page, active) {
    let pageArr = []
    for (let i = 1; i <= page; i++) {
      // 當總頁數超過五頁時
      if (page > 5) {
        // 如果頁數比第一頁大、並且頁數小於現在觀看的頁數-1時
        // 這些Ellipsis全部跳過，不新增到陣列裡面
        if (i > 1 && i < active - 1) {
          // 符合條件時，只新增一個Ellipsis「…」
          if (i > 1 && i < 3) {
            pageArr.push(<Pagination.Ellipsis key="0" />)
          }
          continue
        }

        // 如果頁數小於總頁數、並且頁數比現在觀看的頁數+1大時
        // 這些Ellipsis全部跳過，不新增到陣列裡面
        if (i > active + 1 && i < page) {
          // 符合條件時，只新增一個Ellipsis「…」
          if (i > page - 2 && i < page) {
            pageArr.push(<Pagination.Ellipsis key={page + 1} />)
          }
          continue
        }

        // 以上條件都不符合時，將頁數新增到陣列裡面
        pageArr.push(
          <Pagination.Item
            key={i}
            active={i === active}
            onClick={() => props.setPageActive(i)}
          >
            {i}
          </Pagination.Item>
        )
      } else {
        // 總頁數小於6時，將頁數全部新增到陣列
        pageArr.push(
          <Pagination.Item
            key={i}
            active={i === active}
            onClick={() => props.setPageActive(i)}
          >
            {i}
          </Pagination.Item>
        )
      }
    }

    setPages(pageArr)
  }

  // useEffect(() => {
  // }, [])

  useEffect(() => {
    setLoading(true)
    countPages(props.pages, props.pageActive)
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [props])

  const display = (
    <>
      <Pagination className="justify-content-center">
        {props.pages < 6 ? (
          ''
        ) : (
          <>
            <Pagination.First onClick={props.setPageActive(1)} />
            <Pagination.Prev
              onClick={
                props.pageActive > 1 &&
                props.setPageActive(props.pageActive - 1)
              }
            />
          </>
        )}

        {pages}

        {props.pages < 6 ? (
          ''
        ) : (
          <>
            <Pagination.Next
              onClick={
                props.pageActive < props.pages &&
                props.setPageActive(props.pageActive + 1)
              }
            />
            <Pagination.Last onClick={props.setPageActive(props.pages)} />
          </>
        )}
      </Pagination>
    </>
  )

  return <>{loading ? '' : display}</>
}

export default withRouter(Paginate)
