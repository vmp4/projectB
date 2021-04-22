import React, { useState, useEffect } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { withRouter } from 'react-router'

function Paginate(props) {
  const [pages, setPages] = useState([])

  useEffect(() => {
    // 將pegination頁數設為陣列
    function countPages() {
      let pageArr = []

      for (let i = 2; i < props.pages; i++) {
        // 當總頁數超過五頁時
        if (props.pages > 5) {
          // 如果頁數比第一頁大、並且頁數小於現在觀看的頁數-1時
          // -----中間的if-----這些Ellipsis全部跳過，不新增到陣列裡面
          if (i > 1 && i < props.pageActive - 2) {
            // -----中間的if-----符合條件時，只新增一個Ellipsis「…」
            if (i > 1 && i < 3) {
              pageArr.push(<Pagination.Ellipsis key="0" />)
            }
            continue
          }

          // 如果頁數小於總頁數、並且頁數比現在觀看的頁數+1大時
          // -----中間的if-----這些Ellipsis全部跳過，不新增到陣列裡面
          if (i > props.pageActive + 2 && i < props.pages) {
            // -----中間的if-----符合條件時，只新增一個Ellipsis「…」
            if (i > props.pages - 2 && i < props.pages) {
              pageArr.push(<Pagination.Ellipsis key={props.pages + 1} />)
            }
            continue
          }

          // 以上條件都不符合時，將頁數新增到陣列裡面
          pageArr.push(
            <Pagination.Item
              key={i}
              active={i === props.pageActive}
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
              active={i === props.pageActive}
              onClick={() => props.setPageActive(i)}
            >
              {i}
            </Pagination.Item>
          )
        }
      }

      setPages(pageArr)
    }

    countPages()
  }, [props])

  const display = (
    <>
      <Pagination className="justify-content-center">
        {props.pages < 6 ? (
          ''
        ) : (
          <>
            <Pagination.First onClick={() => props.setPageActive(1)} />
            <Pagination.Prev
              onClick={() => {
                props.pageActive > 1 &&
                  props.setPageActive(props.pageActive - 1)
              }}
            />
          </>
        )}

        {props.pages > 0 ? (
          <Pagination.Item
            active={1 === props.pageActive}
            onClick={() => props.setPageActive(1)}
          >
            1
          </Pagination.Item>
        ) : (
          ''
        )}

        {pages}

        {props.pages > 1 ? (
          <Pagination.Item
            active={props.pages === props.pageActive}
            onClick={() => props.setPageActive(props.pages)}
          >
            {props.pages}
          </Pagination.Item>
        ) : (
          ''
        )}

        {props.pages < 6 ? (
          ''
        ) : (
          <>
            <Pagination.Next
              onClick={() => {
                props.pageActive < props.pages &&
                  props.setPageActive(props.pageActive + 1)
              }}
            />
            <Pagination.Last onClick={() => props.setPageActive(props.pages)} />
          </>
        )}
      </Pagination>
    </>
  )

  return <>{props.loading ? '' : display}</>
}

export default withRouter(Paginate)
