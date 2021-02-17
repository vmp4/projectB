import React, { useEffect, useState } from 'react'

function Counter() {
  const [total, setTotal] = useState(0)
  const [dataLoading, setDataLoading] = useState(false)

  async function getDataFromSever() {
    // 設變數為 新的Request 裡面第一個參數為伺服器網址
    // 第二個參數設定 使用的方法 標頭為新標頭 接受與內容類型為'application/json'
    const request = new Request('http://localhost:5555/counter/1', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    // 然後設變數為 等待 從上面的變數接收資料
    const response = await fetch(request)
    // 最後將變數設為 等待 上面變數的.json()
    const data = await response.json()
    console.log('從伺服器得到的資料:', data)
    setTotal(data.total)
  }

  async function setDataToSever(value) {
    setDataLoading(true)

    // 根據伺服器內的資料型態去設一個物件
    const newTotal = { total: total + value }

    const request = new Request('http://localhost:5555/counter/1', {
      method: 'PUT',
      // 將上面的物件轉換成JSON字串
      body: JSON.stringify(newTotal),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    console.log('轉換成JSON字串:', JSON.stringify(newTotal))

    const response = await fetch(request)
    const data = await response.json()
    console.log('伺服器回傳的JSON資料: ', data)

    // 為簡單判斷 實際上必須在前面判定是否為成功才會將得到的值設進去
    setTotal(total + value)
  }

  useEffect(() => {
    setDataLoading(true)
    getDataFromSever()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false)
    }, 500)
  }, [total])

  const spinner = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const dispaly = (
    <>
      <h1>Total: {total}</h1>
    </>
  )

  return (
    <>
      <div className="container">
        <button
          onClick={() => {
            setDataToSever(+1)
            setDataLoading(true)
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            setDataToSever(-1)
            setDataLoading(true)
          }}
        >
          -1
        </button>
        {dataLoading ? spinner : dispaly}
      </div>
    </>
  )
}

export default Counter
