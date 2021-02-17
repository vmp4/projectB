import React from 'react'

class LifeCycle extends React.Component {
  constructor() {
    super()
    this.state = {
      total: 0,
    }
    console.log('constructor')
  }

  // 元件已經呈現在網頁上才會執行這個生命週期方法
  componentDidMount() {
    console.log('componentDidMount')
  }

  // 元件已經更新在網頁上(re-render重新渲染)才會執行這個生命週期方法
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  // 元件消失在網頁上才會執行這個生命週期方法
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    console.log('render')
    return (
      <>
        <h1>LifeCycle元件</h1>
        <h1
          onClick={() => {
            this.setState({ total: this.state.total + 1 })
          }}
        >
          {this.state.total}
        </h1>
      </>
    )
  }
}

export default LifeCycle
