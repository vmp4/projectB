import React, { useState, useEffect } from 'react'

function LifeCycleFunc(props) {
  const [total, setTatol] = useState(0)

  // 元件已經呈現在網頁上才會執行這個生命週期方法
  useEffect(() => {
    console.log('相當於componentDidMount')
  }, [])
  //   componentDidMount() {
  //     console.log('componentDidMount')
  //   }

  // 元件已經更新在網頁上(re-render重新渲染)才會執行這個生命週期方法
  useEffect(() => {
    console.log('相當於componentDidUpdate')
  }, [total])
  //   componentDidUpdate() {
  //     console.log('componentDidUpdate')
  //   }

  // 元件消失在網頁上才會執行這個生命週期方法
  useEffect(() => {
    console.log('相當於componentDidMount')
    return () => {
      console.log('相當於componentWillUnmount')
    }
  }, [])
  //   componentWillUnmount() {
  //     console.log('componentWillUnmount')
  //   }

  return (
    <>
      <h1>LifeCycleFunc元件</h1>
      <h1
        onClick={() => {
          setTatol(total + 1)
        }}
      >
        {total}
      </h1>
    </>
  )
}
export default LifeCycleFunc
